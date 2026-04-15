import { buildActionCommand } from '~/code/tool/shared/console'

export const mergeConsole = buildActionCommand({
  command: 'merge',
  describe: 'Concatenate multiple PDFs into one',
  // TODO: form merge missing from MESH — re-link schema
  options: [],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'merge two PDFs',
      command: 'task merge -i a.pdf -i b.pdf -o out.pdf',
    },
    {
      comment: 'merge three',
      command: 'task merge -i intro.pdf -i body.pdf -i appendix.pdf -o report.pdf',
    },
  ],
})
