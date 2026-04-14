import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { trimAudioConsole } from './audio/console'
import { trimImageConsole } from './image/console'
import { trimVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task trim',
  describe: 'Cut a section out of a media file (audio, video, image)',
  commands: [
    { name: 'audio', describe: 'Cut a range out of an audio file' },
    { name: 'image', describe: 'Crop a rectangular region out of an image' },
    { name: 'video', describe: 'Cut a range out of a video file' },
  ],
})

export const trimConsole: CommandModule = {
  command: 'trim <thing>',
  describe: 'Cut a section out of a media file (audio, video, image)',
  builder: y =>
    y
      .command(trimAudioConsole)
      .command(trimImageConsole)
      .command(trimVideoConsole)
      .demandCommand(1, 'Specify what to trim'),
  handler: () => {},
}
