import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const rotateVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Rotate a video by N degrees (90 / 180 / 270)',
  path: ['rotate', 'video'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'rotate_video',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'rotate 90° clockwise', command: 'task rotate video -i in.mp4 -o out.mp4 --degree 90' },
  ],
})
