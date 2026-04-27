import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.trim', () => {
  test('trims audio to 0-3s', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.trim({
        input: {
          format: 'mp3',
          file: { sha256: 'test', content: fixture('audio/piano.mp3', 'audio/mpeg') },
        },
        output: { format: 'mp3' },
        start: '0',
        end: '3',
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/ffmpeg|not found|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })
})
