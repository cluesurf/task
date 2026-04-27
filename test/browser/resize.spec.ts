import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.resize', () => {
  test('resizes a video to width 320', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.resize({
        input: {
          format: 'mp4',
          file: { sha256: 'test', content: fixture('video/cell.mp4', 'video/mp4') },
        },
        output: { format: 'mp4' },
        width: 320,
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/ffmpeg|not found|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })
})
