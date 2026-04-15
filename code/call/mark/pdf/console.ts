import { buildActionCommand } from '~/code/tool/shared/console'

export const markPdfConsole = buildActionCommand({
  command: 'pdf',
  describe: 'Add a basic highlight stamp to a PDF',
  // TODO: form mark_pdf missing from MESH — re-link schema
  options: [],
  path: ['mark', 'pdf'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'flag a PDF with a top-right highlight stamp',
      command: 'task mark pdf file.pdf --highlight "important"',
    },
  ],
})
