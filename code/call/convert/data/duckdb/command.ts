/**
 * Build the DuckDB `COPY ... TO ... (FORMAT ...)` SQL strings and
 * wrap them in `CommandSequence`s consumable by
 * `runCommandSequence` / `runGenericCommand`.
 *
 * Pure functions — no execution. Execution happens in
 * `./node.ts` via the shared command runner.
 *
 * Paths are escaped as DuckDB string literals (`'` → `''`) inside
 * the SQL. The SQL itself is passed to `duckdb -c <sql>` as a
 * separate argv entry, so shell quoting never enters the picture.
 */

import {
  getCommand,
  buildCommandSequence,
} from '~/code/tool/shared/command'
import type { CommandSequence } from '~/code/form/object/request'

/** DuckDB/SQL string-literal escape: wraps in `'...'` and doubles any `'`. */
function quoteSqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

function buildDuckdbCommandSequence(sql: string): CommandSequence {
  const cmd = getCommand('duckdb')
  cmd.link.push('-c', sql)
  return buildCommandSequence(cmd)
}

export type BuildParquetToJsonlInput = {
  input: string
  output: string
}

export function buildCommandToConvertParquetToJsonl({
  input,
  output,
}: BuildParquetToJsonlInput): CommandSequence {
  const sql = `COPY (SELECT * FROM ${quoteSqlString(input)}) TO ${quoteSqlString(output)} (FORMAT JSON)`
  return buildDuckdbCommandSequence(sql)
}

export type BuildJsonlToParquetInput = {
  input: string
  output: string
  /** DuckDB `columns={...}` literal (e.g. `{id: 'INTEGER', text: 'VARCHAR'}`). */
  columns?: string
  compression?: 'ZSTD' | 'SNAPPY' | 'GZIP' | 'NONE'
}

export function buildCommandToConvertJsonlToParquet({
  input,
  output,
  columns,
  compression = 'ZSTD',
}: BuildJsonlToParquetInput): CommandSequence {
  const inputLiteral = quoteSqlString(input)
  const readArgs = columns
    ? `${inputLiteral}, format='newline_delimited', columns=${columns}`
    : `${inputLiteral}, format='newline_delimited'`
  const reader = columns ? 'read_json' : 'read_json_auto'
  const sql = `COPY (SELECT * FROM ${reader}(${readArgs})) TO ${quoteSqlString(output)} (FORMAT PARQUET, COMPRESSION ${compression})`
  return buildDuckdbCommandSequence(sql)
}
