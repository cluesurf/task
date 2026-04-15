// Run a SQL query against Postgres via psql. Emits tab-separated
// rows to stdout (-A -t) — pipe through `column -t` for pretty.

import { exec } from '~/code/tool/node/process'

export type QueryDbNodeInput = {
  db: string
  sql: string
  /** Output format. `tsv` (default), `csv`, `json`, `table`. */
  format?: 'tsv' | 'csv' | 'json' | 'table'
}

export async function queryDbNode(
  source: QueryDbNodeInput,
): Promise<string> {
  const argv = ['psql', '-d', source.db]
  switch (source.format ?? 'tsv') {
    case 'tsv':   argv.push('-A', '-t'); break
    case 'csv':   argv.push('-A', '-t', '-F', ','); break
    case 'json':
      // json via psql needs a wrapper query — let the caller pass
      // `SELECT json_agg(...)` explicitly, or use `task export` which
      // speaks CSV natively. For a simple auto-wrap:
      source = {
        ...source,
        sql: `SELECT json_agg(row_to_json(r)) FROM (${source.sql}) r;`,
      }
      argv.push('-A', '-t')
      break
    case 'table': /* default psql output */ break
  }
  argv.push('-c', source.sql)
  const { stdout } = await exec(argv)
  return stdout
}
