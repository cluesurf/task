import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Convert between document formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_document_command_input',
  loadHandler: () => import('./node'),
})
