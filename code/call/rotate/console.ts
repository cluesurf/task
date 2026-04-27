import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { rotateImageConsole } from './image/console'
import { rotateSecretConsole } from './secret/console'
import { rotateVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task rotate',
  describe: 'Rotate media or generate fresh secret values',
  commands: [
    { name: 'image',  describe: 'Rotate an image by N degrees' },
    { name: 'secret', describe: 'Generate a fresh value for a secret key' },
    { name: 'video',  describe: 'Rotate a video by N degrees (90 / 180 / 270)' },
  ],
})

export const rotateConsole: CommandModule = {
  command: 'rotate <thing>',
  describe: 'Rotate media or generate fresh secret values',
  builder: y =>
    y
      .command(rotateImageConsole)
      .command(rotateSecretConsole)
      .command(rotateVideoConsole)
      .demandCommand(1, 'Specify what to rotate'),
  handler: () => {},
}
