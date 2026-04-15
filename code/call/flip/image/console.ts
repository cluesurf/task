import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/flip/image/console/options'

export const flipImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Flip an image horizontally or vertically',
  options,
  path: ['flip', 'image'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'mirror an image', command: 'task flip image -i photo.png -o mirrored.png --horizontal' },
  ],
})
