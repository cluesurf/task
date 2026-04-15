import type { CommandModule } from 'yargs'

export const measureDbConsole: CommandModule = {
  command: 'db <name> <sql>',
  describe: 'EXPLAIN ANALYZE + time a SQL query on Postgres',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .positional('sql', { type: 'string', demandOption: true })
      .option('plain', {
        type: 'boolean',
        default: false,
        describe: 'Time without EXPLAIN',
      }),
  handler: async argv => {
    const { measureDbNode } = await import('./node')
    const out = await measureDbNode({
      db: argv.name as string,
      sql: argv.sql as string,
      plain: argv.plain as boolean,
    })
    process.stdout.write(out)
  },
}
