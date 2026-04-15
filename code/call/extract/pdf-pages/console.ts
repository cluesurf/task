import { buildActionCommand } from '~/code/tool/shared/console'

export const extractPdfPagesConsole = buildActionCommand({
  command: 'pages',
  describe: 'Extract a page range from a PDF into a new file',
  // TODO: form extract_pdf_pages missing from MESH — re-link schema
  options: [],
  path: ['extract', 'pages'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'extract pages 1–3',
      command: 'task extract pages -i file.pdf --pages 1-3',
    },
  ],
})
