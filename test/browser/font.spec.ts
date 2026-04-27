import { test, expect } from '@playwright/test'
import { openTask, fixture } from './helper'

test.describe('browser task font verbs', () => {
  test('subsets a font', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.subset({
        input: {
          format: 'ttf',
          file: { sha256: 'test', content: fixture('font/etch.ttf', 'font/ttf') },
        },
        output: { format: 'ttf' },
        unicodes: 'U+0041-005A',
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/pyftsubset|fonttools|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })

  test('shapes a font glyph', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.shape({
        input: {
          format: 'ttf',
          file: { sha256: 'test', content: fixture('font/etch.ttf', 'font/ttf') },
        },
        output: { format: 'json' },
        text: 'Aa',
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/hb-shape|harfbuzz|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })

  test('renders a font sample', async ({ page }) => {
    const task = await openTask(page)
    try {
      const out = await task.render({
        input: {
          format: 'ttf',
          file: { sha256: 'test', content: fixture('font/etch.ttf', 'font/ttf') },
        },
        output: { format: 'png' },
        text: 'Hi',
      })
      expect(out.size).toBeGreaterThan(0)
    } catch (e) {
      const msg = (e as Error).message
      if (/freetype|hb-view|ImageMagick|ENOENT|not installed/i.test(msg)) return
      throw e
    }
  })
})
