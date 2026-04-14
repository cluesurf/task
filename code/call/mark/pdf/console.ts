import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const markPdfConsole = buildActionCommand({
  command: 'pdf',
  describe: 'Add a basic highlight stamp to a PDF',
  path: ['mark', 'pdf'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'mark_pdf',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'flag a PDF with a top-right highlight stamp',
      command: 'task mark pdf file.pdf --highlight "important"',
    },
  ],
})
