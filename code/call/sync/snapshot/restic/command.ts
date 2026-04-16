import type {
  SyncSnapshotAction,
  SyncSnapshotCommand,
  SyncSnapshotNodeInput,
} from '../shared'

export function buildCommandToSyncSnapshotWithRestic(
  input: SyncSnapshotNodeInput,
): SyncSnapshotCommand {
  const action: SyncSnapshotAction = input.action ?? 'backup'
  const args: string[] = ['-r', input.repo]
  if (input.quiet) args.push('--quiet')
  if (input.verbose) args.push('--verbose')

  switch (action) {
    case 'init':
      args.push('init')
      break
    case 'backup':
      args.push('backup')
      for (const t of input.tag ?? []) args.push('--tag', t)
      for (const e of input.exclude ?? []) args.push('--exclude', e)
      if (input.dryRun) args.push('--dry-run')
      args.push(...(input.paths ?? []))
      break
    case 'restore':
      args.push('restore', input.snapshotId ?? 'latest')
      if (input.target) args.push('--target', input.target)
      break
    case 'list':
      args.push('snapshots')
      for (const t of input.tag ?? []) args.push('--tag', t)
      break
    case 'prune':
      args.push('forget', '--prune')
      if (input.keep?.daily)
        args.push('--keep-daily', String(input.keep.daily))
      if (input.keep?.weekly)
        args.push('--keep-weekly', String(input.keep.weekly))
      if (input.keep?.monthly)
        args.push('--keep-monthly', String(input.keep.monthly))
      if (input.keep?.yearly)
        args.push('--keep-yearly', String(input.keep.yearly))
      break
  }

  const env = { ...process.env }
  if (input.password) env.RESTIC_PASSWORD = input.password
  return { bin: 'restic', args, env }
}
