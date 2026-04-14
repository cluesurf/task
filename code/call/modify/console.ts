/**
 * Yargs command group for `task modify <thing>`.
 *
 *   - `task modify pdf` — reorder / remove PDF pages.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { modifyPdfConsole } from './pdf/console'

registerGroupHelp({
  command: 'task modify',
  describe: 'Modify the structure of a file (PDF page order, ...)',
  commands: [
    { name: 'pdf', describe: 'Reorder or remove pages from a PDF' },
  ],
})

export const modifyConsole: CommandModule = {
  command: 'modify <thing>',
  describe: 'Modify the structure of a file (PDF page order, ...)',
  builder: y =>
    y
      .command(modifyPdfConsole)
      .demandCommand(1, 'Specify what to modify'),
  handler: () => {
    /* routed by subcommand */
  },
}
