import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { parseCodeConsole } from './code/console'

registerGroupHelp({
  command: 'task parse',
  describe: 'Parse source or data into a structured form',
  commands: [
    { name: 'code', describe: 'Parse source code into an AST' },
  ],
})

export const parseConsole: CommandModule = {
  command: 'parse <thing>',
  describe: 'Parse source or data into a structured form',
  builder: y =>
    y.command(parseCodeConsole).demandCommand(1, 'Specify what to parse'),
  handler: () => {},
}
