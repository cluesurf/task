/**
 * Execute data-conversion actions by shelling out to the
 * `duckdb` CLI. Uses SQL strings assembled in `./command.ts`.
 */

import { execSync } from 'node:child_process'
import {
  buildSqlToConvertJsonlToParquet,
  buildSqlToConvertParquetToJsonl,
} from './command'

/** Run arbitrary SQL through the duckdb CLI. */
function runDuckdbSql(sql: string, timeout?: number): string {
  const escaped = sql.replace(/"/g, '\\"')
  return execSync(`duckdb -c "${escaped}"`, {
    encoding: 'utf-8',
    timeout,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

/** Convert a parquet file (or glob) to a JSONL file. */
export function convertParquetFileToJsonl(input: {
  input: string
  output: string
}): void {
  runDuckdbSql(buildSqlToConvertParquetToJsonl(input))
}

/** Convert a JSONL file to parquet with optional explicit columns. */
export function convertJsonlFileToParquet(input: {
  input: string
  output: string
  columns?: string
  compression?: 'ZSTD' | 'SNAPPY' | 'GZIP' | 'NONE'
}): void {
  runDuckdbSql(buildSqlToConvertJsonlToParquet(input))
}
