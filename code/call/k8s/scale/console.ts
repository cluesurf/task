import type { CommandModule } from 'yargs'

export const k8sScaleConsole: CommandModule = {
  command: 'scale <deployment> <replicas>',
  describe: 'Scale a Deployment to N replicas',
  builder: y =>
    y
      .positional('deployment', { type: 'string', demandOption: true })
      .positional('replicas', { type: 'number', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { k8sScaleNode } = await import('./node')
    await k8sScaleNode({
      deployment: argv.deployment as string,
      replicas: argv.replicas as number,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
    })
  },
}
