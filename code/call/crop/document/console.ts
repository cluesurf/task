import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const cropDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Crop pages of a document',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'crop_document_command_input',
  loadHandler: () => import('./node'),
})
