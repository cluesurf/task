/**
 * `task proxy tls <host> --to <upstream>` — Caddy reverse-proxy
 * on :443 with internal TLS. One-command local HTTPS for an
 * existing dev server. Long-running; exits on Ctrl-C.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToProxyTlsCaddy,
  type ProxyTlsCommandInput,
} from './command'

export type ProxyTlsNodeInput = ProxyTlsCommandInput

async function proxyTlsNode(source: ProxyTlsNodeInput): Promise<void> {
  const command = buildCommandToProxyTlsCaddy(source)
  await spawnAndWait({
    verb: 'proxy tls',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default proxyTlsNode
export { proxyTlsNode }
