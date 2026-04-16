import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/inspect')

describe('task.inspect', () => {
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
    await fs.copyFile(
      path.join(FIXTURES, 'video/cell.mp4'),
      path.join(OUT, 'clip.mp4'),
    )
    await fs.copyFile(
      path.join(FIXTURES, 'font/etch.ttf'),
      path.join(OUT, 'fnt.ttf'),
    )
    await fs.writeFile(path.join(OUT, 'plain.txt'), 'hello\nworld\n')
  })

  it('inspects an image', async () => {
    const result = await task.inspect({
      input: { file: { path: path.join(OUT, 'pic.jpg') } },
    })
    expect(result).toBeDefined()
  })

  it('inspects audio', async () => {
    const result = await task.inspect({
      input: { file: { path: path.join(OUT, 'song.mp3') } },
    })
    expect(result).toBeDefined()
  })

  it('inspects video', async () => {
    const result = await task.inspect({
      input: { file: { path: path.join(OUT, 'clip.mp4') } },
    })
    expect(result).toBeDefined()
  })

  it('inspects a font', async () => {
    const result = await task.inspect({
      input: { file: { path: path.join(OUT, 'fnt.ttf') } },
    })
    expect(result).toBeDefined()
  })

  it('inspects plain text', async () => {
    const result = await task.inspect({
      input: { file: { path: path.join(OUT, 'plain.txt') } },
    })
    expect(result).toBeDefined()
  })
})
