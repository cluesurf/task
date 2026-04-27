import { describe, it, expect } from 'vitest'
import { inspectDnsNode } from '~/code/call/inspect/dns/node'

describe('inspect dns', () => {
  it('resolves common record types for a public host', async () => {
    const result = await inspectDnsNode({ host: 'cloudflare.com' })
    expect(result.host).toBe('cloudflare.com')
    expect(result.records.length).toBeGreaterThan(0)
    const types = new Set(result.records.map(r => r.type))
    // At least one of A / AAAA should resolve.
    expect(types.has('A') || types.has('AAAA')).toBe(true)
  }, 15_000)

  it('scopes to a single record type', async () => {
    const result = await inspectDnsNode({
      host: 'cloudflare.com',
      type: 'NS',
    })
    expect(
      result.records.every(r => r.type === 'NS' || r.type === 'NS_error'),
    ).toBe(true)
  }, 15_000)

  it('returns an empty / error record set for a non-existent host', async () => {
    const result = await inspectDnsNode({
      host: 'definitely-not-a-real-domain-xyz.invalid',
    })
    // Expect either no records or only *_error entries — not a throw.
    const real = result.records.filter(r => !r.type.endsWith('_error'))
    expect(real.length).toBe(0)
  }, 15_000)
})
