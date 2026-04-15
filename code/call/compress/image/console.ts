import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compress/image/console/options'

export const compressImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Compress an image with ImageMagick at a given quality',
  options,
  path: ['compress', 'image'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'compress to 80% quality in place', command: 'task compress image -i photo.jpg --quality 80' },
    { comment: 'compress to an explicit output', command: 'task compress image -i photo.png -o photo.small.jpg --quality 75' },
  ],
})
