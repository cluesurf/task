import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect network',
  describe:
    'Summarize network state: interfaces, active connection count, default route',
  options: [
    {
      long: 'show',
      short: 's',
      describe:
        'Comma list: `interface`, `route`, `connection`, or `dns:A,MX,...` ' +
        'when combined with a hostname',
    },
  ],
  examples: [
    { comment: 'overall network summary', command: 'task inspect network' },
    { comment: 'dns lookup', command: 'task inspect example.com --show dns:A,MX,TXT' },
  ],
})

export const inspectNetworkConsole: CommandModule = {
  command: 'network [host]',
  describe: 'Summarize network state or look up DNS for a host',
  builder: y =>
    y
      .positional('host', { type: 'string' })
      .option('show', { alias: 's', type: 'string' }),
  handler: async argv => {
    const { inspectNetworkNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      host: argv.host as string | undefined,
      show: argv.show as string | undefined,
    }
    await runAction({
      action: 'inspect',
      input: input as unknown as Record<string, unknown>,
      run: () => inspectNetworkNode(input),
    })
  },
}
