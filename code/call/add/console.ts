import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { addSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task add',
  describe: 'Create a new entry in long-lived state (SSH config, ...)',
  commands: [
    { name: 'ssh', describe: 'Add a new Host entry to ~/.ssh/config' },
  ],
})

export const addConsole: CommandModule = {
  command: 'add <thing>',
  describe: 'Create a new entry in long-lived state (SSH config, ...)',
  builder: y =>
    y
      .command(addSshConsole)
      .demandCommand(1, 'Specify what to add'),
  handler: () => {},
}
