import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { showIpConsole } from './ip/console'

registerGroupHelp({
  command: 'task show',
  describe: 'Print a quick fact about the local machine (IP, ...)',
  commands: [
    { name: 'ip', describe: 'Print the machine\'s primary IPv4 address (and all addresses)' },
  ],
})

export const showConsole: CommandModule = {
  command: 'show <thing>',
  describe: 'Print a quick fact about the local machine (IP, ...)',
  builder: y =>
    y
      .command(showIpConsole)
      .demandCommand(1, 'Specify what to show'),
  handler: () => {},
}
