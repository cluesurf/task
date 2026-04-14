/**
 * Build the DuckDB `COPY ... TO ... (FORMAT ...)` SQL strings
 * used by the data-convert action. Pure functions — no
 * execution. Execution happens in the duckdb/ node wrapper.
 *
 * All path arguments are escaped as DuckDB string literals: a
 * single quote inside the path is rendered as `''`. The caller
 * (node.ts) is responsible for shell-escaping the SQL string
 * itself when passing it to `duckdb -c`.
 */

/** DuckDB/SQL string-literal escape: wraps in `'...'` and doubles any `'`. */
function quoteSqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

export type BuildParquetToJsonlInput = {
  input: string
  output: string
}

export function buildSqlToConvertParquetToJsonl({
  input,
  output,
}: BuildParquetToJsonlInput): string {
  return `COPY (SELECT * FROM ${quoteSqlString(input)}) TO ${quoteSqlString(output)} (FORMAT JSON)`
}

export type BuildJsonlToParquetInput = {
  input: string
  output: string
  /** DuckDB `columns={...}` literal (e.g. `{id: 'INTEGER', text: 'VARCHAR'}`). */
  columns?: string
  compression?: 'ZSTD' | 'SNAPPY' | 'GZIP' | 'NONE'
}

export function buildSqlToConvertJsonlToParquet({
  input,
  output,
  columns,
  compression = 'ZSTD',
}: BuildJsonlToParquetInput): string {
  const inputLiteral = quoteSqlString(input)
  const readArgs = columns
    ? `${inputLiteral}, format='newline_delimited', columns=${columns}`
    : `${inputLiteral}, format='newline_delimited'`
  const reader = columns ? 'read_json' : 'read_json_auto'
  return `COPY (SELECT * FROM ${reader}(${readArgs})) TO ${quoteSqlString(output)} (FORMAT PARQUET, COMPRESSION ${compression})`
}
