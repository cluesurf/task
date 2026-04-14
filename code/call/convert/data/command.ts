/**
 * Build the DuckDB `COPY ... TO ... (FORMAT ...)` SQL strings
 * used by the data-convert action. Pure functions — no
 * execution. Execution happens in the duckdb/ node wrapper.
 */

export type BuildParquetToJsonlInput = {
  input: string
  output: string
}

export function buildSqlToConvertParquetToJsonl({
  input,
  output,
}: BuildParquetToJsonlInput): string {
  return `COPY (SELECT * FROM '${input}') TO '${output}' (FORMAT JSON)`
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
  const readArgs = columns
    ? `'${input}', format='newline_delimited', columns=${columns}`
    : `'${input}', format='newline_delimited'`
  const reader = columns ? 'read_json' : 'read_json_auto'
  return `COPY (SELECT * FROM ${reader}(${readArgs})) TO '${output}' (FORMAT PARQUET, COMPRESSION ${compression})`
}
