import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { parseCodeConsole } from './code/console'
import { parseEntityConsole } from './entity/console'
import { parseHtmlConsole } from './html/console'
import { parseLinkConsole } from './link/console'
import { parseTableConsole } from './table/console'

registerGroupHelp({
  command: 'task parse',
  describe: 'Parse source / data / pages into a structured form',
  commands: [
    { name: 'code', describe: 'Parse source code into an AST' },
    { name: 'entity', describe: 'Pull emails / urls / ips / phone / cc / ssn / mac / bitcoin / uuid out of text' },
    { name: 'html', describe: 'Pull tables / links / images / text from a URL or HTML file' },
    { name: 'link', describe: 'Pull every URL out of HTML or text' },
    { name: 'table', describe: 'Pull tables out of HTML / DOCX / PDF' },
  ],
})

export const parseConsole: CommandModule = {
  command: 'parse <thing>',
  describe: 'Parse source / data / pages into a structured form',
  builder: y => y
    .command(parseCodeConsole)
    .command(parseEntityConsole)
    .command(parseHtmlConsole)
    .command(parseLinkConsole)
    .command(parseTableConsole)
    .demandCommand(1, 'Specify what to parse'),
  handler: () => {},
}
