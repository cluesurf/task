import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { flipImageConsole } from './image/console'

registerGroupHelp({
  command: 'task flip',
  describe: 'Flip a media file horizontally or vertically',
  commands: [
    { name: 'image', describe: 'Flip an image horizontally or vertically' },
  ],
})

export const flipConsole: CommandModule = {
  command: 'flip <thing>',
  describe: 'Flip a media file horizontally or vertically',
  builder: y =>
    y
      .command(flipImageConsole)
      .demandCommand(1, 'Specify what to flip'),
  handler: () => {},
}
