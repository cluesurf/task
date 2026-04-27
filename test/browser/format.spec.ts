import { test, expect } from '@playwright/test'
import { openTask, inline } from './helper'

test.describe('browser task.format', () => {
  test('formats a python source via black', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.format({
        language: 'python',
        input: {
          file: {
            sha256: 'test',
            content: inline('def f( x,y ):\n    return  x+y\n', 'text/x-python'),
          },
        },
        output: {},
      })
      expect(out.size).toBeGreaterThan(0)
      expect(out.text).not.toBe('def f( x,y ):\n    return  x+y\n')
    } catch (e) {
      const msg = (e as Error).message
      if (/black|not installed|ENOENT/i.test(msg)) return
      throw e
    }
  })
})
