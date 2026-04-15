/**
 * Cross-env types + type-guard for `task sync`. Hoisted out of
 * `./node.ts` so `./command.ts` can share the shape without
 * pulling in Node-only imports.
 */

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

export function testSyncNode(input: unknown): input is SyncNodeInput {
  if (input == null || typeof input !== 'object') return false
  const { source, destination } = input as {
    source?: unknown
    destination?: unknown
  }
  return typeof source === 'string' && typeof destination === 'string'
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
