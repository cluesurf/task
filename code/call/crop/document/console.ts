import { buildActionCommand } from '~/code/tool/shared/console'

export const cropDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Crop pages of a document',
  // TODO: form crop_document_command_input missing from MESH — re-link schema
  options: [],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'auto-crop the white margins off a pdf',
      command:
        'task crop document -i scan.pdf -o scan-trimmed.pdf',
    },
  ],
})
