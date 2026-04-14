import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { compressAudioConsole } from './audio/console'
import { compressFontConsole } from './font/console'
import { compressImageConsole } from './image/console'
import { compressVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task compress',
  describe: 'Compress a file for web delivery or smaller size',
  commands: [
    { name: 'audio', describe: 'Re-encode an audio file at a lower bitrate' },
    { name: 'font', describe: 'Compress a TTF/OTF font to WOFF2' },
    { name: 'image', describe: 'Compress an image at a given quality' },
    { name: 'video', describe: 'Re-encode a video with H.264 at a given CRF' },
  ],
})

export const compressConsole: CommandModule = {
  command: 'compress <thing>',
  describe: 'Compress a file for web delivery or smaller size',
  builder: y =>
    y
      .command(compressAudioConsole)
      .command(compressFontConsole)
      .command(compressImageConsole)
      .command(compressVideoConsole)
      .demandCommand(1, 'Specify what to compress'),
  handler: () => {},
}
