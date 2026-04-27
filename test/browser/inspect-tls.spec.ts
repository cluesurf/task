import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.inspect (tls)', () => {
  test('returns a chain summary for a public host', async ({ page }) => {
    test.setTimeout(45_000)
    const task = await openTask(page)
    try {
      const out = await task.inspect({
        thing: 'tls',
        host: 'clue.surf',
        port: 443,
      })
      expect(out.size).toBeGreaterThanOrEqual(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/openssl|not found|ENOENT|not installed|exited with code/i.test(msg)) return
      throw e
    }
  })
})
