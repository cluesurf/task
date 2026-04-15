import type { CommandModule } from 'yargs'

export const logPodConsole: CommandModule = {
  command: 'pod <selector>',
  describe: 'Tail logs across Kubernetes pods (stern or kubectl)',
  builder: y =>
    y
      .positional('selector', { type: 'string', demandOption: true })
      .option('namespace', { alias: 'n', type: 'string' })
      .option('context', { type: 'string' })
      .option('follow', { type: 'boolean', default: true })
      .option('tail', { type: 'number', default: 100 }),
  handler: async argv => {
    const { logPodNode } = await import('./node')
    await logPodNode({
      selector: argv.selector as string,
      namespace: argv.namespace as string | undefined,
      context: argv.context as string | undefined,
      follow: argv.follow as boolean,
      tail: argv.tail as number,
    })
  },
}
