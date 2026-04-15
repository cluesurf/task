/**
 * Pure argv builders for `task sync`. rsync is the only backend;
 * the SMB / SSH transport just changes what destination path rsync
 * sees. Extracted from `./node.ts` as a step toward the canonical
 * four-branch pattern.
 */

import type { SyncNodeInput } from './shared'

export type SyncCommand = {
  bin: 'rsync'
  args: string[]
}

export function buildCommandToSync(input: SyncNodeInput): SyncCommand {
  const a: string[] = []
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
  a.push(input.source, input.destination)
  return { bin: 'rsync', args: a }
}
