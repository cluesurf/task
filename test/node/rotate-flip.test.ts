import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/rotate-flip')

describe('task.rotate + task.flip', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('rotates an image 90 degrees', async () => {
    const input = path.join(FIXTURES, 'image/fire.gif')
    const output = path.join(OUT, 'fire.rot.gif')
    await task.rotate({
      input: { file: { path: input } },
      output: { file: { path: output } },
      degree: '90',
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('flips an image horizontally', async () => {
    const input = path.join(FIXTURES, 'image/fire.gif')
    const output = path.join(OUT, 'fire.flip.gif')
    await task.flip({
      input: { file: { path: input } },
      output: { file: { path: output } },
      horizontal: true,
    })
    const stat = await fs.stat(output)
    expect(stat.size).toBeGreaterThan(0)
  })
})
