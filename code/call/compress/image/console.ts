import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compressImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Compress an image with ImageMagick at a given quality',
  path: ['compress', 'image'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compress_image',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'compress to 80% quality in place', command: 'task compress image -i photo.jpg --quality 80' },
    { comment: 'compress to an explicit output', command: 'task compress image -i photo.png -o photo.small.jpg --quality 75' },
  ],
})
