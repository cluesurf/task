/**
 * `task untrust <thing>` — undo a `task trust` install. Today: tls.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { untrustTlsConsole } from './tls/console'

registerGroupHelp({
  command: 'task untrust',
  describe: 'Remove a credential or CA from a persistent store',
  commands: [
    { name: 'tls', describe: 'Remove a CA cert from the OS trust store by SHA-1' },
  ],
})

export const untrustConsole: CommandModule = {
  command: 'untrust <thing>',
  describe: 'Remove a credential or CA from a persistent store',
  builder: y =>
    y
      .command(untrustTlsConsole)
      .demandCommand(1, 'Specify what to untrust'),
  handler: () => {},
}
