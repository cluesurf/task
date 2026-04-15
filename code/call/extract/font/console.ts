import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/extract/font/console/options'

export const extractFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Extract TTX (full) or GSUB/GPOS-only source from a font',
  options,
  path: ['extract', 'font'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'full TTX dump for manual editing',
      command: 'task extract font -i etch.ttf --format ttx',
    },
    {
      comment: 'just the GSUB / GPOS feature tables',
      command: 'task extract font -i etch.ttf --format fea -o etch.features.ttx',
    },
  ],
})
