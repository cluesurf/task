import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { parseCodeConsole } from './code/console'
import { parseHtmlConsole } from './html/console'

registerGroupHelp({
  command: 'task parse',
  describe: 'Parse source / data / pages into a structured form',
  commands: [
    { name: 'code', describe: 'Parse source code into an AST' },
    { name: 'html', describe: 'Extract tables / links / images / text from a URL or HTML file' },
  ],
})

export const parseConsole: CommandModule = {
  command: 'parse <thing>',
  describe: 'Parse source / data / pages into a structured form',
  builder: y => y
    .command(parseCodeConsole)
    .command(parseHtmlConsole)
    .demandCommand(1, 'Specify what to parse'),
  handler: () => {},
}
