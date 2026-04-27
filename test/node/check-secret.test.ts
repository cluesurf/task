import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { checkSecretNode } from '~/code/call/check/secret/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/check-secret')

describe('check secret', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('returns an empty list when the file is missing', async () => {
    const r = await checkSecretNode({
      storePath: path.join(OUT, 'missing.env'),
    })
    expect(r.entries).toEqual([])
  })

  it('lists every key with redacted lengths by default', async () => {
    const file = path.join(OUT, 'sample.env')
    await fs.writeFile(
      file,
      [
        '# comment',
        'API_KEY=abcdef12',
        'EMPTY=',
        'QUOTED="hello world"',
        'WITH_HASH=safe',
        '',
        'TRAILING=ok',
      ].join('\n'),
    )
    const r = await checkSecretNode({ storePath: file })
    const keys = r.entries.map(e => e.key)
    expect(keys).toEqual(['API_KEY', 'EMPTY', 'QUOTED', 'WITH_HASH', 'TRAILING'])
    expect(r.entries.every(e => e.value === undefined)).toBe(true)
    expect(r.entries.find(e => e.key === 'API_KEY')!.length).toBe(8)
    expect(r.entries.find(e => e.key === 'QUOTED')!.length).toBe(11) // "hello world" = 11
    expect(r.entries.find(e => e.key === 'EMPTY')!.length).toBe(0)
  })

  it('reveals values when redact=false', async () => {
    const file = path.join(OUT, 'reveal.env')
    await fs.writeFile(file, 'TOKEN=plain-value\n')
    const r = await checkSecretNode({ storePath: file, redact: false })
    expect(r.entries[0]!.value).toBe('plain-value')
  })

  it('attaches the file mtime as lastSet for every entry', async () => {
    const file = path.join(OUT, 'mtime.env')
    await fs.writeFile(file, 'A=1\nB=2\n')
    const r = await checkSecretNode({ storePath: file })
    for (const e of r.entries) {
      expect(e.lastSet).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    }
  })
})
