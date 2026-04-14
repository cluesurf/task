/**
 * Yargs command group for `task mark <thing>`.
 *
 *   - `task mark pdf` — basic highlight stamp.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { markPdfConsole } from './pdf/console'

registerGroupHelp({
  command: 'task mark',
  describe: 'Annotate or stamp a file (highlight, flag, ...)',
  commands: [
    { name: 'pdf', describe: 'Add a basic highlight stamp to a PDF' },
  ],
})

export const markConsole: CommandModule = {
  command: 'mark <thing>',
  describe: 'Annotate or stamp a file (highlight, flag, ...)',
  builder: y =>
    y
      .command(markPdfConsole)
      .demandCommand(1, 'Specify what to mark'),
  handler: () => {
    /* routed by subcommand */
  },
}
