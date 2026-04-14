import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { listNetworkConnectionConsole } from './connection/console'
import { listNetworkInterfaceConsole } from './interface/console'
import { listNetworkRouteConsole } from './route/console'

registerGroupHelp({
  command: 'task list network',
  describe: 'List network resources (interfaces, connections, routes)',
  commands: [
    { name: 'connection', describe: 'List open network connections (alias for `list port`)' },
    { name: 'interface', describe: 'List network interfaces with IPv4 / IPv6 addresses' },
    { name: 'route', describe: 'Show the routing table' },
  ],
})

export const listNetworkConsole: CommandModule = {
  command: 'network <thing>',
  describe: 'List network resources',
  builder: y =>
    y
      .command(listNetworkConnectionConsole)
      .command(listNetworkInterfaceConsole)
      .command(listNetworkRouteConsole)
      .demandCommand(1, 'Specify what to list'),
  handler: () => {},
}
