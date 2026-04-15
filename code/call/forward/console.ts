import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { forwardPortConsole } from './port/console'

registerGroupHelp({
  command: 'task forward',
  describe: 'Forward a port or stream to a remote endpoint',
  commands: [{ name: 'port', describe: 'Forward a Kubernetes pod port' }],
})

export const forwardConsole: CommandModule = {
  command: 'forward <thing>',
  describe: 'Forward a port or stream to a remote endpoint',
  builder: y =>
    y.command(forwardPortConsole).demandCommand(1, 'Specify what to forward'),
  handler: () => {},
}
