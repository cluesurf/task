// Postgres table inspection. Returns columns (name, type, nullable,
// default), row count, and indexes.

import { exec } from '~/code/tool/node/process'

export type InspectTableNodeInput = {
  /** `table` or `schema.table`. */
  table: string
  /** Database to connect to. Overrides PGDATABASE. */
  db?: string
}

export async function inspectTableNode(
  source: InspectTableNodeInput,
): Promise<string> {
  const [schema, name] = parseTable(source.table)
  const q = [
    `\\echo === columns ===`,
    `SELECT column_name, data_type, is_nullable, column_default
     FROM information_schema.columns
     WHERE table_schema = '${schema}' AND table_name = '${name}'
     ORDER BY ordinal_position;`,
    `\\echo`,
    `\\echo === row count ===`,
    `SELECT count(*) FROM "${schema}"."${name}";`,
    `\\echo`,
    `\\echo === indexes ===`,
    `SELECT indexname, indexdef
     FROM pg_indexes
     WHERE schemaname = '${schema}' AND tablename = '${name}';`,
  ].join('\n')

  const argv = ['psql', '-A', '-c', q]
  if (source.db) argv.splice(1, 0, '-d', source.db)
  const { stdout } = await exec(argv)
  return stdout
}

function parseTable(t: string): [string, string] {
  const i = t.indexOf('.')
  if (i < 0) return ['public', t]
  return [t.slice(0, i), t.slice(i + 1)]
}
