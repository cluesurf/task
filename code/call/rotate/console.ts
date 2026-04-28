import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { rotateImageConsole } from './image/console'
import { rotateSecretConsole } from './secret/console'
import { rotateTlsConsole } from './tls/console'
import { rotateVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task rotate',
  describe: 'Rotate media, secrets, or trust roots',
  commands: [
    { name: 'image',  describe: 'Rotate an image by N degrees' },
    { name: 'secret', describe: 'Generate a fresh value for a secret key' },
    { name: 'tls',    describe: 'Rotate the local CA + reissue host certs' },
    { name: 'video',  describe: 'Rotate a video by N degrees (90 / 180 / 270)' },
  ],
})

export const rotateConsole: CommandModule = {
  command: 'rotate <thing>',
  describe: 'Rotate media, secrets, or trust roots',
  builder: y =>
    y
      .command(rotateImageConsole)
      .command(rotateSecretConsole)
      .command(rotateTlsConsole)
      .command(rotateVideoConsole)
      .demandCommand(1, 'Specify what to rotate'),
  handler: () => {},
}
