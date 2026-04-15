import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/trim/image/console/options'

export const trimImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Crop a rectangular region out of an image',
  options,
  path: ['trim', 'image'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'crop a 400x400 region at (100,100)', command: 'task trim image -i photo.png -o thumb.png --crop 100,100,400,400' },
  ],
})
