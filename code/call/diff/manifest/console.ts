import type { CommandModule } from 'yargs'

export const diffManifestConsole: CommandModule = {
  command: 'manifest <path>',
  describe:
    'Diff a Kubernetes manifest against live cluster state (exit 1 on differences)',
  builder: y =>
    y
      .positional('path', { type: 'string', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { diffManifestNode } = await import('./node')
    const code = await diffManifestNode({
      path: argv.path as string,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
    })
    process.exit(code)
  },
}
