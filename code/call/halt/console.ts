import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { haltPortConsole } from './port/console'
import { haltProcessConsole } from './process/console'

registerGroupHelp({
  command: 'task halt',
  describe: 'Terminate processes or free a port',
  commands: [
    { name: 'port', describe: 'Kill whatever is listening on a port' },
    { name: 'process', describe: 'Kill a process by PID or fuzzy text match' },
  ],
})

export const haltConsole: CommandModule = {
  command: 'halt <thing>',
  describe: 'Terminate processes or free a port',
  builder: y =>
    y
      .command(haltPortConsole)
      .command(haltProcessConsole)
      .demandCommand(1, 'Specify what to halt'),
  handler: () => {},
}
