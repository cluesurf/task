import type { CommandModule } from 'yargs'

export const forwardPortConsole: CommandModule = {
  command: 'port <target>',
  describe:
    'Forward a Kubernetes pod port with auto-restart. target: `selector:port` or `selector:local:remote`',
  builder: y =>
    y
      .positional('target', { type: 'string', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { forwardPortNode } = await import('./node')
    await forwardPortNode({
      target: argv.target as string,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
    })
  },
}
