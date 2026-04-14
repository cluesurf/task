import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const rotateImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Rotate an image by N degrees',
  path: ['rotate', 'image'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'rotate_image',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'quarter turn clockwise', command: 'task rotate image -i photo.png -o rotated.png --degree 90' },
  ],
})
