/**
 * Cross-env types + type-guard for `task sync snapshot`. Shared
 * across the restic / borg / kopia backends under `./<tool>/`.
 */

export type SyncSnapshotTool = 'restic' | 'borg' | 'kopia'

export type SyncSnapshotAction =
  | 'backup'
  | 'restore'
  | 'list'
  | 'prune'
  | 'init'

export type SyncSnapshotKeep = {
  daily?: number
  weekly?: number
  monthly?: number
  yearly?: number
}

export type SyncSnapshotNodeInput = {
  tool?: SyncSnapshotTool
  action?: SyncSnapshotAction
  repo: string
  paths?: string[]
  tag?: string[]
  exclude?: string[]
  /** Destination dir for `restore`. */
  target?: string
  snapshotId?: string
  password?: string
  keep?: SyncSnapshotKeep
  dryRun?: boolean
  verbose?: boolean
  quiet?: boolean
}

export type SyncSnapshotNodeOutput = {
  tool: SyncSnapshotTool
  action: SyncSnapshotAction
  command: string
}

export type SyncSnapshotCommand = {
  bin: SyncSnapshotTool
  args: string[]
  env: NodeJS.ProcessEnv
}

export function testSyncSnapshotNode(
  input: unknown,
): input is SyncSnapshotNodeInput {
  if (input == null || typeof input !== 'object') return false
  return typeof (input as { repo?: unknown }).repo === 'string'
}
