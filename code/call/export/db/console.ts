import type { CommandModule } from 'yargs'

export const exportDbConsole: CommandModule = {
  command: 'db <name> <source>',
  describe: 'Export a Postgres table or query to CSV / TSV / JSON',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .positional('source', {
        type: 'string',
        demandOption: true,
        describe: 'Table name (`schema.table`) or SQL statement',
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        demandOption: true,
      })
      .option('format', {
        choices: ['csv', 'tsv', 'json'] as const,
        default: 'csv',
      })
      .option('header', { type: 'boolean', default: true }),
  handler: async argv => {
    const { exportDbNode } = await import('./node')
    await exportDbNode({
      db: argv.name as string,
      source: argv.source as string,
      output: { path: argv.output as string },
      format: argv.format as 'csv' | 'tsv' | 'json',
      header: argv.header as boolean,
    })
  },
}
