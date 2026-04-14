import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const validateDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Validate a document against a schema or standard',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'validate_document_command_input',
  loadHandler: () => import('./node'),
})
