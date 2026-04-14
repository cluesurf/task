import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import {
  ExtractWith7Z,
  ExtractWithUnarchiver,
} from '~/code/form/action/extract/archive/shared'

export type ExtractInput = {
  input: { path: string; password?: string }
  output: { directory: { path: string }; overwrite?: boolean }
  /** Optional subset of entries to extract. Only honored by tools
   * that support it (tar, unzip, 7z, unar). */
  include?: string[]
}

// check if corrupted
// zip -T filename.zip
// 7z t file.zip

export function buildCommandToExtractWith7z(input: ExtractWith7Z) {
  const cmd = getCommand(`7z`)
  cmd.link.push(
    `x`,
    `"${input.input.path}"`,
    `-o`,
    `"${input.output.file!.path}"`,
  )
  return buildCommandSequence(cmd)
}

export function buildCommandToExtractWithUnarchiver(
  input: ExtractWithUnarchiver,
) {
  const cmd = getCommand(`unar`)
  cmd.link.push(
    `${input.input.file.path}`,
    `-o`,
    `${input.output.directory.path}`,
  )

  cmd.link.push('--quiet')

  if (input.output.overwrite) {
    cmd.link.push(`-f`)
  }

  if (input.input.password) {
    cmd.link.push(`-p`, input.input.password)
  }

  return buildCommandSequence(cmd)
}

// https://github.com/ashang/unar/blob/master/README.md

/**
 * `unzip src.zip -d out/` — native zip extractor. Preserves
 * permissions, handles passwords with `-P`, and honors `-o` to
 * overwrite without prompting. Falls back to stdin `-` when the
 * caller pipes in the archive.
 */
export function buildCommandToExtractWithUnzip(input: ExtractInput) {
  const cmd = getCommand('unzip')
  if (input.output.overwrite) cmd.link.push('-o')
  if (input.input.password) cmd.link.push('-P', input.input.password)
  cmd.link.push(input.input.path)
  if (input.include?.length) cmd.link.push(...input.include)
  cmd.link.push('-d', input.output.directory.path)
  return buildCommandSequence(cmd)
}

/**
 * `unrar x -o+ src.rar out/` — canonical rar extractor. `x` keeps
 * the in-archive folder structure (vs `e` which flattens). `-o+`
 * overwrites, `-o-` skips, default prompts. Password via `-p`.
 */
export function buildCommandToExtractWithUnrar(input: ExtractInput) {
  const cmd = getCommand('unrar')
  cmd.link.push('x')
  cmd.link.push(input.output.overwrite ? '-o+' : '-o-')
  if (input.input.password) cmd.link.push(`-p${input.input.password}`)
  cmd.link.push(input.input.path)
  if (input.include?.length) cmd.link.push(...input.include)
  // unrar needs a trailing slash on the output dir or it treats it
  // as a file prefix.
  const out = input.output.directory.path.replace(/\/?$/, '/')
  cmd.link.push(out)
  return buildCommandSequence(cmd)
}

/**
 * `tar -xf src.tar.* -C out/` — native tar. Compression auto-
 * detected by tar itself (GNU/BSD both auto-probe the stream).
 */
export function buildCommandToExtractWithTar(input: ExtractInput) {
  const cmd = getCommand('tar')
  cmd.link.push('-x', '-f', input.input.path)
  cmd.link.push('-C', input.output.directory.path)
  if (input.include?.length) cmd.link.push(...input.include)
  return buildCommandSequence(cmd)
}

/**
 * `atool --extract-to out/ src.*` — extension-dispatches to the
 * right tool per format. Great fallback when you don't know what
 * the archive is.
 */
export function buildCommandToExtractWithAtool(input: ExtractInput) {
  const cmd = getCommand('atool')
  cmd.link.push('--extract-to', input.output.directory.path)
  if (input.output.overwrite) cmd.link.push('--force')
  cmd.link.push('--quiet')
  cmd.link.push(input.input.path)
  return buildCommandSequence(cmd)
}

/**
 * `patool extract src.* --outdir out/` — python equivalent of
 * atool. Same dispatch idea, but ships via pip which makes it
 * available on systems where atool isn't packaged.
 */
export function buildCommandToExtractWithPatool(input: ExtractInput) {
  const cmd = getCommand('patool')
  cmd.link.push('--non-interactive', 'extract')
  cmd.link.push('--outdir', input.output.directory.path)
  cmd.link.push(input.input.path)
  return buildCommandSequence(cmd)
}
