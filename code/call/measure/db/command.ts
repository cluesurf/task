export function buildCommandToMeasureDb(input: {
  db: string
  sql: string
  plain?: boolean
}): { bin: 'psql'; args: string[] } {
  const wrapped = input.plain
    ? input.sql
    : `EXPLAIN (ANALYZE, BUFFERS, VERBOSE) ${input.sql}`
  return {
    bin: 'psql',
    args: ['-d', input.db, '-c', `\\timing on`, '-c', wrapped],
  }
}
