import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/update/font/console/options'

export const updateFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Compile a .fea file into a font\'s GSUB/GPOS tables',
  options,
  path: ['update', 'font'],
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
