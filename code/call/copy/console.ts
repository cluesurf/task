import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { copyEnvironmentConsole } from './environment/console'
import { copySshKeyConsole } from './ssh-key/console'

registerGroupHelp({
  command: 'task copy',
  describe: 'Copy a value to the system clipboard',
  commands: [
    { name: 'environment', describe: 'Copy an environment variable\'s value to the clipboard' },
    { name: 'ssh-key', describe: 'Copy the public key for a named SSH key to the clipboard' },
  ],
})

export const copyConsole: CommandModule = {
  command: 'copy <thing>',
  describe: 'Copy a value to the system clipboard',
  builder: y =>
    y
      .command(copyEnvironmentConsole)
      .command(copySshKeyConsole)
      .demandCommand(1, 'Specify what to copy'),
  handler: () => {},
}
