import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const updateImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Apply quick color / tonal tweaks to an image (grayscale, brightness, ...)',
  path: ['update', 'image'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'update_image',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'in-place grayscale', command: 'task update image photo.png --grayscale' },
    { comment: 'brighten by 10%', command: 'task update image photo.png --brightness +10' },
    { comment: 'save as a copy', command: 'task update image photo.png -o warm.png --saturation +20' },
  ],
})
