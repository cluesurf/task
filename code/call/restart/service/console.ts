import type { CommandModule } from 'yargs'

export const restartServiceConsole: CommandModule = {
  command: 'service <name>',
  describe: 'Restart a system service',
  builder: y => y.positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { restartServiceNode } = await import('./node')
    await restartServiceNode({ name: argv.name as string })
  },
}
