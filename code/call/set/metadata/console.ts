import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/set/metadata/console/options'

export const setMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Embed ID3 / container metadata into an audio file',
  options,
  path: ['set', 'metadata'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'set basic id3 fields on an mp3',
      command:
        'task set metadata -i song.mp3 -o song.mp3 --title "Echoes" --artist "Mountain" --album "Ranges"',
    },
    {
      comment: 'embed cover art and lyrics',
      command:
        'task set metadata -i song.mp3 -o song.mp3 --cover-file-path cover.jpg --lyrics-file-path lyrics.txt',
    },
  ],
})
