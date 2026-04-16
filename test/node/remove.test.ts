import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/remove')

describe('task.remove', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
    await fs.copyFile(
      path.join(FIXTURES, 'image/landscape.jpg'),
      path.join(OUT, 'pic.jpg'),
    )
    await fs.copyFile(
      path.join(FIXTURES, 'audio/piano.mp3'),
      path.join(OUT, 'song.mp3'),
    )
  })

  it('removes metadata from an image', async () => {
    const input = path.join(OUT, 'pic.jpg')
    await task.remove({
      input: { file: { path: input } },
    })
    const stat = await fs.stat(input)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('removes metadata from audio', async () => {
    const input = path.join(OUT, 'song.mp3')
    await task.remove({
      input: { file: { path: input } },
    })
    const stat = await fs.stat(input)
    expect(stat.size).toBeGreaterThan(0)
  })
})
