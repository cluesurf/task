import type { CommandModule } from 'yargs'

export const inspectPodConsole: CommandModule = {
  command: 'pod <name>',
  describe: 'Describe a Kubernetes pod (kubectl describe)',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { inspectPodNode } = await import('./node')
    process.stdout.write(
      await inspectPodNode({
        name: argv.name as string,
        namespace: argv.namespace as string | undefined,
        context: argv.context as string | undefined,
      }),
    )
  },
}
