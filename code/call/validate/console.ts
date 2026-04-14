import type { CommandModule } from 'yargs'
import { validateDocumentConsole } from './document/console'

export const validateConsole: CommandModule = {
  command: 'validate <thing>',
  describe: 'Validate a document or other artifact',
  builder: y =>
    y
      .command(validateDocumentConsole)
      .demandCommand(1, 'Specify what to validate'),
  handler: () => {},
}
