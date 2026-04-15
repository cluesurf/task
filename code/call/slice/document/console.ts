import { buildActionCommand } from '~/code/tool/shared/console'

export const sliceDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Slice pages out of a document',
  // TODO: form slice_document_command_input missing from MESH — re-link schema
  options: [],
  loadHandler: () => import('./node'),
})
