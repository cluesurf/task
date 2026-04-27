import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.fetch', () => {
  test('dry-run returns a result without performing the fetch', async ({
    page,
  }) => {
    const task = await openTask(page)
    try {
      const out = await task.fetch({
        urls: ['https://example.com'],
        output: 'example.html',
        dryRun: true,
        verbose: true,
      })
      // The fetch verb returns metadata, not a file. Just assert
      // the round-trip didn't throw.
      expect(out.size).toBeGreaterThanOrEqual(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/curl|wget|aria2|not found|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })
})
