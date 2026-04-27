/**
 * `task query sql duckdb` — analytical SQL over csv / parquet /
 * json / arrow files. Works against an in-memory DB by default;
 * pass `db` for a persistent file.
 *
 *   await task.query({
 *     sql: "SELECT count(*) FROM 'logs/*.jsonl' WHERE level='error'",
 *   })
 *
 * Convenience form (skip writing SQL):
 *
 *   await task.query({ from: 'data/users.csv', limit: 10 })
 */

import { spawnAndCapture } from '~/code/tool/node/spawn'
import {
  buildCommandToQuerySqlDuckdb,
  type QuerySqlDuckdbCommandInput,
} from './command'

export type QuerySqlDuckdbNodeInput = QuerySqlDuckdbCommandInput

async function querySqlDuckdbNode(
  source: QuerySqlDuckdbNodeInput,
): Promise<string> {
  const command = buildCommandToQuerySqlDuckdb(source)
  return spawnAndCapture({
    verb: 'query sql',
    bin: command.bin,
    args: command.args,
  })
}

export default querySqlDuckdbNode
export { querySqlDuckdbNode }
