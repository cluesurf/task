/**
 * DuckDB argv builder. DuckDB can read csv / parquet / json /
 * arrow files directly with SQL — no schema declaration needed.
 *
 *   duckdb -box -c "SELECT * FROM 'data.csv' LIMIT 10"
 *
 * `db` opens a persistent database file instead of in-memory.
 * `format` toggles the output renderer.
 *
 * For convenience the caller can pass `from` instead of writing
 * SQL by hand — the path is properly escaped as a DuckDB string
 * literal (single-quoted, internal quotes doubled), so paths
 * with apostrophes, spaces, or globs work without surprise.
 */

import { quoteSqlIdentifier, quoteSqlString } from '~/code/tool/shared/sql'

export type QuerySqlDuckdbCommandInput = {
  /** Raw SQL. Use this OR `from` + `select`, not both. */
  sql?: string
  /** Convenience: `SELECT <select|*> FROM '<from>' [LIMIT <limit>]`. */
  from?: string
  select?: string
  where?: string
  limit?: number
  /** Persistent database file. Omit for in-memory. */
  db?: string
  /** DuckDB renderer. `box` is the default pretty layout. */
  format?: 'csv' | 'json' | 'box' | 'markdown' | 'line' | 'tsv'
  /** Open the database read-only. */
  readOnly?: boolean
}

export function buildCommandToQuerySqlDuckdb(
  input: QuerySqlDuckdbCommandInput,
): { bin: 'duckdb'; args: string[] } {
  const sql = input.sql ?? buildSqlFromConvenience(input)
  if (!sql) {
    throw new Error(
      'query sql duckdb: provide either `sql` or (`from` + optional `select`/`where`/`limit`)',
    )
  }
  const args: string[] = []
  if (input.readOnly) args.push('-readonly')
  args.push('-' + (input.format ?? 'box'))
  if (input.db) args.push(input.db)
  args.push('-c', sql)
  return { bin: 'duckdb', args }
}

function buildSqlFromConvenience(
  input: QuerySqlDuckdbCommandInput,
): string | undefined {
  if (!input.from) return undefined
  const select = input.select ?? '*'
  const parts = [`SELECT ${select}`, `FROM ${quoteSqlString(input.from)}`]
  if (input.where) parts.push(`WHERE ${input.where}`)
  if (typeof input.limit === 'number') {
    if (!Number.isInteger(input.limit) || input.limit < 0) {
      throw new Error('query sql duckdb: limit must be a non-negative integer')
    }
    parts.push(`LIMIT ${input.limit}`)
  }
  return parts.join(' ')
}

export { quoteSqlIdentifier, quoteSqlString }
