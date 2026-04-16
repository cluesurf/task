// Time + EXPLAIN a SQL query. Prints `EXPLAIN (ANALYZE, BUFFERS)`
// output — the richest planner info psql exposes.

import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToMeasureDb } from './command'

export type MeasureDbNodeInput = {
  db: string
  sql: string
  plain?: boolean
}

async function measureDbNode(
  source: MeasureDbNodeInput,
): Promise<string> {
  const command = buildCommandToMeasureDb({
    db: source.db,
    sql: source.sql,
    plain: source.plain,
  })
  return spawnAndCapture({
    verb: 'measure db',
    bin: command.bin,
    args: command.args,
  })
}

export default measureDbNode
export { measureDbNode }
