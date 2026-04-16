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
 * default) leave it mounted. `--unmount` tears the mount down at
 * the end.
 *
 * Snapshot-style (deduplicated, versioned) backups use
 * `task sync snapshot` — restic / borg / kopia backends.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { formatShellCommand } from '~/code/tool/shared/verb'
import { buildCommandToSync } from './command'
import {
  detectTransport,
  parseSmbUrl,
  parseSyncNode,
  testSyncNode,
  type SyncNodeInput,
  type SyncNodeOutput,
} from './shared'

export type { SyncNodeInput, SyncNodeOutput }
export { testSyncNode }

async function syncNode(
  source: SyncNodeInput,
): Promise<SyncNodeOutput> {
  const input = parseSyncNode(source)
  const transport = detectTransport(input.destination)
  let rsyncDest = input.destination
  let mountedAt: string | undefined

  if (transport === 'smb') {
    mountedAt = await mountSmbShare(input)
    rsyncDest = resolveSmbRsyncPath(input.destination, mountedAt)
  }

  const command = buildCommandToSync({
    ...input,
    destination: rsyncDest,
  })
  const printable = formatShellCommand(command)

  if (input.dryRun && input.verbose) {
    process.stdout.write(printable + '\n')
  }

  try {
    await spawnAndWait({
      verb: 'sync',
      bin: command.bin,
      args: command.args,
      quiet: input.quiet,
    })
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

async function mountSmbShare(
  input: SyncNodeInput,
): Promise<string> {
  const parsed = parseSmbUrl(input.destination)
  const mountPoint =
    input.mountPoint ??
    path.join(
      os.tmpdir(),
      `task-smb-${parsed.host}-${parsed.share}`,
    )
  await fs.mkdir(mountPoint, { recursive: true })

  if (await isMounted(mountPoint)) return mountPoint

  if (process.platform === 'darwin') {
    const cred = input.user
      ? `${encodeURIComponent(input.user)}${input.password ? `:${encodeURIComponent(input.password)}` : ''}@`
      : ''
    const url = `//${cred}${parsed.host}/${parsed.share}`
    await spawnAndWait({
      verb: 'sync',
      bin: 'mount_smbfs',
      args: [url, mountPoint],
      quiet: input.quiet,
    })
  } else if (process.platform === 'linux') {
    const opts: string[] = []
    if (input.user) opts.push(`username=${input.user}`)
    if (input.password) opts.push(`password=${input.password}`)
    opts.push(`uid=${process.getuid?.() ?? 1000}`)
    const args = [
      '-t',
      'cifs',
      `//${parsed.host}/${parsed.share}`,
      mountPoint,
    ]
    if (opts.length) args.push('-o', opts.join(','))
    await spawnAndWait({
      verb: 'sync',
      bin: 'mount',
      args,
      quiet: input.quiet,
    })
  } else {
    throw new Error(
      'sync: SMB auto-mount is only implemented on macOS and Linux. ' +
        'On Windows, map the share as a drive letter first and sync to that path.',
    )
  }

  return mountPoint
}

async function unmountSmbShare(mountPoint: string): Promise<void> {
  await spawnAndWait({
    verb: 'sync',
    bin: 'umount',
    args: [mountPoint],
    quiet: true,
  })
}

async function isMounted(mountPoint: string): Promise<boolean> {
  try {
    const stat = await fs.stat(mountPoint)
    if (!stat.isDirectory()) return false
    const parent = await fs.stat(path.dirname(mountPoint))
    return stat.dev !== parent.dev
  } catch {
    return false
  }
}

function resolveSmbRsyncPath(
  url: string,
  mountPoint: string,
): string {
  const { subpath } = parseSmbUrl(url)
  return subpath ? path.join(mountPoint, subpath) : mountPoint
}


export default syncNode
export { syncNode }
