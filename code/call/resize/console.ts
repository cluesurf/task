import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { resizeImageConsole } from './image/console'
import { resizeVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task resize',
  describe: 'Resize an image or video',
  commands: [
    { name: 'image', describe: 'Resize an image to new dimensions' },
    { name: 'video', describe: 'Resize a video with ffmpeg' },
  ],
})

export const resizeConsole: CommandModule = {
  command: 'resize <thing>',
  describe: 'Resize an image or video',
  builder: y =>
    y
      .command(resizeImageConsole)
      .command(resizeVideoConsole)
      .demandCommand(1, 'Specify what to resize'),
  handler: () => {},
}
