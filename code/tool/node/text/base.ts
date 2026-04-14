/**
 * Text-file introspection + normalization: encoding detection,
 * line-ending detection, and in-place rewrites of both. Shells
 * out to `file` (libmagic) for encoding / MIME probing because
 * it's already a brew/apt dependency and handles the fuzzy cases
 * (UTF-16 with BOM, Latin-1 fallback) better than a JS guess.
 */

import fs from 'node:fs/promises'
import { exec } from '~/code/tool/node/process'

export type Eol = 'lf' | 'crlf' | 'cr' | 'mixed' | 'unknown'

export type FileTypeInfo = {
  type: string // e.g. "ASCII text" / "UTF-8 Unicode text"
  mime: string // e.g. "text/plain"
  encoding: string // e.g. "us-ascii" / "utf-8" / "binary"
  eol: Eol
}

export async function readFileTypeInfo(
  filePath: string,
): Promise<FileTypeInfo> {
  const [type, mime, encoding, eol] = await Promise.all([
    probe(filePath, ['-b']),
    probe(filePath, ['-b', '--mime-type']),
    probe(filePath, ['-b', '--mime-encoding']),
    detectEol(filePath),
  ])
  return { type, mime, encoding, eol }
}

async function probe(filePath: string, flags: string[]): Promise<string> {
  try {
    const { stdout } = await exec(['file', ...flags, filePath])
    return stdout.trim()
  } catch {
    return 'unknown'
  }
}

// ---- EOL -----------------------------------------------------------

/**
 * Scan the first 64 KB for line terminators. A file with any
 * CR byte not followed by LF is CR-only (old Mac); CR+LF is
 * Windows; bare LF is Unix. Mixed means we saw at least two
 * styles — the converter below will normalize them.
 */
export async function detectEol(filePath: string): Promise<Eol> {
  const handle = await fs.open(filePath, 'r')
  try {
    const buf = Buffer.alloc(64 * 1024)
    const { bytesRead } = await handle.read(buf, 0, buf.length, 0)
    if (bytesRead === 0) return 'unknown'

    let lf = 0
    let crlf = 0
    let cr = 0
    for (let i = 0; i < bytesRead; i++) {
      const b = buf[i]
      if (b === 0x0d) {
        if (buf[i + 1] === 0x0a) {
          crlf++
          i++
        } else {
          cr++
        }
      } else if (b === 0x0a) {
        lf++
      }
    }
    const styles = [lf > 0, crlf > 0, cr > 0].filter(Boolean).length
    if (styles === 0) return 'unknown'
    if (styles > 1) return 'mixed'
    if (crlf > 0) return 'crlf'
    if (cr > 0) return 'cr'
    return 'lf'
  } finally {
    await handle.close()
  }
}

export async function convertEol(
  filePath: string,
  target: Eol,
  output?: string,
): Promise<void> {
  if (target !== 'lf' && target !== 'crlf' && target !== 'cr') {
    throw new Error(`set eol: target must be lf, crlf, or cr (got "${target}")`)
  }
  const text = await fs.readFile(filePath, 'utf8')
  const normalized = text.replace(/\r\n|\r|\n/g, '\n')
  const replacement = target === 'lf' ? '\n' : target === 'crlf' ? '\r\n' : '\r'
  const rewritten = normalized.replace(/\n/g, replacement)
  await fs.writeFile(output ?? filePath, rewritten, 'utf8')
}

// ---- encoding ------------------------------------------------------

/**
 * Rewrite a file from its detected encoding to the target. Shells
 * out to `iconv`, which is on every unix system we care about
 * (macOS ships it, apt/brew ship it, Windows users running under
 * Git for Windows or WSL have it too).
 */
export async function convertEncoding(
  filePath: string,
  target: string,
  output?: string,
): Promise<void> {
  const info = await readFileTypeInfo(filePath)
  const from = info.encoding.toLowerCase()
  if (from === 'binary') {
    throw new Error(
      `set encoding: "${filePath}" is binary — refusing to re-encode.`,
    )
  }

  const src = mapFromIconvName(from)
  const dst = mapFromIconvName(target)
  if (src === dst) {
    if (output && output !== filePath) await fs.copyFile(filePath, output)
    return
  }

  const outPath = output ?? filePath
  if (outPath === filePath) {
    // iconv can't read and write the same file — go through a tmp
    // path and rename on success.
    const tmp = `${filePath}.iconv.${process.pid}`
    await exec(['iconv', '-f', src, '-t', dst, '-o', tmp, filePath])
    await fs.rename(tmp, filePath)
  } else {
    await exec(['iconv', '-f', src, '-t', dst, '-o', outPath, filePath])
  }
}

function mapFromIconvName(name: string): string {
  const lower = name.toLowerCase()
  // Common aliases — accept what `file` reports and what humans
  // type, normalize to what `iconv -l` recognizes.
  const map: Record<string, string> = {
    utf8: 'UTF-8',
    'utf-8': 'UTF-8',
    'us-ascii': 'US-ASCII',
    ascii: 'US-ASCII',
    latin1: 'ISO-8859-1',
    'iso-8859-1': 'ISO-8859-1',
    'utf-16': 'UTF-16',
    utf16: 'UTF-16',
    'utf-16le': 'UTF-16LE',
    'utf-16be': 'UTF-16BE',
    'windows-1252': 'WINDOWS-1252',
    cp1252: 'WINDOWS-1252',
  }
  return map[lower] ?? name.toUpperCase()
}
