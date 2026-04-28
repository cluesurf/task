/**
 * `caddy reverse-proxy` argv builder. Caddy's internal CA
 * auto-issues a leaf cert for `--from <host>`; traffic is
 * forwarded to `--to <upstream>`.
 *
 *   task proxy tls app.dev --to localhost:3000
 *   → caddy reverse-proxy --from app.dev --to localhost:3000 --internal-certs
 */

export type ProxyTlsCommandInput = {
  from: string
  to: string
  /** TCP port for the listener (default :443). */
  port?: number
  /** Stay on Caddy's internal CA (default true). */
  internal?: boolean
  /** Forward `Host:` header to the upstream verbatim. */
  changeHost?: boolean
  /** Stream verbose access logs. */
  log?: boolean
}

export function buildCommandToProxyTlsCaddy(
  input: ProxyTlsCommandInput,
): { bin: 'caddy'; args: string[] } {
  if (!input.from) throw new Error('proxy tls: --from is required')
  if (!input.to) throw new Error('proxy tls: --to is required')

  const fromHost = input.port !== undefined
    ? `${input.from}:${input.port}`
    : input.from

  const args = ['reverse-proxy', '--from', fromHost, '--to', input.to]
  if (input.internal !== false) args.push('--internal-certs')
  if (input.changeHost) args.push('--change-host-header')
  if (input.log) args.push('--access-log')
  return { bin: 'caddy', args }
}
