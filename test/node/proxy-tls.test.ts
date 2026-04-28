import { describe, it, expect } from 'vitest'
import { buildCommandToProxyTlsCaddy } from '~/code/call/proxy/tls/command'

describe('proxy tls — caddy reverse-proxy argv builder', () => {
  it('builds a basic forward', () => {
    const c = buildCommandToProxyTlsCaddy({
      from: 'app.dev',
      to: 'localhost:3000',
    })
    expect(c.bin).toBe('caddy')
    expect(c.args).toEqual([
      'reverse-proxy',
      '--from', 'app.dev',
      '--to', 'localhost:3000',
      '--internal-certs',
    ])
  })

  it('appends :port to --from when given', () => {
    const c = buildCommandToProxyTlsCaddy({
      from: 'api.dev',
      to: 'localhost:8080',
      port: 8443,
    })
    expect(c.args).toContain('--from')
    expect(c.args).toContain('api.dev:8443')
  })

  it('respects --change-host + --log', () => {
    const c = buildCommandToProxyTlsCaddy({
      from: 'app.dev',
      to: 'localhost:3000',
      changeHost: true,
      log: true,
    })
    expect(c.args).toContain('--change-host-header')
    expect(c.args).toContain('--access-log')
  })

  it('skips --internal-certs when internal is false', () => {
    const c = buildCommandToProxyTlsCaddy({
      from: 'public.example',
      to: 'localhost:3000',
      internal: false,
    })
    expect(c.args).not.toContain('--internal-certs')
  })

  it('rejects empty from / to', () => {
    expect(() =>
      buildCommandToProxyTlsCaddy({ from: '', to: 'x' }),
    ).toThrow(/--from/)
    expect(() =>
      buildCommandToProxyTlsCaddy({ from: 'x', to: '' }),
    ).toThrow(/--to/)
  })
})
