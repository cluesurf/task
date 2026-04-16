import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/trim')

describe('task.trim', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('trims audio to 0-3s', async () => {
    const input = path.join(FIXTURES, 'audio/piano.mp3')
    const output = path.join(OUT, 'piano.trim.mp3')
    await task.trim({
      input: { file: { path: input } },
      output: { file: { path: output } },
      start: '0',
      end: '3',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('trims video to 0-2s', async () => {
    const input = path.join(FIXTURES, 'video/cell.mp4')
    const output = path.join(OUT, 'cell.trim.mp4')
    await task.trim({
      input: { file: { path: input } },
      output: { file: { path: output } },
      start: '0',
      end: '2',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })
})
