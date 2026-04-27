import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task query sql duckdb',
  describe:
    'Run analytical SQL over CSV / Parquet / JSON / Arrow files via DuckDB',
  options: [
    { long: 'sql', short: 'q', describe: 'Raw SQL to run' },
    { long: 'from', describe: "Source path (csv/parquet/json) to SELECT FROM" },
    { long: 'select', describe: 'Projection used with --from (default *)' },
    { long: 'where', describe: 'WHERE clause used with --from' },
    { long: 'limit', describe: 'LIMIT used with --from' },
    { long: 'db', describe: 'Persistent DuckDB file (default in-memory)' },
    { long: 'format', short: 'f', describe: 'Output renderer (csv|json|box|markdown|line|tsv)' },
    { long: 'read-only', describe: 'Open --db read-only' },
  ],
  examples: [
    {
      comment: 'count rows in a parquet glob',
      command: "task query sql --sql \"SELECT count(*) FROM 'data/*.parquet'\"",
    },
    {
      comment: 'preview a csv',
      command: 'task query sql --from data/users.csv --limit 10',
    },
    {
      comment: 'json output',
      command: "task query sql --from logs.jsonl --select \"level,count(*)\" --where \"level='error'\" --format json",
    },
  ],
})

export const querySqlDuckdbConsole: CommandModule = {
  command: 'duckdb',
  describe: 'Run analytical SQL over files via DuckDB',
  builder: y =>
    y
      .option('sql', { alias: 'q', type: 'string' })
      .option('from', { type: 'string' })
      .option('select', { type: 'string' })
      .option('where', { type: 'string' })
      .option('limit', { type: 'number' })
      .option('db', { type: 'string' })
      .option('format', {
        alias: 'f',
        choices: ['csv', 'json', 'box', 'markdown', 'line', 'tsv'] as const,
      })
      .option('read-only', { type: 'boolean', default: false }),
  handler: async argv => {
    const { querySqlDuckdbNode } = await import('./node')
    const out = await querySqlDuckdbNode({
      sql: argv.sql as string | undefined,
      from: argv.from as string | undefined,
      select: argv.select as string | undefined,
      where: argv.where as string | undefined,
      limit: argv.limit as number | undefined,
      db: argv.db as string | undefined,
      format: argv.format as
        | 'csv' | 'json' | 'box' | 'markdown' | 'line' | 'tsv'
        | undefined,
      readOnly: argv['read-only'] as boolean,
    })
    process.stdout.write(out)
  },
}
