import { describe, it, expect } from 'vitest'
import { buildCommandToIssueTlsMkcert } from '~/code/call/issue/tls/command'

describe('issue tls — mkcert argv builder', () => {
  it('mints a single host with no extra flags', () => {
    const c = buildCommandToIssueTlsMkcert({ hosts: ['app.dev'] })
    expect(c.bin).toBe('mkcert')
    expect(c.args).toEqual(['app.dev'])
  })

  it('forwards explicit cert / key paths', () => {
    const c = buildCommandToIssueTlsMkcert({
      hosts: ['app.dev'],
      certFile: 'tls/app.crt',
      keyFile: 'tls/app.key',
    })
    expect(c.args).toEqual([
      '-cert-file', 'tls/app.crt',
      '-key-file', 'tls/app.key',
      'app.dev',
    ])
  })

  it('passes --client for client-auth certs', () => {
    const c = buildCommandToIssueTlsMkcert({
      hosts: ['user@app.dev'],
      client: true,
    })
    expect(c.args[0]).toBe('-client')
  })

  it('rejects an empty host list', () => {
    expect(() =>
      buildCommandToIssueTlsMkcert({ hosts: [] }),
    ).toThrow(/at least one host/)
  })

  it('emits SAN / wildcard hosts in order', () => {
    const c = buildCommandToIssueTlsMkcert({
      hosts: ['app.dev', '*.app.dev', 'localhost', '127.0.0.1'],
    })
    expect(c.args).toEqual(['app.dev', '*.app.dev', 'localhost', '127.0.0.1'])
  })
})
