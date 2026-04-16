import type {
  SyncSnapshotAction,
  SyncSnapshotCommand,
  SyncSnapshotNodeInput,
} from '../shared'

export function buildCommandToSyncSnapshotWithKopia(
  input: SyncSnapshotNodeInput,
): SyncSnapshotCommand {
  const action: SyncSnapshotAction = input.action ?? 'backup'
  const args: string[] = []

  switch (action) {
    case 'init':
      // Kopia needs an explicit storage backend. Assume filesystem
      // unless the URL suggests otherwise.
      args.push(
        'repository',
        'create',
        'filesystem',
        '--path',
        input.repo,
      )
      break
    case 'backup':
      args.push('snapshot', 'create')
      for (const t of input.tag ?? []) args.push('--tags', t)
      if (input.dryRun) args.push('--dry-run')
      args.push(...(input.paths ?? []))
      break
    case 'restore':
      args.push(
        'snapshot',
        'restore',
        input.snapshotId ?? 'latest',
      )
      if (input.target) args.push(input.target)
      break
    case 'list':
      args.push('snapshot', 'list')
      for (const t of input.tag ?? []) args.push('--tags', t)
      break
    case 'prune':
      args.push('snapshot', 'expire')
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
  if (input.password) env.KOPIA_PASSWORD = input.password
  return { bin: 'kopia', args, env }
}
