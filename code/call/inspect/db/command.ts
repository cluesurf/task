export type InspectDbShow =
  | 'tables'
  | 'schemas'
  | 'size'
  | 'extensions'
  | 'roles'

export function buildCommandToInspectDb(input: {
  db: string
  show?: InspectDbShow
}): { bin: 'psql'; args: string[] } {
  const query = QUERIES[input.show ?? 'tables']
  return {
    bin: 'psql',
    args: ['-d', input.db, '-A', '-t', '-c', query],
  }
}

const QUERIES: Record<InspectDbShow, string> = {
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
