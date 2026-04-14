import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Convert between image formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_command_input',
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
