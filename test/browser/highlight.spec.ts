import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task.highlight', () => {
  test('highlights a pdf', async ({ page }) => {
    const task = await openTask(page)
    const out = await task.highlight({
      input: { file: { sha256: 'test', content: fixture('document/magic.pdf', 'application/pdf') } },
      output: {},
      text: 'important',
    })
    expect(out.size).toBeGreaterThan(0)
  })
})
