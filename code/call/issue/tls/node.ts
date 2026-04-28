/**
 * `task issue tls <host>` — mint a leaf cert signed by a
 * locally-installed CA. Default backend is `mkcert` (single
 * binary, drives both the CA install + per-host issuance).
 *
 * On first run mkcert needs the local CA installed in the
 * system trust store; pass `--install` to do that automatically
 * (`mkcert -install`). Without it, a fresh machine fails the
 * issue with a clear error.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToIssueTlsMkcert,
  type IssueTlsCommandInput,
} from './command'

export type IssueTlsNodeInput = IssueTlsCommandInput & {
  /** Run `mkcert -install` first to seat the local CA. */
  install?: boolean
}

export type IssueTlsNodeOutput = {
  hosts: string[]
  certFile: string
  keyFile: string
}

async function issueTlsNode(
  source: IssueTlsNodeInput,
): Promise<IssueTlsNodeOutput> {
  if (source.install) {
    await spawnAndWait({
      verb: 'issue tls',
      bin: 'mkcert',
      args: ['-install'],
      pipe: true,
    })
  }

  const command = buildCommandToIssueTlsMkcert(source)
  await spawnAndWait({
    verb: 'issue tls',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })

  return {
    hosts: source.hosts,
    certFile: source.certFile ?? defaultCertFile(source.hosts),
    keyFile: source.keyFile ?? defaultKeyFile(source.hosts),
  }
}

function defaultCertFile(hosts: string[]): string {
  // mkcert defaults: <first-host>+<n-extra>.pem when N hosts.
  const first = hosts[0]!.replace(/^\*\./, 'wildcard.')
  return hosts.length === 1
    ? `${first}.pem`
    : `${first}+${hosts.length - 1}.pem`
}

function defaultKeyFile(hosts: string[]): string {
  const first = hosts[0]!.replace(/^\*\./, 'wildcard.')
  return hosts.length === 1
    ? `${first}-key.pem`
    : `${first}+${hosts.length - 1}-key.pem`
}

export default issueTlsNode
export { issueTlsNode }
