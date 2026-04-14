import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const highlightConsole = buildActionCommand({
  command: 'highlight',
  describe: 'Stamp a basic highlight + note on the first page of a PDF',
  path: ['highlight'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'highlight',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'positional form', command: 'task highlight paper.pdf -o paper.marked.pdf --text "important"' },
    { comment: 'explicit -i / -o', command: 'task highlight -i paper.pdf -o paper.marked.pdf --text "important"' },
  ],
})
