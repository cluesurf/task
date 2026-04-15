import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/shared/console/options'

export const convertDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Convert between document formats',
  options,
  loadHandler: () => import('~/code/call/convert/node'),
  path: ['convert', 'document'],
  examples: [
    {
      comment: 'convert a docx to a pdf',
      command:
        'task convert document -I docx -O pdf -i report.docx -o report.pdf',
    },
  ],
})
