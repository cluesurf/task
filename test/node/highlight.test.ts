import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/highlight')

describe('task.highlight', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('highlights a pdf with positional input', async () => {
    const input = path.join(FIXTURES, 'document/magic.pdf')
    const output = path.join(OUT, 'doc.pos.pdf')
    await task.highlight({
      input: { file: { path: input } },
      output: { file: { path: output } },
      text: 'important',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('highlights a pdf with explicit input/output', async () => {
    const input = path.join(FIXTURES, 'document/magic.pdf')
    const output = path.join(OUT, 'doc.exp.pdf')
    await task.highlight({
      input: { file: { path: input } },
      output: { file: { path: output } },
      text: 'critical',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })
})
