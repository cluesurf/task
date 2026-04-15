import type { CommandModule } from 'yargs'

export const inspectDbConsole: CommandModule = {
  command: 'db <name>',
  describe: 'Inspect a Postgres database (tables, size, extensions, ...)',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .option('show', {
        choices: ['tables', 'schemas', 'size', 'extensions', 'roles'] as const,
        default: 'tables',
      }),
  handler: async argv => {
    const { inspectDbNode } = await import('./node')
    const out = await inspectDbNode({
      db: argv.name as string,
      show: argv.show as 'tables' | 'schemas' | 'size' | 'extensions' | 'roles',
    })
    process.stdout.write(out)
  },
}
