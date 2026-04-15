import type { CommandModule } from 'yargs'

export const queryDbConsole: CommandModule = {
  command: 'db <name> <sql>',
  describe: 'Run a SQL query against a Postgres database',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .positional('sql', { type: 'string', demandOption: true })
      .option('format', {
        choices: ['tsv', 'csv', 'json', 'table'] as const,
        default: 'tsv',
      }),
  handler: async argv => {
    const { queryDbNode } = await import('./node')
    const out = await queryDbNode({
      db: argv.name as string,
      sql: argv.sql as string,
      format: argv.format as 'tsv' | 'csv' | 'json' | 'table',
    })
    process.stdout.write(out)
  },
}
