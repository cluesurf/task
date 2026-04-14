import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const trimImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Crop a rectangular region out of an image',
  path: ['trim', 'image'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'trim_image',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'crop a 400x400 region at (100,100)', command: 'task trim image -i photo.png -o thumb.png --crop 100,100,400,400' },
  ],
})
