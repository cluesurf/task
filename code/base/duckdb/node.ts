/**
 * Thin wrapper around the DuckDB CLI binary.
 *
 * Everything shells out to `duckdb -c "<SQL>"`. The DuckDB
 * process handles parquet, JSON, and JSONL natively.
 */

import { execSync } from 'node:child_process'

export type DuckdbRunInput = {
  sql: string
  /** Optional timeout in ms. Defaults to none. */
  timeout?: number
}

/** Run a single SQL statement with the duckdb CLI. */
export function runDuckdbSql({ sql, timeout }: DuckdbRunInput): string {
  const escaped = sql.replace(/"/g, '\\"')
  return execSync(`duckdb -c "${escaped}"`, {
    encoding: 'utf-8',
    timeout,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

/** Convert a parquet file (or glob) to a JSONL file via COPY. */
export function convertParquetFileToJsonl({
  input,
  output,
}: {
  input: string
  output: string
}): void {
  runDuckdbSql({
    sql: `COPY (SELECT * FROM '${input}') TO '${output}' (FORMAT JSON)`,
  })
}

/** Convert a JSONL file to parquet with optional explicit columns. */
export function convertJsonlFileToParquet({
  input,
  output,
  columns,
  compression = 'ZSTD',
}: {
  input: string
  output: string
  /** DuckDB `columns={...}` literal (e.g. `{id: 'INTEGER', text: 'VARCHAR'}`). */
  columns?: string
  compression?: 'ZSTD' | 'SNAPPY' | 'GZIP' | 'NONE'
}): void {
  const readArgs = columns
    ? `'${input}', format='newline_delimited', columns=${columns}`
    : `'${input}', format='newline_delimited'`
  const reader = columns ? 'read_json' : 'read_json_auto'
  runDuckdbSql({
    sql: `COPY (SELECT * FROM ${reader}(${readArgs})) TO '${output}' (FORMAT PARQUET, COMPRESSION ${compression})`,
  })
}
