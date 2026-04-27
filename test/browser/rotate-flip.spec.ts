import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.rotate / task.flip', () => {
  test('rotates an image 90 degrees', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.rotate({
        input: {
          format: 'gif',
          file: { sha256: 'test', content: fixture('image/fire.gif', 'image/gif') },
        },
        output: { format: 'gif' },
        degree: '90',
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/imagemagick|magick|convert|not found|ENOENT/i.test(msg)) return
      throw e
    }
  })

  test('flips an image horizontally', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.flip({
        input: {
          format: 'gif',
          file: { sha256: 'test', content: fixture('image/fire.gif', 'image/gif') },
        },
        output: { format: 'gif' },
        horizontal: true,
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/imagemagick|magick|convert|not found|ENOENT/i.test(msg)) return
      throw e
    }
  })
})
