/**
 * CRUD + render helpers over `~/.ssh/config`. The file is a flat
 * stream of `Host <pattern>` blocks, each with indented `Key
 * Value` lines. We parse it into a structured list of entries,
 * mutate one entry at a time, then re-emit the whole file.
 *
 * Non-Host sections (top-level `Match`, blank lines, comments)
 * attach to whatever entry precedes them so round-tripping
 * preserves user-authored context. Comment-only regions at the
 * top of the file live on a synthetic "__header" entry.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

export type SshEntry = {
  name: string
  host?: string
  user?: string
  port?: number
  key?: string
  jump?: string
  forward?: string[]
  /** Raw extra directives the caller didn't map — preserved on save. */
  extra?: Array<{ key: string; value: string }>
}

export const DEFAULT_CONFIG_PATH = path.join(os.homedir(), '.ssh', 'config')

// ---- IO ------------------------------------------------------------

export async function readRaw(file = DEFAULT_CONFIG_PATH): Promise<string> {
  try {
    return await fs.readFile(file, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return ''
    throw error
  }
}

export async function writeRaw(
  contents: string,
  file = DEFAULT_CONFIG_PATH,
): Promise<void> {
  // On Windows, ~/.ssh/config lives at %USERPROFILE%\.ssh\config;
  // OpenSSH (bundled with Windows 10+) reads from that exact path.
  // POSIX 0600 permissions are ignored on NTFS, so we only apply
  // the mode on unix-like platforms.
  await fs.mkdir(path.dirname(file), { recursive: true })
  const opts: { encoding: 'utf8'; mode?: number } = { encoding: 'utf8' }
  if (process.platform !== 'win32') opts.mode = 0o600
  await fs.writeFile(file, contents, opts)
}

// ---- parse ---------------------------------------------------------

/** Raw entry — every line bucketed into a Host block. */
type RawEntry = {
  name: string // "" for header
  lines: string[]
}

export function parseRaw(text: string): RawEntry[] {
  const entries: RawEntry[] = []
  let current: RawEntry = { name: '', lines: [] }
  entries.push(current)
  for (const line of text.split('\n')) {
    const hostMatch = line.match(/^\s*Host\s+(\S+)\s*$/i)
    if (hostMatch) {
      current = { name: hostMatch[1]!, lines: [line] }
      entries.push(current)
    } else {
      current.lines.push(line)
    }
  }
  return entries
}

export function entryFromRaw(raw: RawEntry): SshEntry | undefined {
  if (!raw.name) return undefined
  const entry: SshEntry = { name: raw.name }
  const extra: SshEntry['extra'] = []
  for (const line of raw.lines.slice(1)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const match = trimmed.match(/^(\S+)\s+(.+)$/)
    if (!match) continue
    const key = match[1]!
    const value = match[2]!.trim()
    switch (key.toLowerCase()) {
      case 'hostname':
        entry.host = value
        break
      case 'user':
        entry.user = value
        break
      case 'port':
        entry.port = Number(value)
        break
      case 'identityfile':
        entry.key = value
        break
      case 'proxyjump':
        entry.jump = value
        break
      case 'localforward':
      case 'forward':
        entry.forward = entry.forward ? [...entry.forward, value] : [value]
        break
      default:
        extra.push({ key, value })
    }
  }
  if (extra.length) entry.extra = extra
  return entry
}

/** Read + parse + return only the Host entries, typed. */
export async function readAll(file = DEFAULT_CONFIG_PATH): Promise<SshEntry[]> {
  const raw = await readRaw(file)
  const blocks = parseRaw(raw)
  return blocks
    .map(entryFromRaw)
    .filter((e): e is SshEntry => !!e)
}

export async function readOne(
  name: string,
  file = DEFAULT_CONFIG_PATH,
): Promise<SshEntry | undefined> {
  const all = await readAll(file)
  return all.find(e => e.name === name)
}

// ---- render --------------------------------------------------------

export function renderEntry(entry: SshEntry): string {
  const lines: string[] = [`Host ${entry.name}`]
  if (entry.host) lines.push(`  HostName ${entry.host}`)
  if (entry.user) lines.push(`  User ${entry.user}`)
  if (entry.port !== undefined) lines.push(`  Port ${entry.port}`)
  if (entry.key) lines.push(`  IdentityFile ${entry.key}`)
  if (entry.jump) lines.push(`  ProxyJump ${entry.jump}`)
  if (entry.forward?.length) {
    for (const f of entry.forward) lines.push(`  LocalForward ${f}`)
  }
  if (entry.extra?.length) {
    for (const e of entry.extra) lines.push(`  ${e.key} ${e.value}`)
  }
  return lines.join('\n') + '\n'
}

// ---- write-back ---------------------------------------------------

/**
 * Apply a patch to the named entry. `null` removes; a full entry
 * replaces; a partial patch merges. Entries the caller didn't
 * touch come back verbatim (including user comments and spacing)
 * so the on-disk diff stays minimal.
 */
export async function updateConfig(
  name: string,
  patch: Partial<SshEntry> | null,
  file = DEFAULT_CONFIG_PATH,
): Promise<void> {
  const raw = await readRaw(file)
  const blocks = parseRaw(raw)
  const out: string[] = []

  let replaced = false
  for (const block of blocks) {
    if (block.name === '') {
      out.push(block.lines.join('\n'))
      continue
    }
    if (block.name !== name) {
      out.push(block.lines.join('\n'))
      continue
    }
    replaced = true
    if (patch === null) continue // drop
    const current = entryFromRaw(block) ?? { name }
    const merged = mergeEntry(current, patch)
    out.push(renderEntry(merged).trimEnd())
  }

  if (!replaced && patch && patch !== null) {
    // New entry — append with a leading blank line when the file
    // isn't empty.
    const trailer = out.join('\n')
    const separator = trailer.trim().length > 0 ? '\n\n' : ''
    out.push(separator + renderEntry({ name, ...patch }).trimEnd())
  }

  let text = out.join('\n')
  if (!text.endsWith('\n')) text += '\n'
  await writeRaw(text, file)
}

function mergeEntry(
  base: SshEntry,
  patch: Partial<SshEntry>,
): SshEntry {
  return {
    name: patch.name ?? base.name,
    host: patch.host ?? base.host,
    user: patch.user ?? base.user,
    port: patch.port ?? base.port,
    key: patch.key ?? base.key,
    jump: patch.jump ?? base.jump,
    forward: patch.forward ?? base.forward,
    extra: patch.extra ?? base.extra,
  }
}

// ---- ssh actions --------------------------------------------------

export type SshTestResult = { name: string; ok: boolean; message: string }

/**
 * `ssh -T <name>` with `BatchMode=yes` so it fails fast instead
 * of hanging on a password prompt. Returns a structured result
 * so the caller can render it however they like.
 */
export async function testConnection(name: string): Promise<SshTestResult> {
  const { exec } = await import('~/code/tool/node/process')
  try {
    const { stderr } = await exec([
      'ssh',
      '-T',
      '-o',
      'BatchMode=yes',
      '-o',
      'ConnectTimeout=5',
      '-o',
      'StrictHostKeyChecking=accept-new',
      name,
    ])
    // ssh -T succeeds with code 1 on servers that reject shells
    // (e.g. GitHub). We treat any completion as reachability.
    return { name, ok: true, message: stderr.trim() || 'reachable' }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return { name, ok: false, message: msg }
  }
}
