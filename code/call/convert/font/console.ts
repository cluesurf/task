import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Convert between font formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_command_input',
  loadHandler: () => import('~/code/call/convert/node'),
  path: ['convert', 'font'],
  examples: [
    {
      comment: 'convert a TTF font to WOFF for the web',
      command:
        'task convert font -I ttf -O woff -i etch.ttf -o etch.woff',
    },
  ],
})
