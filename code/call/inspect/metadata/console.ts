import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/inspect/metadata/console/options'

export const inspectMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Inspect file metadata (EXIF / XMP / IPTC / ID3 / PDF info / ...)',
  options,
  path: ['inspect', 'metadata'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'image metadata', command: 'task inspect metadata photo.jpg' },
    { comment: 'pdf info', command: 'task inspect metadata report.pdf' },
    { comment: 'audio tags', command: 'task inspect metadata song.mp3' },
  ],
})
