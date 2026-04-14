import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const flipImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Flip an image horizontally or vertically',
  path: ['flip', 'image'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'flip_image',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'mirror an image', command: 'task flip image -i photo.png -o mirrored.png --horizontal' },
  ],
})
