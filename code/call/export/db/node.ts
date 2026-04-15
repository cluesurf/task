// Export a Postgres table (or an arbitrary SELECT) to CSV / TSV /
// JSON via psql's `\copy`. `\copy` (client-side) is used instead
// of server-side `COPY` so the output file doesn't need server
// filesystem access.

import { exec } from '~/code/tool/node/process'

export type ExportDbNodeInput = {
  db: string
  /** Source: table name (`schema.table` or `table`) or raw SQL. */
  source: string
  output: { path: string }
  format?: 'csv' | 'tsv' | 'json'
  /** Include column headers (csv/tsv). Default true. */
  header?: boolean
}

export async function exportDbNode(
  source: ExportDbNodeInput,
): Promise<void> {
  const fmt = source.format ?? 'csv'
  const isSql = /\s/.test(source.source.trim())
  const target = isSql ? `(${source.source.trim()})` : quoteIdent(source.source)
  const header = source.header === false ? '' : ', HEADER'
  const delim = fmt === 'tsv' ? `E'\\t'` : `','`
  const copy =
    fmt === 'json'
      ? `\\copy (SELECT json_agg(row_to_json(r)) FROM ${target} r) TO '${source.output.path}'`
      : `\\copy ${target} TO '${source.output.path}' WITH (FORMAT csv, DELIMITER ${delim}${header})`
  await exec(['psql', '-d', source.db, '-c', copy])
}

function quoteIdent(name: string): string {
  const i = name.indexOf('.')
  if (i < 0) return `"${name}"`
  return `"${name.slice(0, i)}"."${name.slice(i + 1)}"`
}
