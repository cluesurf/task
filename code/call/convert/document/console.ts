import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Convert between document formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_command_input',
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
