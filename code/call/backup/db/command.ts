export function buildCommandToBackupDb(input: {
  db: string
  outputPath: string
  format?: 'custom' | 'plain' | 'tar' | 'directory'
  compress?: number
  schemaOnly?: boolean
  dataOnly?: boolean
}): { bin: 'pg_dump'; args: string[] } {
  const fmt = input.format ?? 'custom'
  const fmtFlag = {
    custom: 'c',
    plain: 'p',
    tar: 't',
    directory: 'd',
  }[fmt]
  const args = [
    '-d',
    input.db,
    '-F',
    fmtFlag,
    '-f',
    input.outputPath,
  ]
  if (input.compress != null)
    args.push('-Z', String(input.compress))
  if (input.schemaOnly) args.push('--schema-only')
  if (input.dataOnly) args.push('--data-only')
  return { bin: 'pg_dump', args }
}
