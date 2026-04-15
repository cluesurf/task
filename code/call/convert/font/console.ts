import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/shared/console/options'

export const convertFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Convert between font formats',
  options,
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
