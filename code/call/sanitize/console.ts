import type { CommandModule } from 'yargs'
import { sanitizeCodeConsole } from './code/console'

export const sanitizeConsole: CommandModule = {
  command: 'sanitize <thing>',
  describe: 'Sanitize code or other content',
  builder: y =>
    y
      .command(sanitizeCodeConsole)
      .demandCommand(1, 'Specify what to sanitize'),
  handler: () => {},
}
