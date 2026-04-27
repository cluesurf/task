/**
 * `task isolate <thing>` — extract embedded resources out of
 * mixed-content files. Today: image (pdf / docx / html).
 * Future: audio / video / font extraction from the same hosts.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { isolateImageConsole } from './image/console'

registerGroupHelp({
  command: 'task isolate',
  describe: 'Extract embedded resources out of mixed-content files',
  commands: [
    { name: 'image', describe: 'Pull embedded images out of pdf / docx / html' },
  ],
})

export const isolateConsole: CommandModule = {
  command: 'isolate <thing>',
  describe: 'Extract embedded resources out of mixed-content files',
  builder: y =>
    y
      .command(isolateImageConsole)
      .demandCommand(1, 'Specify what to isolate'),
  handler: () => {},
}
