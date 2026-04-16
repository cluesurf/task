/**
 * Build the DuckDB `COPY ... TO ... (FORMAT ...)` SQL strings and
 * return them as `{ bin, args }` tuples for `spawnAndWait`.
 *
 * Pure functions -- no execution. Execution happens in
 * `./node.ts` via `spawnAndWait`.
 *
 * Paths are escaped as DuckDB string literals (`'` -> `''`) inside
 * the SQL. The SQL itself is passed to `duckdb -c <sql>` as a
 * separate argv entry, so shell quoting never enters the picture.
 */

/** DuckDB/SQL string-literal escape: wraps in `'...'` and doubles any `'`. */
function quoteSqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

function buildDuckdbCommand(sql: string): {
  bin: 'duckdb'
  args: string[]
} {
  return { bin: 'duckdb', args: ['-c', sql] }
}

export type BuildParquetToJsonlInput = {
  input: string
  output: string
}

export function buildCommandToConvertParquetToJsonl(
  input: BuildParquetToJsonlInput,
): { bin: 'duckdb'; args: string[] } {
  const sql = `COPY (SELECT * FROM ${quoteSqlString(input.input)}) TO ${quoteSqlString(input.output)} (FORMAT JSON)`
  return buildDuckdbCommand(sql)
}

export type BuildJsonlToParquetInput = {
  input: string
  output: string
  /** DuckDB `columns={...}` literal (e.g. `{id: 'INTEGER', text: 'VARCHAR'}`). */
  columns?: string
  compression?: 'ZSTD' | 'SNAPPY' | 'GZIP' | 'NONE'
}

export function buildCommandToConvertJsonlToParquet(
  input: BuildJsonlToParquetInput,
): { bin: 'duckdb'; args: string[] } {
  const inputLiteral = quoteSqlString(input.input)
  const compression = input.compression ?? 'ZSTD'
  const readArgs = input.columns
    ? `${inputLiteral}, format='newline_delimited', columns=${input.columns}`
    : `${inputLiteral}, format='newline_delimited'`
  const reader = input.columns ? 'read_json' : 'read_json_auto'
  const sql = `COPY (SELECT * FROM ${reader}(${readArgs})) TO ${quoteSqlString(input.output)} (FORMAT PARQUET, COMPRESSION ${compression})`
  return buildDuckdbCommand(sql)
}
