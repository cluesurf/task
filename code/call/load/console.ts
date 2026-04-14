/**
 * Yargs command group for `task load <thing>`.
 *
 *   - `task load environment` — upsert a key=value into a .env file.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { loadEnvironmentConsole } from './environment/console'

registerGroupHelp({
  command: 'task load',
  describe: 'Load values into long-lived state (.env files, ...)',
  commands: [
    { name: 'environment', describe: 'Upsert a key=value into a .env file' },
  ],
})

export const loadConsole: CommandModule = {
  command: 'load <thing>',
  describe: 'Load values into long-lived state (.env files, ...)',
  builder: y =>
    y
      .command(loadEnvironmentConsole)
      .demandCommand(1, 'Specify what to load'),
  handler: () => {
    /* routed by subcommand */
  },
}
