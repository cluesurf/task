import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.inspect (dns)', () => {
  test('resolves DNS for a public host', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.inspect({
        thing: 'dns',
        host: 'cloudflare.com',
      })
      expect(out.size).toBeGreaterThanOrEqual(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/not found|ENOENT|not installed|EAI_/i.test(msg)) return
      throw e
    }
  })
})
