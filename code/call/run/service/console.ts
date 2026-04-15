import type { CommandModule } from 'yargs'

export const runServiceConsole: CommandModule = {
  command: 'service <name>',
  describe: 'Start a system service',
  builder: y => y.positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { runServiceNode } = await import('./node')
    await runServiceNode({ name: argv.name as string })
  },
}
