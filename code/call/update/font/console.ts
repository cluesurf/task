import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const updateFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Compile a .fea file into a font\'s GSUB/GPOS tables',
  path: ['update', 'font'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'update_font',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'apply features.fea to a font (writes etch.updated.ttf)',
      command: 'task update font -i etch.ttf --fea features.fea',
    },
    {
      comment: 'apply features and write to an explicit path',
      command:
        'task update font -i etch.ttf --fea features.fea -o dist/etch.v2.ttf',
    },
  ],
})
