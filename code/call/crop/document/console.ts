import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const cropDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Crop pages of a document',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'crop_document_command_input',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'auto-crop the white margins off a pdf',
      command:
        'task crop document -i scan.pdf -o scan-trimmed.pdf',
    },
  ],
})
