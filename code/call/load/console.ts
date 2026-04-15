/**
 * Yargs command group for `task load <thing>`.
 *
 *   - `task load environment` — upsert a key=value into a .env file.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { loadEnvironmentConsole } from './environment/console'
import { loadKubeconfigConsole } from './kubeconfig/console'

registerGroupHelp({
  command: 'task load',
  describe: 'Load values into long-lived state (.env files, kubeconfig, ...)',
  commands: [
    { name: 'environment', describe: 'Upsert a key=value into a .env file' },
    { name: 'kubeconfig', describe: 'Merge a DOKS cluster config into ~/.kube/config' },
  ],
})

export const loadConsole: CommandModule = {
  command: 'load <thing>',
  describe: 'Load values into long-lived state (.env files, kubeconfig, ...)',
  builder: y =>
    y
      .command(loadEnvironmentConsole)
      .command(loadKubeconfigConsole)
      .demandCommand(1, 'Specify what to load'),
  handler: () => {
    /* routed by subcommand */
  },
}
