/**
 * `task issue <thing>` — issue a credential / cert / token.
 * Today: tls.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { issueTlsConsole } from './tls/console'

registerGroupHelp({
  command: 'task issue',
  describe: 'Mint a new credential, cert, or token',
  commands: [
    { name: 'tls', describe: 'Mint a TLS cert via a locally-installed CA (mkcert)' },
  ],
})

export const issueConsole: CommandModule = {
  command: 'issue <thing>',
  describe: 'Mint a new credential, cert, or token',
  builder: y =>
    y
      .command(issueTlsConsole)
      .demandCommand(1, 'Specify what to issue'),
  handler: () => {},
}
