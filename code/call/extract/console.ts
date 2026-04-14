import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { extractArchiveConsole } from './archive/console'
import { extractFontConsole } from './font/console'
import { extractPdfPagesConsole } from './pdf-pages/console'

registerGroupHelp({
  command: 'task extract',
  describe: 'Extract content from containers',
  commands: [
    { name: 'archive', describe: 'Extract files from an archive' },
    { name: 'font', describe: 'Extract TTX or GSUB/GPOS source from a font' },
    { name: 'pages', describe: 'Extract a page range from a PDF into a new file' },
  ],
})

export const extractConsole: CommandModule = {
  command: 'extract <thing>',
  describe: 'Extract content from containers',
  builder: y =>
    y
      .command(extractArchiveConsole)
      .command(extractFontConsole)
      .command(extractPdfPagesConsole)
      .demandCommand(1, 'Specify what to extract from'),
  handler: () => {},
}
