/**
 * `caddy file-server` argv builder. Caddy's internal CA (the
 * one `mkcert -install` doesn't touch) auto-issues per-host
 * certs on first request; we just point it at the directory.
 *
 * The `--for <host>` flag is a thin sugar over Caddy's
 * `--domain` so the verb reads naturally. Multiple hosts are
 * allowed — pass them comma-separated.
 */

export type ServeTlsCommandInput = {
  dir: string
  /** Hosts to serve. Caddy auto-issues TLS per host. */
  hosts: string[]
  /** TCP port (default 443; HTTP redirect on `:80`). */
  port?: number
  /** Skip ACME and use Caddy's internal CA only. */
  internal?: boolean
  /** Show directory listings when no index file. */
  browse?: boolean
}

export function buildCommandToServeTlsCaddy(
  input: ServeTlsCommandInput,
): { bin: 'caddy'; args: string[] } {
  if (!input.dir) throw new Error('serve tls: --dir is required')
  if (input.hosts.length === 0) {
    throw new Error('serve tls: at least one --for <host> is required')
  }
  const args: string[] = ['file-server', '--root', input.dir]
  for (const host of input.hosts) args.push('--domain', host)
  if (input.port !== undefined) {
    args.push('--listen', `:${input.port}`)
  }
  if (input.internal) args.push('--access-log', '--internal-certs')
  if (input.browse) args.push('--browse')
  return { bin: 'caddy', args }
}
