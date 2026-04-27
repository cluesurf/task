/**
 * `task inspect tls <host[:port]>` — fetch the served TLS chain
 * via `openssl s_client`, parse each PEM certificate with Node's
 * built-in `tls.X509Certificate`, and emit a key/value summary
 * (subject / issuer / SANs / NotBefore / NotAfter / fingerprint).
 *
 * A TTL warning fires when `NotAfter` is within 30 days. The
 * pretty renderer paints expired certs red and near-expiry
 * yellow so a glance at the output catches rotation gaps before
 * a browser does.
 */

import { X509Certificate } from 'node:crypto'
import { spawn } from 'node:child_process'
import {
  buildCommandToInspectTls,
  type InspectTlsCommandInput,
} from './command'

export type InspectTlsNodeInput = InspectTlsCommandInput

export type InspectTlsCertSummary = {
  subject: string
  issuer: string
  serialNumber: string
  fingerprint: string
  fingerprint256: string
  validFrom: string
  validTo: string
  daysUntilExpiry: number
  expired: boolean
  subjectAltName?: string
  keyUsage?: string[]
  selfSigned: boolean
}

export type InspectTlsNodeOutput = {
  host: string
  port: number
  certificates: InspectTlsCertSummary[]
}

async function inspectTlsNode(
  source: InspectTlsNodeInput,
): Promise<InspectTlsNodeOutput> {
  const port = source.port ?? 443
  const command = buildCommandToInspectTls(source)
  const stdout = await runOpenssl(command.bin, command.args)
  const pems = extractPemCertificates(stdout)
  if (pems.length === 0) {
    throw new Error(
      `inspect tls: no certificates returned by ${source.host}:${port}` +
        ' — host may not be serving TLS, or openssl is missing',
    )
  }

  const now = Date.now()
  const certificates: InspectTlsCertSummary[] = pems.map(pem => {
    const c = new X509Certificate(pem)
    const validTo = Date.parse(c.validTo)
    const daysUntilExpiry = Math.floor((validTo - now) / (24 * 60 * 60 * 1000))
    return {
      subject: c.subject,
      issuer: c.issuer,
      serialNumber: c.serialNumber,
      fingerprint: c.fingerprint,
      fingerprint256: c.fingerprint256,
      validFrom: c.validFrom,
      validTo: c.validTo,
      daysUntilExpiry,
      expired: daysUntilExpiry < 0,
      subjectAltName: c.subjectAltName ?? undefined,
      keyUsage: c.keyUsage ?? undefined,
      selfSigned: c.subject === c.issuer,
    }
  })

  return { host: source.host, port, certificates }
}

function runOpenssl(bin: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    child.stdout?.on('data', (d: Buffer) => { stdout += d.toString('utf8') })
    child.stderr?.on('data', (d: Buffer) => { stderr += d.toString('utf8') })
    child.on('error', err => {
      reject(
        new Error(
          `inspect tls: openssl not available — install via ` +
            `\`brew install openssl\` or \`apt install openssl\` (${err.message})`,
        ),
      )
    })
    child.stdin?.write('Q\n')
    child.stdin?.end()
    child.on('close', code => {
      if (code === 0 || stdout.includes('-----BEGIN CERTIFICATE-----')) {
        resolve(stdout)
      } else {
        reject(
          new Error(
            `inspect tls: openssl exited with code ${code}: ${stderr.slice(0, 400)}`,
          ),
        )
      }
    })
  })
}

function extractPemCertificates(text: string): string[] {
  const matches = text.match(
    /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g,
  )
  return matches ?? []
}

export default inspectTlsNode
export { inspectTlsNode }
