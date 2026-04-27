import { test, expect } from '@playwright/test'
import { openTask } from './helper'

test.describe('browser task.disassemble', () => {
  test('disassembles a minimal wasm to wat', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => (window as any).Task !== undefined)

    // The minimal wasm header (\0asm + version 1) is built directly
    // in-page so we don't need a fixture file.
    const task = await openTask(page)
    const result = await page.evaluate(async () => {
      const minimal = new Uint8Array([
        0x00, 0x61, 0x73, 0x6d,
        0x01, 0x00, 0x00, 0x00,
      ])
      const blob = new Blob([minimal], { type: 'application/wasm' })
      const Task = (window as any).Task
      const t = new Task({ host: window.location.origin + '/v2' })
      const out = await t.disassemble({
        input: { format: 'wasm', file: { sha256: 'test', content: blob } },
        output: { format: 'wat' },
      })
      return { size: out?.file?.content?.size ?? 0 }
    })
    expect(result.size).toBeGreaterThan(0)
    void task
  })
})
