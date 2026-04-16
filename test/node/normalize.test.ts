import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/normalize')

describe('task.normalize', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('normalizes audio loudness', async () => {
    const input = path.join(FIXTURES, 'audio/piano.mp3')
    const output = path.join(OUT, 'piano.norm.mp3')
    await task.normalize({
      input: { file: { path: input } },
      output: { file: { path: output } },
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })
})
