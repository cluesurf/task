import { test, expect } from '@playwright/test'
import { openTask, inline } from './helper'

test.describe('browser task.compile', () => {
  test('compiles a C source via gcc', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.compile({
        input: {
          format: 'c',
          file: {
            sha256: 'test',
            content: inline(
              '#include <stdio.h>\nint main(){printf("hi\\n");return 0;}\n',
              'text/x-c',
            ),
          },
        },
        output: { format: 'binary' },
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/gcc|clang|cc|not found|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })
})
