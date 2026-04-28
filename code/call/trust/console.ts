/**
 * `task trust <thing>` — install a credential / CA into a
 * persistent store. Today: tls.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { trustTlsConsole } from './tls/console'

registerGroupHelp({
  command: 'task trust',
  describe: 'Install a credential or CA into a persistent store',
  commands: [
    { name: 'tls', describe: 'Install a CA cert into the OS trust store' },
  ],
})

export const trustConsole: CommandModule = {
  command: 'trust <thing>',
  describe: 'Install a credential or CA into a persistent store',
  builder: y =>
    y
      .command(trustTlsConsole)
      .demandCommand(1, 'Specify what to trust'),
  handler: () => {},
}
