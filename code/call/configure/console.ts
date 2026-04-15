import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { configureMachineConsole } from './machine/console'

registerGroupHelp({
  command: 'task configure',
  describe: 'Bootstrap and configure dev environments',
  commands: [
    { name: 'machine', describe: 'Bootstrap a fresh dev machine (packages / shell / theme / vscode / git)' },
  ],
})

export const configureConsole: CommandModule = {
  command: 'configure <thing>',
  describe: 'Bootstrap and configure dev environments',
  builder: y =>
    y
      .command(configureMachineConsole)
      .demandCommand(1, 'Specify what to configure'),
  handler: () => {},
}
