import type { CommandModule } from 'yargs'
import { sliceDocumentConsole } from './document/console'

export const sliceConsole: CommandModule = {
  command: 'slice <thing>',
  describe: 'Slice a document or other asset',
  builder: y =>
    y.command(sliceDocumentConsole).demandCommand(1, 'Specify what to slice'),
  handler: () => {},
}
