import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const mergeConsole = buildActionCommand({
  command: 'merge',
  describe: 'Concatenate multiple PDFs into one',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'merge',
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
