import type { CommandModule } from 'yargs'

export const scaleDeploymentConsole: CommandModule = {
  command: 'deployment <name> <replicas>',
  describe: 'Scale a Kubernetes Deployment to N replicas',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .positional('replicas', { type: 'number', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { scaleDeploymentNode } = await import('./node')
    await scaleDeploymentNode({
      name: argv.name as string,
      replicas: argv.replicas as number,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
    })
  },
}
