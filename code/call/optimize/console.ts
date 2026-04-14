import type { CommandModule } from 'yargs'
import { optimizeImageConsole } from './image/console'

export const optimizeConsole: CommandModule = {
  command: 'optimize <thing>',
  describe: 'Optimize an asset',
  builder: y =>
    y
      .command(optimizeImageConsole)
      .demandCommand(1, 'Specify what to optimize'),
  handler: () => {},
}
