export function buildCommandToInspectTable(input: {
  table: string
  db?: string
}): { bin: 'psql'; args: string[] } {
  const [schema, name] = parseTable(input.table)
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

  const args = ['-A', '-c', q]
  if (input.db) args.unshift('-d', input.db)
  return { bin: 'psql', args }
}

function parseTable(t: string): [string, string] {
  const i = t.indexOf('.')
  if (i < 0) return ['public', t]
  return [t.slice(0, i), t.slice(i + 1)]
}
