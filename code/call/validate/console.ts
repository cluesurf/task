import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { validateDocumentConsole } from './document/console'

registerGroupHelp({
  command: 'task validate',
  describe: 'Validate a document or other artifact',
  commands: [
    { name: 'document', describe: 'Validate that a document is well-formed' },
  ],
})

export const validateConsole: CommandModule = {
  command: 'validate <thing>',
  describe: 'Validate a document or other artifact',
  builder: y =>
    y
      .command(validateDocumentConsole)
      .demandCommand(1, 'Specify what to validate'),
  handler: () => {},
}
