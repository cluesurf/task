import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { listPortConsole } from './port/console'
import { listProcessConsole } from './process/console'
import { listSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task list',
  describe: 'List running resources or stored entries',
  commands: [
    { name: 'port', describe: 'List open TCP / UDP ports' },
    { name: 'process', describe: 'List running processes with filter / sort / group / tree' },
    { name: 'ssh', describe: 'List every Host entry in ~/.ssh/config' },
  ],
})

export const listConsole: CommandModule = {
  command: 'list <thing>',
  describe: 'List running resources or stored entries',
  builder: y =>
    y
      .command(listPortConsole)
      .command(listProcessConsole)
      .command(listSshConsole)
      .demandCommand(1, 'Specify what to list'),
  handler: () => {},
}
