import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compress/video/console/options'

export const compressVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Re-encode a video file with H.264 at a given quality level',
  options,
  path: ['compress', 'video'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'web-ready compress', command: 'task compress video -i in.mov -o out.mp4' },
    { comment: 'higher quality (lower CRF)', command: 'task compress video -i in.mov -o out.mp4 --crf 22' },
  ],
})
