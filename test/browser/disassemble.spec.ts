import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.disassemble', () => {
  test('disassembles a minimal wasm to wat', async ({ page }) => {
    const task = await openTask(page)
    // Minimal wasm header (\0asm + version 1) crafted in-page so we
    // don't need a fixture file.
    const out = await page.evaluate(async () => {
      const minimal = new Uint8Array([
        0x00, 0x61, 0x73, 0x6d,
        0x01, 0x00, 0x00, 0x00,
      ])
      const blob = new Blob([minimal], { type: 'application/wasm' })
      const Task = (window as any).Task
      const t = new Task({ host: window.location.origin + '/v2' })
      const result = await t.disassemble({
        input: { format: 'wasm', file: { sha256: 'test', content: blob } },
        output: { format: 'wat' },
      })
      return { size: result?.file?.content?.size ?? 0 }
    })
    expect(out.size).toBeGreaterThan(0)
    void task
  })
})
