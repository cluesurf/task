// Postgres inspection. Connection config comes from standard
// `PG*` env vars (PGHOST / PGPORT / PGUSER / PGPASSWORD); the
// `db` positional overrides PGDATABASE.
//
// Examples:
//   task inspect db mydb --tables
//   task inspect db mydb --schemas
//   task inspect db mydb --size

import { exec } from '~/code/tool/node/process'

export type InspectDbNodeInput = {
  db: string
  show?: 'tables' | 'schemas' | 'size' | 'extensions' | 'roles'
}

export async function inspectDbNode(
  source: InspectDbNodeInput,
): Promise<string> {
  const query = QUERIES[source.show ?? 'tables']
  const { stdout } = await exec([
    'psql',
    '-d',
    source.db,
    '-A',
    '-t',
    '-c',
    query,
  ])
  return stdout
}

const QUERIES = {
  tables:
    `SELECT table_schema || '.' || table_name AS table
     FROM information_schema.tables
     WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
     ORDER BY table_schema, table_name;`,
  schemas:
    `SELECT schema_name
     FROM information_schema.schemata
     WHERE schema_name NOT LIKE 'pg_%'
       AND schema_name <> 'information_schema'
     ORDER BY schema_name;`,
  size:
    `SELECT pg_size_pretty(pg_database_size(current_database())) AS size;`,
  extensions:
    `SELECT extname, extversion FROM pg_extension ORDER BY extname;`,
  roles:
    `SELECT rolname FROM pg_roles ORDER BY rolname;`,
}
