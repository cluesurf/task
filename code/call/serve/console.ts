/**
 * `task serve <thing>` — spin up a local server. Today: tls.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { serveTlsConsole } from './tls/console'

registerGroupHelp({
  command: 'task serve',
  describe: 'Spin up a local server',
  commands: [
    { name: 'tls', describe: 'Serve a folder over HTTPS via Caddy with auto-issued certs' },
  ],
})

export const serveConsole: CommandModule = {
  command: 'serve <thing>',
  describe: 'Spin up a local server',
  builder: y =>
    y
      .command(serveTlsConsole)
      .demandCommand(1, 'Specify what to serve'),
  handler: () => {},
}
