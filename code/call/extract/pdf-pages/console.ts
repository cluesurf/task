import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const extractPdfPagesConsole = buildActionCommand({
  command: 'pages',
  describe: 'Extract a page range from a PDF into a new file',
  path: ['extract', 'pages'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'extract_pdf_pages',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'extract pages 1–3',
      command: 'task extract pages -i file.pdf --pages 1-3',
    },
  ],
})
