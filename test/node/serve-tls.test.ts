import { describe, it, expect } from 'vitest'
import { buildCommandToServeTlsCaddy } from '~/code/call/serve/tls/command'

describe('serve tls — caddy file-server argv builder', () => {
  it('builds a basic single-host serve', () => {
    const c = buildCommandToServeTlsCaddy({
      dir: './public',
      hosts: ['app.dev'],
      internal: true,
    })
    expect(c.bin).toBe('caddy')
    expect(c.args).toContain('file-server')
    expect(c.args).toContain('--root')
    expect(c.args).toContain('./public')
    expect(c.args).toContain('--domain')
    expect(c.args).toContain('app.dev')
    expect(c.args).toContain('--internal-certs')
  })

  it('repeats --domain for SAN hosts', () => {
    const c = buildCommandToServeTlsCaddy({
      dir: './public',
      hosts: ['app.dev', 'api.dev'],
    })
    const domains = c.args.filter((_, i) => c.args[i - 1] === '--domain')
    expect(domains).toEqual(['app.dev', 'api.dev'])
  })

  it('honors a custom port', () => {
    const c = buildCommandToServeTlsCaddy({
      dir: '.',
      hosts: ['app.dev'],
      port: 8443,
    })
    expect(c.args).toContain('--listen')
    expect(c.args).toContain(':8443')
  })

  it('rejects empty inputs', () => {
    expect(() =>
      buildCommandToServeTlsCaddy({ dir: '', hosts: ['app.dev'] }),
    ).toThrow(/--dir/)
    expect(() =>
      buildCommandToServeTlsCaddy({ dir: '.', hosts: [] }),
    ).toThrow(/--for/)
  })
})
