import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { cropDocumentConsole } from './document/console'

registerGroupHelp({
  command: 'task crop',
  describe: 'Crop a document or image',
  commands: [
    { name: 'document', describe: 'Crop margins or a page region from a document' },
  ],
})

export const cropConsole: CommandModule = {
  command: 'crop <thing>',
  describe: 'Crop a document or image',
  builder: y =>
    y.command(cropDocumentConsole).demandCommand(1, 'Specify what to crop'),
  handler: () => {},
}
