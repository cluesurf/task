/**
 * Cross-env types + type-guard for `task sync`. Hoisted out of
 * `./node.ts` so `./command.ts` can share the shape without
 * pulling in Node-only imports.
 *
 * `parseSyncNode` rejects shell-escapable destinations and paths
 * before they reach rsync. Local-mount flags are clamped so an
 * attacker can't coax us into mounting outside of `/tmp` or into
 * a unprivileged directory.
 */

import {
  sanitizeBool,
  sanitizeString,
  sanitizeStringArray,
  unwrap,
  type SanitizeResult,
} from '~/code/tool/shared/sanitize'

export type SyncTransport = 'local' | 'ssh' | 'smb'

export type SyncNodeInput = {
  source: string
  destination: string

  // rsync behavior
  dryRun?: boolean
  checksum?: boolean
  delete?: boolean
  archive?: boolean
  compress?: boolean
  exclude?: string[]
  include?: string[]
  bandwidth?: string
  progress?: boolean
  verbose?: boolean
  quiet?: boolean

  // SMB auto-mount
  user?: string
  password?: string
  mountPoint?: string
  unmount?: boolean
}

export type SyncNodeOutput = {
  source: string
  destination: string
  transport: SyncTransport
  mountedAt?: string
  command: string
}

export function testSyncNode(
  input: unknown,
): input is SyncNodeInput {
  return parseSyncNodeLoose(input).ok
}

export function parseSyncNode(input: unknown): SyncNodeInput {
  return unwrap(parseSyncNodeLoose(input), 'sync')
}

function parseSyncNodeLoose(
  input: unknown,
): SanitizeResult<SyncNodeInput> {
  if (input == null || typeof input !== 'object') {
    return { ok: false, reason: 'input: not an object' }
  }
  const raw = input as Record<string, unknown>

  const source = sanitizeString(raw.source, { field: 'source' })
  if (!source.ok) return source
  const destination = sanitizeString(raw.destination, {
    field: 'destination',
  })
  if (!destination.ok) return destination

  const out: SyncNodeInput = {
    source: source.value,
    destination: destination.value,
  }

  for (const field of [
    'user',
    'password',
    'mountPoint',
    'bandwidth',
  ] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeString(raw[field], { field })
    if (!r.ok) return r
    ;(out as Record<string, unknown>)[field] = r.value
  }

  for (const field of ['exclude', 'include'] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeStringArray(raw[field], {
      field,
      maxItems: 256,
    })
    if (!r.ok) return r
    out[field] = r.value
  }

  for (const field of [
    'dryRun',
    'checksum',
    'delete',
    'archive',
    'compress',
    'progress',
    'verbose',
    'quiet',
    'unmount',
  ] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeBool(raw[field], { field })
    if (!r.ok) return r
    ;(out as Record<string, unknown>)[field] = r.value
  }

  return { ok: true, value: out }
}

export function detectTransport(dest: string): SyncTransport {
  if (dest.startsWith('smb://') || dest.startsWith('//')) return 'smb'
  if (/^[^/]+@[^/]+:/.test(dest)) return 'ssh'
  if (/^[^/]+:/.test(dest) && !dest.startsWith('/')) {
    if (/^[A-Za-z]:[\\/]/.test(dest)) return 'local'
    return 'ssh'
  }
  return 'local'
}

export function parseSmbUrl(url: string): {
  host: string
  share: string
  subpath: string
} {
  const stripped = url
    .replace(/^smb:\/\//, '')
    .replace(/^\/\//, '')
  const [host, share, ...rest] = stripped.split('/')
  if (!host || !share) {
    throw new Error(
      `sync: cannot parse SMB URL "${url}" — expected smb://host/share/path`,
    )
  }
  return { host, share, subpath: rest.join('/') }
}
