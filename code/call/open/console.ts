import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { openSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task open',
  describe: 'Open an interactive session (SSH, ...)',
  commands: [
    { name: 'ssh', describe: 'Connect to a named SSH Host interactively' },
  ],
})

export const openConsole: CommandModule = {
  command: 'open <thing>',
  describe: 'Open an interactive session (SSH, ...)',
  builder: y =>
    y
      .command(openSshConsole)
      .demandCommand(1, 'Specify what to open'),
  handler: () => {},
}
