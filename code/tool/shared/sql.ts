/**
 * SQL string and identifier quoting.
 *
 * - **String literals** delegate to `sql-escape-string` (already a
 *   dependency) — handles ANSI single-quote doubling plus optional
 *   backslash mode for engines that need it.
 * - **Identifiers** use ANSI double-quote doubling (Postgres /
 *   DuckDB / SQLite) or backtick doubling (MySQL). No npm package
 *   covers identifier escaping cleanly, and the implementation is
 *   small enough that adding one isn't worth the dep weight.
 *
 * Use these instead of string-concatenating user-controlled values
 * into SQL — DuckDB / psql / sqlite3 / mysql all parse the SQL we
 * pass via `-c`, so an unescaped quote in a filename or column
 * name breaks the query and (worse) opens a SQL injection.
 */

import escapeSqlString from 'sql-escape-string'

const NUL = String.fromCharCode(0)

export type QuoteSqlStringOptions = {
  /** Engine supports `\\'` etc. backslash escapes (MySQL). */
  backslashSupported?: boolean
}

/**
 * Quote a string literal for ANSI SQL — single-quoted, embedded
 * single quotes doubled, ANSI by default. For MySQL pass
 * `{ backslashSupported: true }`.
 */
export function quoteSqlString(
  value: string,
  options: QuoteSqlStringOptions = {},
): string {
  return escapeSqlString(value, options)
}

/**
 * Quote an identifier (table / column / schema) for ANSI SQL —
 * wrapped in double quotes, embedded double quotes doubled.
 * Use this for DuckDB, Postgres, SQLite. For MySQL identifiers
 * use `quoteSqlIdentifierBacktick`.
 */
export function quoteSqlIdentifier(name: string): string {
  if (name.indexOf(NUL) !== -1) {
    throw new Error('SQL identifier cannot contain NULL byte')
  }
  return `"${name.replace(/"/g, '""')}"`
}

/**
 * MySQL backtick variant. Doubles backticks inside the name.
 */
export function quoteSqlIdentifierBacktick(name: string): string {
  if (name.indexOf(NUL) !== -1) {
    throw new Error('SQL identifier cannot contain NULL byte')
  }
  return '`' + name.replace(/`/g, '``') + '`'
}

/**
 * Quote a fully-qualified identifier, e.g. `public.users`, by
 * splitting on `.` and quoting each piece. Already-quoted inputs
 * (leading and trailing `"`) pass through unchanged.
 */
export function quoteSqlQualified(name: string): string {
  if (name.startsWith('"') && name.endsWith('"')) return name
  return name.split('.').map(quoteSqlIdentifier).join('.')
}

/**
 * Render a single SQL value as the literal form most engines
 * accept. One value at a time — NOT a parameterized query
 * substituter. Prefer real parameterized queries when the engine
 * driver supports them.
 */
export function quoteSqlValue(
  value: string | number | bigint | boolean | null | Date,
  options: QuoteSqlStringOptions = {},
): string {
  if (value === null) return 'NULL'
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error(`SQL number literal must be finite, got ${value}`)
    }
    return String(value)
  }
  if (typeof value === 'bigint') return value.toString()
  if (value instanceof Date) {
    return quoteSqlString(value.toISOString(), options)
  }
  return quoteSqlString(value, options)
}
