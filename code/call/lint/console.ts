import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { lintCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task lint',
  describe: 'Lint the project',
  commands: [
    { name: 'code', describe: 'Project mode — infer ecosystem and run its linter' },
  ],
})

export const lintConsole: CommandModule = {
  command: 'lint <thing>',
  describe: 'Lint the project',
  builder: y => y.command(lintCodeConsole).demandCommand(1, 'Specify what to lint'),
  handler: () => {},
}
