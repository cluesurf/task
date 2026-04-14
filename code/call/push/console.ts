import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { pushSshKeyConsole } from './ssh-key/console'

registerGroupHelp({
  command: 'task push',
  describe: 'Push an artifact to a remote (SSH key → host, ...)',
  commands: [
    { name: 'ssh-key', describe: 'Install a named SSH public key on a host (ssh-copy-id)' },
  ],
})

export const pushConsole: CommandModule = {
  command: 'push <thing>',
  describe: 'Push an artifact to a remote (SSH key → host, ...)',
  builder: y =>
    y
      .command(pushSshKeyConsole)
      .demandCommand(1, 'Specify what to push'),
  handler: () => {},
}
