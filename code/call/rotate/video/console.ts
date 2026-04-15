import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/rotate/video/console/options'

export const rotateVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Rotate a video by N degrees (90 / 180 / 270)',
  options,
  path: ['rotate', 'video'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'rotate 90° clockwise', command: 'task rotate video -i in.mp4 -o out.mp4 --degree 90' },
  ],
})
