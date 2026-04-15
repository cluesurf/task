import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/update/image/console/options'

export const updateImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Apply quick color / tonal tweaks to an image (grayscale, brightness, ...)',
  options,
  path: ['update', 'image'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'in-place grayscale', command: 'task update image photo.png --grayscale' },
    { comment: 'brighten by 10%', command: 'task update image photo.png --brightness +10' },
    { comment: 'save as a copy', command: 'task update image photo.png -o warm.png --saturation +20' },
  ],
})
