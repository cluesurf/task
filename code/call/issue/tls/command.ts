/**
 * `mkcert` argv builder. mkcert mints a leaf cert signed by a
 * locally-installed CA, writing `<host>.pem` + `<host>-key.pem`
 * (or the explicit `--cert-file` / `--key-file` paths).
 */

export type IssueTlsCommandInput = {
  hosts: string[]
  certFile?: string
  keyFile?: string
  /** Use `mkcert -client` for client auth certs. */
  client?: boolean
}

export function buildCommandToIssueTlsMkcert(
  input: IssueTlsCommandInput,
): { bin: 'mkcert'; args: string[] } {
  if (input.hosts.length === 0) {
    throw new Error('issue tls: at least one host is required')
  }
  const args: string[] = []
  if (input.client) args.push('-client')
  if (input.certFile) args.push('-cert-file', input.certFile)
  if (input.keyFile) args.push('-key-file', input.keyFile)
  args.push(...input.hosts)
  return { bin: 'mkcert', args }
}
