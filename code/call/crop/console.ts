import type { CommandModule } from 'yargs'
import { cropDocumentConsole } from './document/console'

export const cropConsole: CommandModule = {
  command: 'crop <thing>',
  describe: 'Crop a document or image',
  builder: y =>
    y.command(cropDocumentConsole).demandCommand(1, 'Specify what to crop'),
  handler: () => {},
}
