import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/font')

describe('task font verbs', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
    await fs.copyFile(
      path.join(FIXTURES, 'font/etch.ttf'),
      path.join(OUT, 'fnt.ttf'),
    )
  })

  it('subsets a font', async () => {
    const input = path.join(OUT, 'fnt.ttf')
    const output = path.join(OUT, 'fnt.min.ttf')
    await task.subset({
      input: { file: { path: input } },
      output: { file: { path: output } },
      text: 'Hello world',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
    expect(stat.size).toBeLessThan(
      (await fs.stat(input)).size,
    )
  })

  it('shapes text with hb-shape', async () => {
    const input = path.join(OUT, 'fnt.ttf')
    const result = await task.shape({
      input: { file: { path: input } },
      text: 'office',
    })
    const out = result as { glyphs?: string }
    expect(out).toBeDefined()
    expect(out.glyphs).toBeDefined()
  })
})
