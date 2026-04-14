import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const modifyPdfConsole = buildActionCommand({
  command: 'pdf',
  describe: 'Reorder or remove pages from a PDF',
  path: ['modify', 'pdf'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'modify_pdf',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'reorder pages',
      command: 'task modify pdf file.pdf --order 3,1,2',
    },
    {
      comment: 'drop pages 2 and 5',
      command: 'task modify pdf file.pdf --remove 2,5',
    },
  ],
})
