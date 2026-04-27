import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { traceProcessConsole } from './process/console'
import { traceRouteConsole } from './route/console'

registerGroupHelp({
  command: 'task trace',
  describe: 'Trace network paths or process syscalls',
  commands: [
    { name: 'process', describe: 'Trace syscalls / files / network for a process' },
    { name: 'route', describe: 'Traceroute to a host' },
  ],
})

export const traceConsole: CommandModule = {
  command: 'trace <thing>',
  describe: 'Trace a process or a network route',
  builder: y =>
    y
      .command(traceProcessConsole)
      .command(traceRouteConsole)
      .demandCommand(1, 'Specify what to trace'),
  handler: () => {},
}
