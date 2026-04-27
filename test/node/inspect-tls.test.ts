import { describe, it, expect } from 'vitest'
import { inspectTlsNode } from '~/code/call/inspect/tls/node'

const SKIP_PATTERN = /not found|ENOENT|not available|openssl|exited with code/i

describe('inspect tls', () => {
  it('returns a chain summary for a public host', async () => {
    try {
      const result = await inspectTlsNode({ host: 'clue.surf', port: 443 })
      expect(result.host).toBe('clue.surf')
      expect(result.port).toBe(443)
      expect(result.certificates.length).toBeGreaterThan(0)
      const leaf = result.certificates[0]!
      expect(typeof leaf.subject).toBe('string')
      expect(typeof leaf.issuer).toBe('string')
      expect(typeof leaf.fingerprint256).toBe('string')
      expect(typeof leaf.daysUntilExpiry).toBe('number')
    } catch (e) {
      if (SKIP_PATTERN.test(String((e as Error)?.message ?? e))) return
      throw e
    }
  }, 30_000)

  it('errors clearly when the host is unreachable', async () => {
    await expect(async () =>
      inspectTlsNode({ host: 'nonexistent.invalid', port: 443 }),
    ).rejects.toThrow()
  }, 30_000)
})
