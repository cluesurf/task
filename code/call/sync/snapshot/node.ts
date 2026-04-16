/**
 * `task sync snapshot <paths...>` — deduplicated, versioned backup
 * via restic, borg, or kopia. All three take the same logical
 * input (a repository URL + a set of source paths) and differ only
 * in argument shape. This dispatcher picks a backend at runtime and
 * lazy-imports the matching `./<tool>/command.ts` pure argv builder.
 *
 * Repository URL forms:
 *   /local/path              (local file system)
 *   sftp:user@host:/path     (ssh, restic + borg)
 *   s3:endpoint/bucket       (restic)
 *   b2:bucket                (restic)
 *   rclone:remote:path       (restic)
 *
 * Passwords come from env vars specific to each tool:
 *   restic → RESTIC_PASSWORD
 *   borg   → BORG_PASSPHRASE
 *   kopia  → KOPIA_PASSWORD
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import { formatShellCommand } from '~/code/tool/shared/verb'
import {
  testSyncSnapshotNode,
  type SyncSnapshotCommand,
  type SyncSnapshotNodeInput,
  type SyncSnapshotNodeOutput,
  type SyncSnapshotTool,
} from './shared'
import { buildCommandToSyncSnapshotWithRestic } from './restic/command'
import { buildCommandToSyncSnapshotWithBorg } from './borg/command'
import { buildCommandToSyncSnapshotWithKopia } from './kopia/command'

export type { SyncSnapshotNodeInput, SyncSnapshotNodeOutput }
export { testSyncSnapshotNode }

export async function syncSnapshotNode(
  input: SyncSnapshotNodeInput,
): Promise<SyncSnapshotNodeOutput> {
  const tool: SyncSnapshotTool = input.tool ?? 'restic'
  const action = input.action ?? 'backup'
  const command = buildCommandForTool(tool, input)
  const printable = formatShellCommand(command)

  if (input.dryRun && input.verbose) {
    process.stdout.write(printable + '\n')
  }

  // borg restore extracts into the current directory; chdir when a
  // target is supplied so downstream callers don't surprise us.
  if (tool === 'borg' && action === 'restore' && input.target) {
    process.chdir(input.target)
  }

  await spawnAndWait({
    verb: 'sync snapshot',
    bin: command.bin,
    args: command.args,
    env: command.env,
    quiet: input.quiet,
  })

  return { tool, action, command: printable }
}

function buildCommandForTool(
  tool: SyncSnapshotTool,
  input: SyncSnapshotNodeInput,
): SyncSnapshotCommand {
  switch (tool) {
    case 'restic':
      return buildCommandToSyncSnapshotWithRestic(input)
    case 'borg':
      return buildCommandToSyncSnapshotWithBorg(input)
    case 'kopia':
      return buildCommandToSyncSnapshotWithKopia(input)
  }
}

