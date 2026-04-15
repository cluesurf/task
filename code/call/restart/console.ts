import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { restartServiceConsole } from './service/console'

registerGroupHelp({
  command: 'task restart',
  describe: 'Restart a service or app',
  commands: [{ name: 'service', describe: 'Restart a system service' }],
})

export const restartConsole: CommandModule = {
  command: 'restart <thing>',
  describe: 'Restart a service or app',
  builder: y => y.command(restartServiceConsole).demandCommand(1, 'Specify what to restart'),
  handler: () => {},
}
