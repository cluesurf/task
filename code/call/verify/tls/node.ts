/**
 * `task verify tls <host>` — end-to-end probe. Confirms the
 * served TLS chain validates against the local trust store.
 *
 * Reuses Node's built-in `tls.connect` with `rejectUnauthorized:
 * true`. If the chain is valid (issuer trusted, name matches,
 * not expired) the call resolves; otherwise the OpenSSL error
 * code is surfaced. Pair with `task issue tls --install` and
 * `task trust tls` to set up the chain in the first place.
 */

import tls from 'node:tls'

export type VerifyTlsNodeInput = {
  host: string
  port?: number
  /** SNI server name (default = host). */
  servername?: string
  /** Bypass the trust-store check — useful for inspecting an
   *  intentionally-untrusted chain alongside `inspect tls`. */
  insecure?: boolean
  /** Connect timeout in milliseconds (default 10_000). */
  timeout?: number
}

export type VerifyTlsNodeOutput = {
  host: string
  port: number
  trusted: boolean
  /** OpenSSL verify code from `getPeerCertificate()` chain. */
  verifyError?: string
  subject?: string
  issuer?: string
  validTo?: string
  daysUntilExpiry?: number
}

async function verifyTlsNode(
  source: VerifyTlsNodeInput,
): Promise<VerifyTlsNodeOutput> {
  const port = source.port ?? 443
  const servername = source.servername ?? source.host
  const timeout = source.timeout ?? 10_000

  return new Promise<VerifyTlsNodeOutput>((resolve, reject) => {
    const socket = tls.connect({
      host: source.host,
      port,
      servername,
      rejectUnauthorized: !source.insecure,
      timeout,
    })

    const onError = (err: NodeJS.ErrnoException & { code?: string }) => {
      socket.destroy()
      // OpenSSL verify failures surface as e.g. SELF_SIGNED_CERT_IN_CHAIN.
      // Re-resolve with `trusted: false` and the code so callers can
      // switch on it instead of try/catching.
      const code = err.code ?? err.message ?? 'UNKNOWN'
      if (/CERT|VERIFY|UNABLE/i.test(code)) {
        resolve({
          host: source.host,
          port,
          trusted: false,
          verifyError: code,
        })
        return
      }
      reject(err)
    }

    socket.once('error', onError)
    socket.once('timeout', () => onError(new Error('timeout') as never))
    socket.once('secureConnect', () => {
      const peer = socket.getPeerCertificate()
      const validTo = peer?.valid_to ? new Date(peer.valid_to).toISOString() : undefined
      const daysUntilExpiry = peer?.valid_to
        ? Math.floor((Date.parse(peer.valid_to) - Date.now()) / 86_400_000)
        : undefined
      socket.end()
      resolve({
        host: source.host,
        port,
        trusted: socket.authorized,
        verifyError: socket.authorized ? undefined : socket.authorizationError?.message,
        subject: peer?.subject ? formatX509(peer.subject as unknown as Record<string, unknown>) : undefined,
        issuer: peer?.issuer ? formatX509(peer.issuer as unknown as Record<string, unknown>) : undefined,
        validTo,
        daysUntilExpiry,
      })
    })
  })
}

function formatX509(parts: Record<string, unknown>): string {
  return Object.entries(parts)
    .map(([k, v]) => `${k}=${String(v)}`)
    .join(', ')
}

export default verifyTlsNode
export { verifyTlsNode }
