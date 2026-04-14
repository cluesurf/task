/**
 * `task sync` — rsync-style directory mirror with optional SMB/NAS
 * auto-mount.
 *
 * Local → local, local → ssh, local → SMB share: pick the right
 * transport from the destination string.
 *   `/path`, `./rel`           → local
 *   `user@host:/path`          → rsync-over-ssh
 *   `smb://host/share/dir`     → SMB mount + local rsync
 *   `//host/share/dir`         → same
 *
 * For SMB we auto-mount the share once, sync into it, and (by
 * default) leave it mounted so the user can poke around. `--unmount`
 * tears the mount down at the end.
 *
 * For snapshot-style (deduplicated, versioned) backups use `task
 * sync snapshot` — restic / borg / kopia backends.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

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
  transport: 'local' | 'ssh' | 'smb'
  mountedAt?: string
  command: string
}

export async function syncNode(
  input: SyncNodeInput,
): Promise<SyncNodeOutput> {
  const transport = detectTransport(input.destination)
  let rsyncDest = input.destination
  let mountedAt: string | undefined

  if (transport === 'smb') {
    mountedAt = await mountSmbShare(input)
    rsyncDest = resolveSmbRsyncPath(input.destination, mountedAt)
  }

  const args = buildRsyncArgs({ ...input, destination: rsyncDest })
  const printable = `rsync ${args.map(quote).join(' ')}`

  if (input.dryRun && input.verbose) {
    process.stdout.write(printable + '\n')
  }

  try {
    await runProcess('rsync', args, { quiet: input.quiet })
  } finally {
    if (transport === 'smb' && input.unmount && mountedAt) {
      await unmountSmbShare(mountedAt).catch(() => undefined)
    }
  }

  return {
    source: input.source,
    destination: input.destination,
    transport,
    mountedAt,
    command: printable,
  }
}

function buildRsyncArgs(input: SyncNodeInput): string[] {
  const a: string[] = []
  // `-a` (archive) preserves perms/times/links/group/owner/recursive.
  // Default-on because mirror workflows almost always want this.
  if (input.archive !== false) a.push('-a')
  if (input.compress) a.push('-z')
  if (input.checksum) a.push('-c')
  if (input.delete) a.push('--delete')
  if (input.dryRun) a.push('--dry-run')
  if (input.progress) a.push('--progress')
  if (input.verbose) a.push('-v')
  if (input.quiet) a.push('-q')
  if (input.bandwidth) a.push('--bwlimit', input.bandwidth)
  for (const p of input.exclude ?? []) a.push('--exclude', p)
  for (const p of input.include ?? []) a.push('--include', p)
  // Trailing slash on source = "copy contents of"; no slash = "copy
  // the dir itself". We pass through verbatim so the user stays in
  // control.
  a.push(input.source, input.destination)
  return a
}

function detectTransport(dest: string): 'local' | 'ssh' | 'smb' {
  if (dest.startsWith('smb://') || dest.startsWith('//')) return 'smb'
  if (/^[^/]+@[^/]+:/.test(dest) || /^[^/]+:/.test(dest) && !dest.startsWith('/')) {
    // `host:/path` or `user@host:/path`
    if (/^[A-Za-z]:[\\/]/.test(dest)) return 'local' // Windows C:\ path
    return 'ssh'
  }
  return 'local'
}

async function mountSmbShare(input: SyncNodeInput): Promise<string> {
  const parsed = parseSmbUrl(input.destination)
  const mountPoint = input.mountPoint ??
    path.join(os.tmpdir(), `task-smb-${parsed.host}-${parsed.share}`)
  await fs.mkdir(mountPoint, { recursive: true })

  // Already mounted? Reuse.
  if (await isMounted(mountPoint)) return mountPoint

  if (process.platform === 'darwin') {
    // mount_smbfs //user:pass@host/share /mount/point
    const cred = input.user
      ? `${encodeURIComponent(input.user)}${input.password ? `:${encodeURIComponent(input.password)}` : ''}@`
      : ''
    const url = `//${cred}${parsed.host}/${parsed.share}`
    await runProcess('mount_smbfs', [url, mountPoint], { quiet: input.quiet })
  } else if (process.platform === 'linux') {
    // mount -t cifs //host/share /mount/point -o user=...,pass=...
    const opts: string[] = []
    if (input.user) opts.push(`username=${input.user}`)
    if (input.password) opts.push(`password=${input.password}`)
    opts.push(`uid=${process.getuid?.() ?? 1000}`)
    const args = ['-t', 'cifs', `//${parsed.host}/${parsed.share}`, mountPoint]
    if (opts.length) args.push('-o', opts.join(','))
    await runProcess('mount', args, { quiet: input.quiet })
  } else {
    throw new Error(
      'sync: SMB auto-mount is only implemented on macOS and Linux. ' +
        'On Windows, map the share as a drive letter first and sync to that path.',
    )
  }

  return mountPoint
}

async function unmountSmbShare(mountPoint: string): Promise<void> {
  const cmd = process.platform === 'darwin' ? 'umount' : 'umount'
  await runProcess(cmd, [mountPoint], { quiet: true })
}

async function isMounted(mountPoint: string): Promise<boolean> {
  try {
    const stat = await fs.stat(mountPoint)
    if (!stat.isDirectory()) return false
    // A mounted SMB share has a different device id than its parent.
    const parent = await fs.stat(path.dirname(mountPoint))
    return stat.dev !== parent.dev
  } catch {
    return false
  }
}

function parseSmbUrl(url: string): {
  host: string
  share: string
  subpath: string
} {
  const stripped = url.replace(/^smb:\/\//, '').replace(/^\/\//, '')
  const [host, share, ...rest] = stripped.split('/')
  if (!host || !share) {
    throw new Error(`sync: cannot parse SMB URL "${url}" — expected smb://host/share/path`)
  }
  return { host, share, subpath: rest.join('/') }
}

function resolveSmbRsyncPath(url: string, mountPoint: string): string {
  const { subpath } = parseSmbUrl(url)
  return subpath ? path.join(mountPoint, subpath) : mountPoint
}

function quote(s: string): string {
  return /[\s"'$`\\]/.test(s) ? `'${s.replace(/'/g, `'\\''`)}'` : s
}

async function runProcess(
  cmd: string,
  args: string[],
  opts: { quiet?: boolean },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: opts.quiet ? ['ignore', 'ignore', 'inherit'] : 'inherit',
    })
    child.on('error', err => {
      const msg = (err as NodeJS.ErrnoException).code === 'ENOENT'
        ? `sync: \`${cmd}\` not found on PATH. Install it first.`
        : `sync: ${cmd} failed — ${err.message}`
      reject(new Error(msg))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`sync: ${cmd} exited with code ${code}`))
    })
  })
}
