import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { traceRouteConsole } from './route/console'

registerGroupHelp({
  command: 'task trace',
  describe: 'Trace the path a packet takes to a host',
  commands: [
    { name: 'route', describe: 'Traceroute to a host' },
  ],
})

export const traceConsole: CommandModule = {
  command: 'trace <thing>',
  describe: 'Trace the path a packet takes to a host',
  builder: y =>
    y
      .command(traceRouteConsole)
      .demandCommand(1, 'Specify what to trace'),
  handler: () => {},
}
