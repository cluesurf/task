import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/invisible/console/options'

export const removeInvisibleConsole = buildActionCommand({
  command: 'invisible',
  describe:
    'Strip zero-width / BOM / invisible characters from a text file',
  options,
  loadHandler: () => import('./node'),
  path: ['remove', 'invisible'],
  examples: [
    {
      comment: 'in-place strip',
      command: 'task remove invisible text.txt',
    },
    {
      comment: 'to a copy',
      command: 'task remove invisible text.txt -o clean.txt',
    },
  ],
})
