import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/compress')

describe('task.compress', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('compresses an image', async () => {
    const input = path.join(FIXTURES, 'image/landscape.jpg')
    const output = path.join(OUT, 'landscape.small.jpg')
    await task.compress({
      input: { file: { path: input } },
      output: { file: { path: output } },
      quality: '60',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('compresses a font to woff2', async () => {
    const input = path.join(FIXTURES, 'font/etch.ttf')
    const output = path.join(OUT, 'etch.woff2')
    await task.compress({
      input: { file: { path: input } },
      output: { file: { path: output } },
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })
})
