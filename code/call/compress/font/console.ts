import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compress/font/console/options'

export const compressFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Compress a TTF/OTF font to WOFF2',
  options,
  path: ['compress', 'font'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compress to sibling .woff2',
      command: 'task compress font -i etch.ttf',
    },
    {
      comment: 'compress and write to an explicit path',
      command: 'task compress font -i etch.ttf -o dist/etch.woff2',
    },
  ],
})
