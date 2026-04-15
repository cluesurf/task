import type { CommandModule } from 'yargs'

export const listPodConsole: CommandModule = {
  command: 'pod',
  describe: 'List Kubernetes pods',
  builder: y =>
    y
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { listPodNode } = await import('./node')
    process.stdout.write(
      await listPodNode({
        namespace: argv.namespace as string | undefined,
        context: argv.context as string | undefined,
      }),
    )
  },
}
