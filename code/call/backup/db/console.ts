import type { CommandModule } from 'yargs'

export const backupDbConsole: CommandModule = {
  command: 'db <name> [output]',
  describe: 'Dump a Postgres database with pg_dump',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .positional('output', {
        type: 'string',
        describe: 'Output file. Defaults to <name>.dump',
      })
      .option('format', {
        choices: ['custom', 'plain', 'tar', 'directory'] as const,
        default: 'custom',
      })
      .option('compress', { type: 'number' })
      .option('schema-only', { type: 'boolean', default: false })
      .option('data-only', { type: 'boolean', default: false }),
  handler: async argv => {
    const { backupDbNode } = await import('./node')
    const name = argv.name as string
    const out = (argv.output as string | undefined) ?? `${name}.dump`
    await backupDbNode({
      db: name,
      output: { path: out },
      format: argv.format as 'custom' | 'plain' | 'tar' | 'directory',
      compress: argv.compress as number | undefined,
      schemaOnly: argv['schema-only'] as boolean,
      dataOnly: argv['data-only'] as boolean,
    })
    console.log(`backed up ${name} → ${out}`)
  },
}
