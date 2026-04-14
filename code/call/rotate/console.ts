import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { rotateImageConsole } from './image/console'
import { rotateVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task rotate',
  describe: 'Rotate an image or video by a given angle',
  commands: [
    { name: 'image', describe: 'Rotate an image by N degrees' },
    { name: 'video', describe: 'Rotate a video by N degrees (90 / 180 / 270)' },
  ],
})

export const rotateConsole: CommandModule = {
  command: 'rotate <thing>',
  describe: 'Rotate an image or video by a given angle',
  builder: y =>
    y
      .command(rotateImageConsole)
      .command(rotateVideoConsole)
      .demandCommand(1, 'Specify what to rotate'),
  handler: () => {},
}
