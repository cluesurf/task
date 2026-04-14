/**
 * Yargs command group for `task download <thing>`.
 *
 * Each concrete download-source exports its own
 * `CommandModule` at `./<thing>/console.ts`; this file
 * collects them under the `download` verb.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { downloadHuggingFaceConsole } from './hugging-face/console'

registerGroupHelp({
  command: 'task download',
  describe: 'Download from external sources',
  commands: [
    { name: 'hugging-face', describe: 'Download a model or dataset from Hugging Face' },
  ],
})

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
