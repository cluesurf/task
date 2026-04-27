/**
 * `task transform <thing>` — reshape data without changing format.
 * Today: data. Future: code (codemods), schema, image (filters).
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { transformDataConsole } from './data/console'

registerGroupHelp({
  command: 'task transform',
  describe: 'Reshape structured data without changing format',
  commands: [
    { name: 'data', describe: 'Reshape a data file via map / jq / sql' },
  ],
})

export const transformConsole: CommandModule = {
  command: 'transform <thing>',
  describe: 'Reshape structured data',
  builder: y =>
    y
      .command(transformDataConsole)
      .demandCommand(1, 'Specify what to transform'),
  handler: () => {},
}
