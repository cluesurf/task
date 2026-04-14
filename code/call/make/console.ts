import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { makeSshKeyConsole } from './ssh-key/console'

registerGroupHelp({
  command: 'task make',
  describe: 'Create a new artifact (SSH key, ...)',
  commands: [
    { name: 'ssh-key', describe: 'Generate a new SSH key pair in ~/.ssh' },
  ],
})

export const makeConsole: CommandModule = {
  command: 'make <thing>',
  describe: 'Create a new artifact (SSH key, ...)',
  builder: y =>
    y
      .command(makeSshKeyConsole)
      .demandCommand(1, 'Specify what to make'),
  handler: () => {},
}
