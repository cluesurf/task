import type { CommandModule } from 'yargs'

export const loadKubeconfigConsole: CommandModule = {
  command: 'kubeconfig <cluster>',
  describe:
    'Merge kubeconfig for a DOKS cluster into ~/.kube/config so kubectl + task logs/forward/scale/diff target it',
  builder: y => y.positional('cluster', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { loadKubeconfigNode } = await import('./node')
    process.stdout.write(await loadKubeconfigNode({ cluster: argv.cluster as string }))
  },
}
