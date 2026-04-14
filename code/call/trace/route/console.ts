import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task trace route',
  describe: 'Traceroute to a host (path + per-hop latency)',
  options: [
    { long: 'max-hops', short: 'm', describe: 'Maximum hop count (default 30)' },
  ],
  examples: [
    { comment: 'path to example.com', command: 'task trace route example.com' },
  ],
})

export const traceRouteConsole: CommandModule = {
  command: 'route <host>',
  describe: 'Traceroute to a host',
  builder: y =>
    y
      .positional('host', { type: 'string' })
      .option('max-hops', { alias: 'm', type: 'number', default: 30 }),
  handler: async argv => {
    const { traceRouteNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      host: argv.host as string,
      maxHops: argv['max-hops'] as number,
    }
    await runAction({
      action: 'trace',
      input: input as unknown as Record<string, unknown>,
      run: () => traceRouteNode(input),
    })
  },
}
