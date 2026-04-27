import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.inspect', () => {
  test('inspects an image', async ({ page }) => {
    const task = await openTask(page)
    const out = await task.inspect({
      input: { file: { sha256: 'test', content: fixture('image/landscape.jpg', 'image/jpeg') } },
    })
    expect(out.size).toBeGreaterThanOrEqual(0)
  })
})
