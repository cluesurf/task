// Postgres backup via pg_dump. Default format is `custom` (-Fc),
// the most compact + restore-friendly. Use --format=plain for
// human-readable SQL.

import { exec } from '~/code/tool/node/process'

export type BackupDbNodeInput = {
  db: string
  output: { path: string }
  format?: 'custom' | 'plain' | 'tar' | 'directory'
  /** Compression level 0–9 (custom/directory format only). */
  compress?: number
  /** Schema-only dump (no data). */
  schemaOnly?: boolean
  /** Data-only dump (no schema). */
  dataOnly?: boolean
}

export async function backupDbNode(
  source: BackupDbNodeInput,
): Promise<void> {
  const fmt = source.format ?? 'custom'
  const fmtFlag = { custom: 'c', plain: 'p', tar: 't', directory: 'd' }[fmt]
  const argv = ['pg_dump', '-d', source.db, '-F', fmtFlag, '-f', source.output.path]
  if (source.compress != null) argv.push('-Z', String(source.compress))
  if (source.schemaOnly) argv.push('--schema-only')
  if (source.dataOnly) argv.push('--data-only')
  await exec(argv)
}
