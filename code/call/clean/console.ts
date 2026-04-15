import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { cleanCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task clean',
  describe: 'Remove build outputs / caches (zero-config)',
  commands: [
    { name: 'code', describe: 'Project mode — infer ecosystem and run its clean' },
  ],
})

export const cleanConsole: CommandModule = {
  command: 'clean <thing>',
  describe: 'Remove build outputs / caches',
  builder: y => y.command(cleanCodeConsole).demandCommand(1, 'Specify what to clean'),
  handler: () => {},
}
