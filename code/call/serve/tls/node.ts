/**
 * `task serve tls <dir> --for <host>` — static file server with
 * auto-issued TLS via Caddy's internal CA. Long-running; exits
 * on Ctrl-C.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToServeTlsCaddy,
  type ServeTlsCommandInput,
} from './command'

export type ServeTlsNodeInput = ServeTlsCommandInput

async function serveTlsNode(source: ServeTlsNodeInput): Promise<void> {
  const command = buildCommandToServeTlsCaddy(source)
  await spawnAndWait({
    verb: 'serve tls',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default serveTlsNode
export { serveTlsNode }
