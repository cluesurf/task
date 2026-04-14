import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const removeMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Strip metadata (EXIF / XMP / ID3) from a file',
  path: ['remove', 'metadata'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'remove_metadata',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'in-place strip', command: 'task remove metadata photo.jpg' },
    { comment: 'write to a new file', command: 'task remove metadata song.mp3 -o clean.mp3' },
  ],
})
