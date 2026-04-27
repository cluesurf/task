import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.remove', () => {
  test('removes metadata from an image', async ({ page }) => {
    const task = await openTask(page)
    const out = await task.remove({
      input: {
        format: 'jpg',
        file: { sha256: 'test', content: fixture('image/landscape.jpg', 'image/jpeg') },
      },
      output: { format: 'jpg' },
    })
    expect(out.size).toBeGreaterThan(0)
  })
})
