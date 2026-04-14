import type { CommandModule } from 'yargs'
import { removeMetadataConsole } from './metadata/console'

export const removeConsole: CommandModule = {
  command: 'remove <thing>',
  describe: 'Remove content from a file',
  builder: y =>
    y.command(removeMetadataConsole).demandCommand(1, 'Specify what to remove'),
  handler: () => {},
}
