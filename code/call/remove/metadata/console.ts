import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/metadata/console/options'

export const removeMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Strip metadata (EXIF / XMP / ID3) from a file',
  options,
  path: ['remove', 'metadata'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'in-place strip', command: 'task remove metadata photo.jpg' },
    { comment: 'write to a new file', command: 'task remove metadata song.mp3 -o clean.mp3' },
  ],
})
