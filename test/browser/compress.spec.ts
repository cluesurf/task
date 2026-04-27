import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.compress', () => {
  test('compresses an image', async ({ page }) => {
    const task = await openTask(page)
    const out = await task.compress({
      input: {
        format: 'jpg',
        file: { sha256: 'test', content: fixture('image/landscape.jpg', 'image/jpeg') },
      },
      output: { format: 'jpg' },
      quality: '60',
    })
    expect(out.size).toBeGreaterThan(0)
  })

  test('compresses a font to woff2', async ({ page }) => {
    const task = await openTask(page)
    const out = await task.compress({
      input: {
        format: 'ttf',
        file: { sha256: 'test', content: fixture('font/etch.ttf', 'font/ttf') },
      },
      output: { format: 'woff2' },
    })
    expect(out.size).toBeGreaterThan(0)
  })
})
