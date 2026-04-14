import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { rmSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task rm',
  describe: 'Remove a named entry from long-lived state',
  commands: [
    { name: 'ssh', describe: 'Remove a Host entry from ~/.ssh/config' },
  ],
})

export const rmConsole: CommandModule = {
  command: 'rm <thing>',
  describe: 'Remove a named entry from long-lived state',
  builder: y =>
    y
      .command(rmSshConsole)
      .demandCommand(1, 'Specify what to remove'),
  handler: () => {},
}
