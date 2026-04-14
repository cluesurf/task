import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { testSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task test',
  describe: 'Test reachability or connectivity',
  commands: [
    { name: 'ssh', describe: 'Check that an SSH Host entry is reachable' },
  ],
})

export const testConsole: CommandModule = {
  command: 'test <thing>',
  describe: 'Test reachability or connectivity',
  builder: y =>
    y
      .command(testSshConsole)
      .demandCommand(1, 'Specify what to test'),
  handler: () => {},
}
