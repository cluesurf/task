// Run a SQL query against Postgres via psql. Emits tab-separated
// rows to stdout (-A -t) — pipe through `column -t` for pretty.

import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToQueryDb } from './command'

export type QueryDbNodeInput = {
  db: string
  sql: string
  format?: 'tsv' | 'csv' | 'json' | 'table'
}

async function queryDbNode(
  source: QueryDbNodeInput,
): Promise<string> {
  const command = buildCommandToQueryDb({
    db: source.db,
    sql: source.sql,
    format: source.format,
  })
  return spawnAndCapture({
    verb: 'query db',
    bin: command.bin,
    args: command.args,
  })
}

export default queryDbNode
export { queryDbNode }
