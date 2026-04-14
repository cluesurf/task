import type { CommandModule } from 'yargs'
import { verifyImageConsole } from './image/console'

export const verifyConsole: CommandModule = {
  command: 'verify <thing>',
  describe: 'Verify the integrity or content of an asset',
  builder: y =>
    y.command(verifyImageConsole).demandCommand(1, 'Specify what to verify'),
  handler: () => {},
}
