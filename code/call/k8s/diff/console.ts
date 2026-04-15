import type { CommandModule } from 'yargs'

export const k8sDiffConsole: CommandModule = {
  command: 'diff <manifest>',
  describe:
    'Diff a manifest against live cluster state (exits 1 on differences)',
  builder: y =>
    y
      .positional('manifest', { type: 'string', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' }),
  handler: async argv => {
    const { k8sDiffNode } = await import('./node')
    const code = await k8sDiffNode({
      manifest: argv.manifest as string,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
    })
    process.exit(code)
  },
}
