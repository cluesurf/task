import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { watchProcessConsole } from './process/console'

registerGroupHelp({
  command: 'task watch',
  describe: 'Live-update a listing as the underlying state changes',
  commands: [
    { name: 'process', describe: 'Live-refreshing process table' },
  ],
})

export const watchConsole: CommandModule = {
  command: 'watch <thing>',
  describe: 'Live-update a listing as the underlying state changes',
  builder: y =>
    y
      .command(watchProcessConsole)
      .demandCommand(1, 'Specify what to watch'),
  handler: () => {},
}
