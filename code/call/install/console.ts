import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { installCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task install',
  describe: 'Install project dependencies (zero-config)',
  commands: [
    { name: 'code', describe: 'Project mode — infer ecosystem and run its install' },
  ],
})

export const installConsole: CommandModule = {
  command: 'install <thing>',
  describe: 'Install project dependencies',
  builder: y => y.command(installCodeConsole).demandCommand(1, 'Specify what to install'),
  handler: () => {},
}
