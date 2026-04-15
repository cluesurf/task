import type { CommandModule } from 'yargs'

export const inspectTableConsole: CommandModule = {
  command: 'table <name>',
  describe: 'Inspect a Postgres table (columns, row count, indexes)',
  builder: y =>
    y
      .positional('name', {
        type: 'string',
        demandOption: true,
        describe: '`table` or `schema.table`',
      })
      .option('db', { type: 'string', describe: 'Database name' }),
  handler: async argv => {
    const { inspectTableNode } = await import('./node')
    const out = await inspectTableNode({
      table: argv.name as string,
      db: argv.db as string | undefined,
    })
    process.stdout.write(out)
  },
}
