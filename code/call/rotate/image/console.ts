import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/rotate/image/console/options'

export const rotateImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Rotate an image by N degrees',
  options,
  path: ['rotate', 'image'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'quarter turn clockwise', command: 'task rotate image -i photo.png -o rotated.png --degree 90' },
  ],
})
