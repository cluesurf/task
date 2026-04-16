export function buildCommandToExportDb(input: {
  db: string
  source: string
  outputPath: string
  format?: 'csv' | 'tsv' | 'json'
  header?: boolean
}): { bin: 'psql'; args: string[] } {
  const fmt = input.format ?? 'csv'
  const isSql = /\s/.test(input.source.trim())
  const target = isSql
    ? `(${input.source.trim()})`
    : quoteIdent(input.source)
  const header = input.header === false ? '' : ', HEADER'
  const delim = fmt === 'tsv' ? `E'\\t'` : `','`
  const copy =
    fmt === 'json'
      ? `\\copy (SELECT json_agg(row_to_json(r)) FROM ${target} r) TO '${input.outputPath}'`
      : `\\copy ${target} TO '${input.outputPath}' WITH (FORMAT csv, DELIMITER ${delim}${header})`
  return { bin: 'psql', args: ['-d', input.db, '-c', copy] }
}

function quoteIdent(name: string): string {
  const i = name.indexOf('.')
  if (i < 0) return `"${name}"`
  return `"${name.slice(0, i)}"."${name.slice(i + 1)}"`
}
