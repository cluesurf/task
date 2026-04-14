import type { CommandModule } from 'yargs'
import { resizeImageConsole } from './image/console'

export const resizeConsole: CommandModule = {
  command: 'resize <thing>',
  describe: 'Resize an image or other asset',
  builder: y =>
    y.command(resizeImageConsole).demandCommand(1, 'Specify what to resize'),
  handler: () => {},
}
