import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import {
  parseEntityNode,
} from '~/code/call/parse/entity/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/parse-entity')

describe('parse entity', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('extracts emails from inline text', async () => {
    const r = await parseEntityNode({
      input: { text: 'reach me at me@example.com or boss@example.org' },
      kinds: ['email'],
    })
    expect(r.matches.map(m => m.value)).toEqual([
      'me@example.com',
      'boss@example.org',
    ])
  })

  it('extracts urls', async () => {
    const r = await parseEntityNode({
      input: {
        text:
          'see https://clue.surf and http://example.com/path?q=1 for details',
      },
      kinds: ['url'],
    })
    expect(r.matches.map(m => m.value)).toEqual([
      'https://clue.surf',
      'http://example.com/path?q=1',
    ])
  })

  it('extracts IP addresses', async () => {
    const r = await parseEntityNode({
      input: { text: 'allow 10.0.0.1 and 2001:db8::1 but not 999.999.999.999' },
      kinds: ['ip'],
    })
    const values = r.matches.map(m => m.value)
    expect(values).toContain('10.0.0.1')
    expect(values).toContain('2001:db8::1')
    expect(values).not.toContain('999.999.999.999')
  })

  it('Luhn-validates credit cards', async () => {
    const valid = '4242 4242 4242 4242' // Stripe test card, passes Luhn
    const invalid = '1234 5678 9012 3456' // doesn't pass Luhn
    const r = await parseEntityNode({
      input: { text: `${valid} and ${invalid}` },
      kinds: ['cc'],
    })
    expect(r.matches.map(m => m.value)).toContain(valid)
    expect(r.matches.map(m => m.value)).not.toContain(invalid)
  })

  it('extracts UUIDs', async () => {
    const r = await parseEntityNode({
      input: { text: 'order 550e8400-e29b-41d4-a716-446655440000 created' },
      kinds: ['uuid'],
    })
    expect(r.matches[0]?.value).toBe('550e8400-e29b-41d4-a716-446655440000')
  })

  it('deduplicates by default', async () => {
    const r = await parseEntityNode({
      input: { text: 'a@x.com and a@x.com again' },
      kinds: ['email'],
    })
    expect(r.matches).toHaveLength(1)
  })

  it('keeps duplicates when unique=false', async () => {
    const r = await parseEntityNode({
      input: { text: 'a@x.com and a@x.com again' },
      kinds: ['email'],
      unique: false,
    })
    expect(r.matches).toHaveLength(2)
  })

  it('extracts every kind by default and orders by start offset', async () => {
    const r = await parseEntityNode({
      input: {
        text: 'email me@x.com see https://x.com from 10.0.0.1',
      },
    })
    const offsets = r.matches.map(m => m.start)
    const sorted = [...offsets].sort((a, b) => a - b)
    expect(offsets).toEqual(sorted)
  })

  it('reads from a file when input.file.path is given', async () => {
    const file = path.join(OUT, 'sample.txt')
    await fs.writeFile(file, 'reach a@x.com or visit https://example.com')
    const r = await parseEntityNode({
      input: { file: { path: file } },
    })
    const values = r.matches.map(m => m.value)
    expect(values).toContain('a@x.com')
    expect(values).toContain('https://example.com')
  })

  it('writes a JSON report when output.file.path is given', async () => {
    const out = path.join(OUT, 'report.json')
    await parseEntityNode({
      input: { text: 'me@example.com' },
      output: { file: { path: out } },
    })
    const parsed = JSON.parse(await fs.readFile(out, 'utf8'))
    expect(parsed.matches[0].value).toBe('me@example.com')
  })

  it('rejects when neither file nor text is given', async () => {
    await expect(async () =>
      parseEntityNode({ input: {} as never }),
    ).rejects.toThrow(/file|text/)
  })
})
