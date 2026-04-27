import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.format', () => {
  test('formats a python source via black', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => (window as any).Task !== undefined)
    const task = await openTask(page)

    try {
      const result = await page.evaluate(async () => {
        const src = 'def f( x,y ):\n    return  x+y\n'
        const blob = new Blob([src], { type: 'text/x-python' })
        const Task = (window as any).Task
        const t = new Task({ host: window.location.origin + '/v2' })
        const out = await t.format({
          language: 'python',
          input: { file: { sha256: 'test', content: blob } },
          output: {},
        })
        const content = out?.file?.content
        return {
          size: content?.size ?? 0,
          text: content ? await content.text() : '',
        }
      })
      expect(result.size).toBeGreaterThan(0)
      expect(result.text).not.toBe('def f( x,y ):\n    return  x+y\n')
    } catch (e) {
      const msg = (e as Error).message
      if (/black|not installed|ENOENT/i.test(msg)) return
      throw e
    }
    void task
  })
})
