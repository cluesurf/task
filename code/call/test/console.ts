import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { testSshConsole } from './ssh/console'
import { testCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task test',
  describe: 'Run tests or check reachability',
  commands: [
    { name: 'code', describe: 'Project mode — infer ecosystem and run its test suite' },
    { name: 'ssh',  describe: 'Check that an SSH Host entry is reachable' },
  ],
})

export const testConsole: CommandModule = {
  command: 'test <thing>',
  describe: 'Run tests or check reachability',
  builder: y =>
    y
      .command(testCodeConsole)
      .command(testSshConsole)
      .demandCommand(1, 'Specify what to test'),
  handler: () => {},
}
