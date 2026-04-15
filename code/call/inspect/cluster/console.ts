import type { CommandModule } from 'yargs'

export const inspectClusterConsole: CommandModule = {
  command: 'cluster <name>',
  describe: 'Inspect a DigitalOcean Kubernetes cluster',
  builder: y => y.positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { inspectClusterNode } = await import('./node')
    process.stdout.write(await inspectClusterNode({ name: argv.name as string }))
  },
}
