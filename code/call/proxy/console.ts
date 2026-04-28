/**
 * `task proxy <thing>` — reverse-proxy in front of an existing
 * server. Today: tls.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { proxyTlsConsole } from './tls/console'

registerGroupHelp({
  command: 'task proxy',
  describe: 'Reverse-proxy a host (HTTPS / TLS termination)',
  commands: [
    { name: 'tls', describe: 'Reverse-proxy over HTTPS via Caddy with auto-issued certs' },
  ],
})

export const proxyConsole: CommandModule = {
  command: 'proxy <thing>',
  describe: 'Reverse-proxy a host',
  builder: y =>
    y
      .command(proxyTlsConsole)
      .demandCommand(1, 'Specify what to proxy'),
  handler: () => {},
}
