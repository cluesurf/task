/**
 * Yargs command group for `task download <thing>`.
 *
 * Each concrete download-source exports its own
 * `CommandModule` at `./<thing>/console.ts`; this file
 * collects them under the `download` verb.
 */

import type { CommandModule } from 'yargs'
import { downloadHuggingFaceConsole } from './hugging-face/console'

export const downloadConsole: CommandModule = {
  command: 'download <thing>',
  describe: 'Download from external sources',
  builder: y =>
    y
      .command(downloadHuggingFaceConsole)
      .demandCommand(1, 'Specify what to download'),
  handler: () => {
    /* handled by subcommand */
  },
}
