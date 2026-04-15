import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/shared/console/options'

export const convertImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Convert between image formats',
  options,
  loadHandler: () => import('~/code/call/convert/node'),
  path: ['convert', 'image'],
  examples: [
    {
      comment: 'convert a png to a jpeg',
      command:
        'task convert image -I png -O jpg -i image.png -o image.jpg',
    },
  ],
})
