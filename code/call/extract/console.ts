import type { CommandModule } from 'yargs'
import { extractArchiveConsole } from './archive/console'

export const extractConsole: CommandModule = {
  command: 'extract <thing>',
  describe: 'Extract content from containers',
  builder: y =>
    y
      .command(extractArchiveConsole)
      .demandCommand(1, 'Specify what to extract from'),
  handler: () => {},
}
