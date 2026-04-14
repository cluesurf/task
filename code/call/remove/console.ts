import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { removeAudioConsole } from './audio/console'
import { removeMetadataConsole } from './metadata/console'

registerGroupHelp({
  command: 'task remove',
  describe: 'Remove content from a file',
  commands: [
    { name: 'audio', describe: 'Strip the audio track from a video' },
    { name: 'metadata', describe: 'Strip EXIF / XMP / ID3 metadata from a file' },
  ],
})

export const removeConsole: CommandModule = {
  command: 'remove <thing>',
  describe: 'Remove content from a file',
  builder: y =>
    y
      .command(removeAudioConsole)
      .command(removeMetadataConsole)
      .demandCommand(1, 'Specify what to remove'),
  handler: () => {},
}
