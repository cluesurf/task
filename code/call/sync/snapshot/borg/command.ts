import type {
  SyncSnapshotAction,
  SyncSnapshotCommand,
  SyncSnapshotNodeInput,
} from '../shared'

export function buildCommandToSyncSnapshotWithBorg(
  input: SyncSnapshotNodeInput,
): SyncSnapshotCommand {
  const action: SyncSnapshotAction = input.action ?? 'backup'
  const args: string[] = []
  if (input.quiet) args.push('--quiet')
  if (input.verbose) args.push('--verbose')

  const archiveTag = (
    input.tag?.[0] ?? new Date().toISOString()
  ).replace(/[:.]/g, '-')

  switch (action) {
    case 'init':
      args.push('init', '--encryption=repokey', input.repo)
      break
    case 'backup':
      args.push('create')
      for (const e of input.exclude ?? []) args.push('--exclude', e)
      if (input.dryRun) args.push('--dry-run')
      args.push(`${input.repo}::${archiveTag}`)
      args.push(...(input.paths ?? []))
      break
    case 'restore':
      args.push(
        'extract',
        `${input.repo}::${input.snapshotId ?? archiveTag}`,
      )
      break
    case 'list':
      args.push('list', input.repo)
      break
    case 'prune':
      args.push('prune')
      if (input.keep?.daily)
        args.push('--keep-daily', String(input.keep.daily))
      if (input.keep?.weekly)
        args.push('--keep-weekly', String(input.keep.weekly))
      if (input.keep?.monthly)
        args.push('--keep-monthly', String(input.keep.monthly))
      if (input.keep?.yearly)
        args.push('--keep-yearly', String(input.keep.yearly))
      args.push(input.repo)
      break
  }

  const env = { ...process.env }
  if (input.password) env.BORG_PASSPHRASE = input.password
  return { bin: 'borg', args, env }
}
