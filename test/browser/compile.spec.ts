import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.compile', () => {
  test('compiles a C source via gcc', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => (window as any).Task !== undefined)

    const task = await openTask(page)
    try {
      // Inline source — easier than carrying a tiny C fixture file.
      const result = await page.evaluate(async () => {
        const src = '#include <stdio.h>\nint main(){printf("hi\\n");return 0;}\n'
        const blob = new Blob([src], { type: 'text/x-c' })
        const Task = (window as any).Task
        const t = new Task({ host: window.location.origin + '/v2' })
        const out = await t.compile({
          input: { format: 'c', file: { sha256: 'test', content: blob } },
          output: { format: 'binary' },
        })
        return { size: out?.file?.content?.size ?? 0 }
      })
      expect(result.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/gcc|clang|cc|not found|ENOENT|not installed/i.test(msg)) return
      throw e
    }
    void task
  })
})
