import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const extractFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Extract TTX (full) or GSUB/GPOS-only source from a font',
  path: ['extract', 'font'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'extract_font',
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
