import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { testSshConsole } from './ssh/console'
import { testCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task test',
  describe: 'Run a project test suite, or test reachability / connectivity',
  commands: [
    { name: 'code', describe: 'Project mode — infer ecosystem and run its test suite' },
    { name: 'ssh',  describe: 'Check that an SSH Host entry is reachable' },
  ],
})

export const testConsole: CommandModule = {
  command: 'test <thing>',
  describe: 'Run a project test suite, or test reachability / connectivity',
  builder: y =>
    y
      .command(testCodeConsole)
      .command(testSshConsole)
      .demandCommand(1, 'Specify what to test'),
  handler: () => {},
}
