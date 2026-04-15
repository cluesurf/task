import type { CommandModule } from 'yargs'

export const k8sPortForwardConsole: CommandModule = {
  command: 'port-forward <target>',
  describe:
    'Forward a pod port with auto-restart on drop. target: `selector:port` or `selector:local:remote`',
  builder: y =>
    y
      .positional('target', { type: 'string', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { k8sPortForwardNode } = await import('./node')
    await k8sPortForwardNode({
      target: argv.target as string,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
    })
  },
}
