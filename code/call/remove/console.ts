import type { Argv, CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { removeAudioConsole } from './audio/console'
import { removeMetadataConsole } from './metadata/console'
import { removeInvisibleConsole } from './invisible/console'
import { removeSubtitlesConsole } from './subtitles/console'
import { removePasswordConsole } from './password/console'
import { removeProfileConsole } from './profile/console'
import { removeTransparencyConsole } from './transparency/console'
import { removeExifConsole } from './exif/console'
import { removeSshHostConsole } from './ssh-host/console'
import { removeSshKeyConsole } from './ssh-key/console'

registerGroupHelp({
  command: 'task remove',
  describe: 'Remove content from a file',
  commands: [
    { name: 'audio', describe: 'Strip the audio track from a video' },
    {
      name: 'subtitles',
      describe: 'Drop subtitle streams from a video',
    },
    {
      name: 'metadata',
      describe: 'Strip all EXIF / XMP / ID3 metadata',
    },
    { name: 'exif', describe: 'Strip specific EXIF tags (surgical)' },
    { name: 'password', describe: 'Strip a password from a PDF' },
    {
      name: 'profile',
      describe: 'Strip embedded ICC / IPTC / XMP profiles',
    },
    {
      name: 'transparency',
      describe: 'Flatten alpha onto a solid background',
    },
    {
      name: 'invisible',
      describe: 'Strip zero-width / BOM / invisible chars',
    },
    { name: 'ssh-host', describe: 'Remove a Host entry from ~/.ssh/config' },
    { name: 'ssh-key', describe: 'Remove an SSH key entry' },
  ],
})

export const removeConsole: CommandModule = {
  command: 'remove <thing>',
  describe: 'Remove content from a file',
  builder: y =>
    y
      .command(removeAudioConsole)
      .command(removeSubtitlesConsole)
      .command(removeMetadataConsole)
      .command(removeExifConsole)
      .command(removePasswordConsole)
      .command(removeProfileConsole)
      .command(removeTransparencyConsole)
      .command(removeInvisibleConsole)
      .command(removeSshHostConsole)
      .command(removeSshKeyConsole)
      .demandCommand(1, 'Specify what to remove'),
  handler: () => {},
}
