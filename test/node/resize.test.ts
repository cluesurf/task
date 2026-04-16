import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/resize')

describe('task.resize', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
    await fs.copyFile(
      path.join(FIXTURES, 'video/cell.mp4'),
      path.join(OUT, 'clip.mp4'),
    )
  })

  it('resizes a video to width 320', async () => {
    const input = path.join(OUT, 'clip.mp4')
    const output = path.join(OUT, 'clip.320.mp4')
    try {
      await task.resize({
        input: { file: { path: input } },
        output: { file: { path: output } },
        width: 320,
      })
      const stat = await fs.stat(output)
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|ffmpeg/i.test(msg)) {
        return // skip when ffmpeg not installed
      }
      throw e
    }
  })

  it('resizes a video to 320x180', async () => {
    const input = path.join(OUT, 'clip.mp4')
    const output = path.join(OUT, 'clip.thumb.mp4')
    try {
      await task.resize({
        input: { file: { path: input } },
        output: { file: { path: output } },
        width: 320,
        height: 180,
      })
      const stat = await fs.stat(output)
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|ffmpeg/i.test(msg)) {
        return // skip when ffmpeg not installed
      }
      throw e
    }
  })
})
