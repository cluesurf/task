import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const inspectMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Inspect file metadata (EXIF / XMP / IPTC / ID3 / PDF info / ...)',
  path: ['inspect', 'metadata'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'inspect_metadata',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'image metadata', command: 'task inspect metadata photo.jpg' },
    { comment: 'pdf info', command: 'task inspect metadata report.pdf' },
    { comment: 'audio tags', command: 'task inspect metadata song.mp3' },
  ],
})
