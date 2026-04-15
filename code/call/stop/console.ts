import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { stopServiceConsole } from './service/console'

registerGroupHelp({
  command: 'task stop',
  describe: 'Stop a running thing (service, process, ...)',
  commands: [{ name: 'service', describe: 'Stop a system service' }],
})

export const stopConsole: CommandModule = {
  command: 'stop <thing>',
  describe: 'Stop a running thing',
  builder: y => y.command(stopServiceConsole).demandCommand(1, 'Specify what to stop'),
  handler: () => {},
}
