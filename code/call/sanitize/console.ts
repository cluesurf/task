import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { sanitizeCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task sanitize',
  describe: 'Sanitize code or other content',
  commands: [
    { name: 'code', describe: 'Strip unsafe constructs from source code' },
  ],
})

export const sanitizeConsole: CommandModule = {
  command: 'sanitize <thing>',
  describe: 'Sanitize code or other content',
  builder: y =>
    y
      .command(sanitizeCodeConsole)
      .demandCommand(1, 'Specify what to sanitize'),
  handler: () => {},
}
