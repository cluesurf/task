// Time + EXPLAIN a SQL query. Prints `EXPLAIN (ANALYZE, BUFFERS)`
// output — the richest planner info psql exposes.

import { exec } from '~/code/tool/node/process'

export type MeasureDbNodeInput = {
  db: string
  sql: string
  /** Skip EXPLAIN, just time the query. */
  plain?: boolean
}

export async function measureDbNode(
  source: MeasureDbNodeInput,
): Promise<string> {
  const wrapped = source.plain
    ? source.sql
    : `EXPLAIN (ANALYZE, BUFFERS, VERBOSE) ${source.sql}`
  const argv = ['psql', '-d', source.db, '-c', `\\timing on`, '-c', wrapped]
  const { stdout } = await exec(argv)
  return stdout
}
