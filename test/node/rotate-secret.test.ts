import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { rotateSecretNode } from '~/code/call/rotate/secret/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/rotate-secret')

describe('rotate secret', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('appends a key to a fresh dotenv file', async () => {
    const file = path.join(OUT, 'fresh.env')
    await fs.rm(file, { force: true })
    const r = await rotateSecretNode({
      key: 'API_KEY',
      storePath: file,
      quiet: true,
    })
    expect(r.value).toMatch(/^[A-Za-z0-9_\-]+$/) // base64url default
    const body = await fs.readFile(file, 'utf8')
    expect(body).toContain(`API_KEY=${r.value}`)
  })

  it('replaces an existing key in place', async () => {
    const file = path.join(OUT, 'existing.env')
    await fs.writeFile(
      file,
      'OTHER=keep\nAPI_KEY=old-value\nAFTER=also-keep\n',
    )
    const r = await rotateSecretNode({
      key: 'API_KEY',
      storePath: file,
      quiet: true,
    })
    const body = await fs.readFile(file, 'utf8')
    expect(body).toMatch(/^OTHER=keep\n/)
    expect(body).toContain(`API_KEY=${r.value}`)
    expect(body).not.toContain('old-value')
    expect(body).toContain('AFTER=also-keep')
  })

  it('honors --kind hex + --length', async () => {
    const file = path.join(OUT, 'hex.env')
    const r = await rotateSecretNode({
      key: 'TOKEN',
      storePath: file,
      length: 16,
      format: 'hex',
      quiet: true,
    })
    expect(r.value).toMatch(/^[0-9a-f]{32}$/) // 16 bytes → 32 hex chars
  })

  it('honors --value override (no random)', async () => {
    const file = path.join(OUT, 'fixed.env')
    const r = await rotateSecretNode({
      key: 'PINNED',
      storePath: file,
      value: 'literal-value',
      quiet: true,
    })
    expect(r.value).toBe('literal-value')
  })

  it('rejects an invalid key name', async () => {
    await expect(async () =>
      rotateSecretNode({
        key: '1bad-key',
        storePath: path.join(OUT, 'bad.env'),
        quiet: true,
      }),
    ).rejects.toThrow(/identifier/)
  })

  it('quotes values with spaces or shell metacharacters', async () => {
    const file = path.join(OUT, 'quoted.env')
    await rotateSecretNode({
      key: 'SHELLY',
      storePath: file,
      value: 'a b $c "d"',
      quiet: true,
    })
    const body = await fs.readFile(file, 'utf8')
    expect(body).toMatch(/SHELLY="a b \\\$c \\"d\\""/)
  })
})
