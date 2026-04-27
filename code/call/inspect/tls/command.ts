/**
 * `openssl s_client` argv builder. Connects to a host:port,
 * sends `Q\n` on stdin to terminate cleanly, and asks openssl
 * to dump the server certificate chain in PEM form so we can
 * parse it without a second round-trip.
 */

export type InspectTlsCommandInput = {
  host: string
  port?: number
  servername?: string
  starttls?: 'smtp' | 'imap' | 'pop3' | 'ftp' | 'xmpp' | 'lmtp' | 'nntp' | 'irc' | 'postgres' | 'mysql'
}

export function buildCommandToInspectTls(
  input: InspectTlsCommandInput,
): { bin: 'openssl'; args: string[] } {
  const port = input.port ?? 443
  const servername = input.servername ?? input.host
  const args = [
    's_client',
    '-connect',
    `${input.host}:${port}`,
    '-servername',
    servername,
    '-showcerts',
  ]
  if (input.starttls) args.push('-starttls', input.starttls)
  return { bin: 'openssl', args }
}
