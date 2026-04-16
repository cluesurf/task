import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/text')

describe('task.text', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('converts CRLF to LF', async () => {
    const file = path.join(OUT, 'crlf.txt')
    await fs.writeFile(file, 'a\r\nb\r\nc\r\n')
    await task.set({ eol: 'lf', file })
    const content = await fs.readFile(file, 'utf8')
    expect(content).not.toContain('\r')
    expect(content).toBe('a\nb\nc\n')
  })

  it('converts LF to CRLF', async () => {
    const file = path.join(OUT, 'lf.txt')
    await fs.writeFile(file, 'x\ny\n')
    await task.set({ eol: 'crlf', file })
    const content = await fs.readFile(file, 'utf8')
    expect(content).toContain('\r\n')
    expect(content).toBe('x\r\ny\r\n')
  })

  it('preserves content through round-trip', async () => {
    const file = path.join(OUT, 'roundtrip.txt')
    await fs.writeFile(file, 'one\ntwo\nthree\n')
    await task.set({ eol: 'crlf', file })
    await task.set({ eol: 'lf', file })
    const content = await fs.readFile(file, 'utf8')
    expect(content).toBe('one\ntwo\nthree\n')
  })
})
