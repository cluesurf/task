import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { copySshKeyConsole } from './ssh-key/console'

registerGroupHelp({
  command: 'task copy',
  describe: 'Copy an artifact to the system clipboard',
  commands: [
    { name: 'ssh-key', describe: 'Copy the public key for a named SSH key to the clipboard' },
  ],
})

export const copyConsole: CommandModule = {
  command: 'copy <thing>',
  describe: 'Copy an artifact to the system clipboard',
  builder: y =>
    y
      .command(copySshKeyConsole)
      .demandCommand(1, 'Specify what to copy'),
  handler: () => {},
}
