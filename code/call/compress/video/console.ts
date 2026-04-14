import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compressVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Re-encode a video file with H.264 at a given quality level',
  path: ['compress', 'video'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compress_video',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'web-ready compress', command: 'task compress video -i in.mov -o out.mp4' },
    { comment: 'higher quality (lower CRF)', command: 'task compress video -i in.mov -o out.mp4 --crf 22' },
  ],
})
