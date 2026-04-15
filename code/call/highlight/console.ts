import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/highlight/console/options'

export const highlightConsole = buildActionCommand({
  command: 'highlight',
  describe: 'Stamp a basic highlight + note on the first page of a PDF',
  options,
  path: ['highlight'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'positional form', command: 'task highlight paper.pdf -o paper.marked.pdf --text "important"' },
    { comment: 'explicit -i / -o', command: 'task highlight -i paper.pdf -o paper.marked.pdf --text "important"' },
  ],
})
