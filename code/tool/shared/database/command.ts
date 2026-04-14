/**
 * Pure command-line builders for database dump / restore.
 *
 * No I/O, no spawn, no fs — every export is a pure function from
 * `DbOptions` to `{ bin, args, env? }`. Safe to import from the
 * browser if you want to render a "preview the command we'd run"
 * UI, generate scripts, etc.
 *
 * The Node-side runner at `~/code/tool/node/database/base.ts`
 * consumes these and pipes them through `spawn` + redirection.
 */

export type DbEngine = 'pg' | 'mysql' | 'sqlite' | 'mongo'
export type DbDirection = 'dump' | 'restore'

export type DbOptions = {
  // common
  url?: string
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string

  // dump shape
  format?: 'plain' | 'custom' | 'directory' | 'tar' | 'archive' | 'json' | 'bson'
  schemaOnly?: boolean
  dataOnly?: boolean
  table?: string[]
  exclude?: string[]
  compress?: boolean

  // sqlite
  file?: string

  // I/O
  output?: string
  input?: string

  verbose?: boolean
  quiet?: boolean
}

export type DbCommand = {
  bin: string
  args: string[]
  /** Env overrides (caller merges with process.env). */
  env?: Record<string, string>
  /** When set, runner should write process stdout to this file. */
  captureTo?: string
  /** When set, runner should pipe this file to process stdin. */
  pipeFrom?: string
  /** Hint string for the install instruction on ENOENT. */
  install: string
}

const PG_INSTALL = 'brew install postgresql  or  apt install postgresql-client'
const MYSQL_INSTALL = 'brew install mysql-client  or  apt install default-mysql-client'
const SQLITE_INSTALL = 'brew install sqlite  or  apt install sqlite3'
const MONGO_INSTALL =
  'brew install mongodb-database-tools  or  https://www.mongodb.com/docs/database-tools/installation/'

export function buildPgDumpCommand(o: DbOptions): DbCommand {
  const args: string[] = []
  if (o.url) args.push(o.url)
  else applyPgConnArgs(args, o)
  if (o.format) args.push('--format', shortPgFormat(o.format))
  if (o.schemaOnly) args.push('--schema-only')
  if (o.dataOnly) args.push('--data-only')
  for (const t of o.table ?? []) args.push('--table', t)
  for (const t of o.exclude ?? []) args.push('--exclude-table', t)
  if (o.verbose) args.push('--verbose')
  return {
    bin: 'pg_dump',
    args,
    env: pgEnv(o),
    captureTo: o.output,
    install: PG_INSTALL,
  }
}

export function buildPgRestoreCommand(o: DbOptions): DbCommand {
  const isPlain = !o.format || o.format === 'plain'
  if (isPlain) {
    const args: string[] = []
    if (o.url) args.push(o.url)
    else applyPgConnArgs(args, o)
    args.push('-f', o.input ?? '-')
    return {
      bin: 'psql',
      args,
      env: pgEnv(o),
      pipeFrom: o.input,
      install: PG_INSTALL,
    }
  }
  const args: string[] = []
  if (o.url) args.push('--dbname', o.url)
  else applyPgConnArgs(args, o)
  args.push('--format', shortPgFormat(o.format!))
  if (o.input) args.push(o.input)
  return {
    bin: 'pg_restore',
    args,
    env: pgEnv(o),
    install: PG_INSTALL,
  }
}

export function buildMysqlDumpCommand(o: DbOptions): DbCommand {
  if (!o.database) {
    throw new Error('dump database mysql: --database required')
  }
  const args: string[] = []
  applyMysqlConnArgs(args, o)
  if (o.schemaOnly) args.push('--no-data')
  if (o.dataOnly) args.push('--no-create-info')
  args.push(o.database)
  for (const t of o.table ?? []) args.push(t)
  for (const t of o.exclude ?? []) args.push(`--ignore-table=${o.database}.${t}`)
  return { bin: 'mysqldump', args, captureTo: o.output, install: MYSQL_INSTALL }
}

export function buildMysqlRestoreCommand(o: DbOptions): DbCommand {
  const args: string[] = []
  applyMysqlConnArgs(args, o)
  if (o.database) args.push(o.database)
  return { bin: 'mysql', args, pipeFrom: o.input, install: MYSQL_INSTALL }
}

export function buildSqliteDumpCommand(o: DbOptions): DbCommand {
  if (!o.file) throw new Error('dump database sqlite: --file <db> required')
  return {
    bin: 'sqlite3',
    args: [o.file, '.dump'],
    captureTo: o.output,
    install: SQLITE_INSTALL,
  }
}

export function buildSqliteRestoreCommand(o: DbOptions): DbCommand {
  if (!o.file) throw new Error('restore database sqlite: --file <db> required')
  return {
    bin: 'sqlite3',
    args: [o.file],
    pipeFrom: o.input,
    install: SQLITE_INSTALL,
  }
}

export function buildMongoDumpCommand(o: DbOptions): DbCommand {
  const args: string[] = []
  if (o.url) args.push('--uri', o.url)
  else {
    if (o.host) args.push('--host', o.host)
    if (o.port) args.push('--port', String(o.port))
    if (o.user) args.push('--username', o.user)
    if (o.password) args.push('--password', o.password)
    if (o.database) args.push('--db', o.database)
  }
  if (o.output) args.push('--out', o.output)
  if (o.compress !== false) args.push('--gzip')
  if (o.quiet) args.push('--quiet')
  return { bin: 'mongodump', args, install: MONGO_INSTALL }
}

export function buildMongoRestoreCommand(o: DbOptions): DbCommand {
  const args: string[] = []
  if (o.url) args.push('--uri', o.url)
  else {
    if (o.host) args.push('--host', o.host)
    if (o.port) args.push('--port', String(o.port))
    if (o.user) args.push('--username', o.user)
    if (o.password) args.push('--password', o.password)
    if (o.database) args.push('--db', o.database)
  }
  if (o.compress !== false) args.push('--gzip')
  if (o.input) args.push(o.input)
  if (o.quiet) args.push('--quiet')
  return { bin: 'mongorestore', args, install: MONGO_INSTALL }
}

// ---- helpers ------------------------------------------------------

function applyPgConnArgs(args: string[], o: DbOptions) {
  if (o.host) args.push('-h', o.host)
  if (o.port) args.push('-p', String(o.port))
  if (o.user) args.push('-U', o.user)
  if (o.database) args.push('-d', o.database)
}
function pgEnv(o: DbOptions): Record<string, string> | undefined {
  return o.password ? { PGPASSWORD: o.password } : undefined
}
function applyMysqlConnArgs(args: string[], o: DbOptions) {
  if (o.host) args.push('-h', o.host)
  if (o.port) args.push('-P', String(o.port))
  if (o.user) args.push('-u', o.user)
  if (o.password) args.push(`-p${o.password}`)
}
function shortPgFormat(f: NonNullable<DbOptions['format']>): string {
  switch (f) {
    case 'custom':    return 'c'
    case 'directory': return 'd'
    case 'tar':       return 't'
    case 'archive':   return 'c'
    default:          return 'p'
  }
}
