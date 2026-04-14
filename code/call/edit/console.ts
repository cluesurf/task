import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { editSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task edit',
  describe: 'Open the raw source of a config in $EDITOR',
  commands: [
    { name: 'ssh', describe: 'Open ~/.ssh/config in $EDITOR' },
  ],
})

export const editConsole: CommandModule = {
  command: 'edit <thing>',
  describe: 'Open the raw source of a config in $EDITOR',
  builder: y =>
    y
      .command(editSshConsole)
      .demandCommand(1, 'Specify what to edit'),
  handler: () => {},
}
