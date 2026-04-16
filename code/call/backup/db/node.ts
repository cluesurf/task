// Postgres backup via pg_dump. Default format is `custom` (-Fc),
// the most compact + restore-friendly. Use --format=plain for
// human-readable SQL.

import { spawnAndWait } from '~/code/tool/node/spawn'
import { ensureParentDir } from '~/code/tool/node/file'
import { buildCommandToBackupDb } from './command'

export type BackupDbNodeInput = {
  db: string
  output: { path: string }
  format?: 'custom' | 'plain' | 'tar' | 'directory'
  compress?: number
  schemaOnly?: boolean
  dataOnly?: boolean
}

async function backupDbNode(
  source: BackupDbNodeInput,
): Promise<void> {
  await ensureParentDir(source.output.path)
  const command = buildCommandToBackupDb({
    db: source.db,
    outputPath: source.output.path,
    format: source.format,
    compress: source.compress,
    schemaOnly: source.schemaOnly,
    dataOnly: source.dataOnly,
  })
  await spawnAndWait({
    verb: 'backup db',
    bin: command.bin,
    args: command.args,
  })
}

export default backupDbNode
export { backupDbNode }
