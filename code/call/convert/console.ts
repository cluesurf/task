/**
 * Yargs command group for `task convert <thing>`.
 *
 * Each concrete convert-target exports its own `CommandModule`
 * at `./<thing>/console.ts`; this file collects them under the
 * `convert` verb.
 */

import type { CommandModule } from 'yargs'
import { convertArchiveConsole } from './archive/console'
import { convertDataConsole } from './data/console'
import { convertDocumentConsole } from './document/console'
import { convertFontConsole } from './font/console'
import { convertImageConsole } from './image/console'
import { convertTimeConsole } from './time/console'
import { convertUnitConsole } from './unit/console'
import { convertVideoConsole } from './video/console'

export const convertConsole: CommandModule = {
  command: 'convert <thing>',
  describe: 'Convert between formats',
  builder: y =>
    y
      .command(convertArchiveConsole)
      .command(convertDataConsole)
      .command(convertDocumentConsole)
      .command(convertFontConsole)
      .command(convertImageConsole)
      .command(convertTimeConsole)
      .command(convertUnitConsole)
      .command(convertVideoConsole)
      .demandCommand(1, 'Specify what to convert'),
  handler: () => {
    /* routed by subcommand */
  },
}
