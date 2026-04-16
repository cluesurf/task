import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/convert')

describe('task.convert', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('converts jpg → png via imagemagick', async () => {
    const input = path.join(FIXTURES, 'image/landscape.jpg')
    const output = path.join(OUT, 'landscape.png')
    await task.convert({
      input: { format: 'jpg', file: { path: input } },
      output: { format: 'png', file: { path: output } },
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('converts wav → mp3 via ffmpeg', async () => {
    const input = path.join(FIXTURES, 'audio/guitar.wav')
    const output = path.join(OUT, 'guitar.mp3')
    await task.convert({
      input: { format: 'wav', file: { path: input } },
      output: { format: 'mp3', file: { path: output } },
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })
})
