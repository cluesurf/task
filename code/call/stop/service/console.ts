import type { CommandModule } from 'yargs'

export const stopServiceConsole: CommandModule = {
  command: 'service <name>',
  describe: 'Stop a system service',
  builder: y => y.positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { stopServiceNode } = await import('./node')
    await stopServiceNode({ name: argv.name as string })
  },
}
