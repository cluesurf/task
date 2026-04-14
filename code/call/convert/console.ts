/**
 * Yargs command group for `task convert <thing>`.
 *
 * Each concrete convert-target exports its own
 * `CommandModule` at `./<thing>/console.ts`; this file
 * collects them under the `convert` verb.
 */

import type { CommandModule } from 'yargs'
import { convertDataConsole } from './data/console'

export const convertConsole: CommandModule = {
  command: 'convert <thing>',
  describe: 'Convert between formats',
  builder: y =>
    y
      .command(convertDataConsole)
      .demandCommand(1, 'Specify what to convert'),
  handler: () => {
    /* handled by subcommand */
  },
}
