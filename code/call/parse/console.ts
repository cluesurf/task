import type { CommandModule } from 'yargs'
import { parseCodeConsole } from './code/console'

export const parseConsole: CommandModule = {
  command: 'parse <thing>',
  describe: 'Parse source or data into a structured form',
  builder: y =>
    y.command(parseCodeConsole).demandCommand(1, 'Specify what to parse'),
  handler: () => {},
}
