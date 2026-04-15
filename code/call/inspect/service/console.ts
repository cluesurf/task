import type { CommandModule } from 'yargs'

export const inspectServiceConsole: CommandModule = {
  command: 'service [name]',
  describe: 'List or inspect system services (systemctl / launchctl)',
  builder: y =>
    y
      .positional('name', { type: 'string' })
      .option('failed', { type: 'boolean', describe: 'List failed services (Linux)' })
      .option('logs', { type: 'boolean', describe: 'Tail logs for <name>' }),
  handler: async argv => {
    const { inspectServiceNode } = await import('./node')
    const out = await inspectServiceNode({
      name: argv.name as string | undefined,
      failed: argv.failed as boolean | undefined,
      logs: argv.logs as boolean | undefined,
    })
    process.stdout.write(out)
  },
}
