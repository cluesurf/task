import { buildActionCommand } from '~/code/tool/shared/console'

export const modifyPdfConsole = buildActionCommand({
  command: 'pdf',
  describe: 'Reorder or remove pages from a PDF',
  // TODO: form modify_pdf missing from MESH — re-link schema
  options: [],
  path: ['modify', 'pdf'],
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
