import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list network route',
  describe: 'Show the routing table (destination, gateway, interface)',
  options: [],
  examples: [
    { comment: 'current routes', command: 'task list network route' },
  ],
})

export const listNetworkRouteConsole: CommandModule = {
  command: 'route',
  describe: 'Show the routing table',
  builder: y => y,
  handler: async () => {
    const { listNetworkRouteNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'list',
      input: {},
      run: () => listNetworkRouteNode(),
    })
  },
}
