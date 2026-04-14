import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { scanSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task scan',
  describe: 'Probe a remote for fingerprints and keys',
  commands: [
    { name: 'ssh', describe: 'Scan a host\'s SSH public host keys (ssh-keyscan)' },
  ],
})

export const scanConsole: CommandModule = {
  command: 'scan <thing>',
  describe: 'Probe a remote for fingerprints and keys',
  builder: y =>
    y
      .command(scanSshConsole)
      .demandCommand(1, 'Specify what to scan'),
  handler: () => {},
}
