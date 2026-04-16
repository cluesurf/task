export function buildCommandToQueryDb(input: {
  db: string
  sql: string
  format?: 'tsv' | 'csv' | 'json' | 'table'
}): { bin: 'psql'; args: string[] } {
  const args = ['-d', input.db]
  let sql = input.sql
  switch (input.format ?? 'tsv') {
    case 'tsv':
      args.push('-A', '-t')
      break
    case 'csv':
      args.push('-A', '-t', '-F', ',')
      break
    case 'json':
      sql = `SELECT json_agg(row_to_json(r)) FROM (${sql}) r;`
      args.push('-A', '-t')
      break
    case 'table':
      break
  }
  args.push('-c', sql)
  return { bin: 'psql', args }
}
