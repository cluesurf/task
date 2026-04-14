import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compressFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Compress a TTF/OTF font to WOFF2',
  path: ['compress', 'font'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compress_font',
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
