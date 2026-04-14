import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const sliceDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Slice pages out of a document',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'slice_document_command_input',
  loadHandler: () => import('./node'),
})
