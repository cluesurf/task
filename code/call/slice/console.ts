import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { sliceDocumentConsole } from './document/console'

registerGroupHelp({
  command: 'task slice',
  describe: 'Slice a document or other asset',
  commands: [
    { name: 'document', describe: 'Slice a page range out of a document' },
  ],
})

export const sliceConsole: CommandModule = {
  command: 'slice <thing>',
  describe: 'Slice a document or other asset',
  builder: y =>
    y.command(sliceDocumentConsole).demandCommand(1, 'Specify what to slice'),
  handler: () => {},
}
