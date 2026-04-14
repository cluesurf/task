import type { CommandModule } from 'yargs'
import { checkFileConsole } from './file/console'

export const checkConsole: CommandModule = {
  command: 'check <thing>',
  describe: 'Check files and other artifacts',
  builder: y =>
    y.command(checkFileConsole).demandCommand(1, 'Specify what to check'),
  handler: () => {
    /* routed by subcommand */
  },
}
