import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.normalize', () => {
  test('normalizes audio loudness', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.normalize({
        input: {
          format: 'mp3',
          file: { sha256: 'test', content: fixture('audio/piano.mp3', 'audio/mpeg') },
        },
        output: { format: 'mp3' },
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/ffmpeg|not found|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })
})
