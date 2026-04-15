import { buildActionCommand } from '~/code/tool/shared/console'

export const validateDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Validate a document against a schema or standard',
  // TODO: form validate_document_command_input missing from MESH — re-link schema
  options: [],

})
