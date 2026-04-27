/**
 * Browser-side `task.convert` round-trip.
 *
 * Loads the bundled browser surface in a real Chromium page,
 * uploads a fixture image as a Blob, and asserts the round
 * trip lands a non-empty Blob back. The fastify webServer
 * (configured in playwright.config.ts) proxies the request
 * into the Node implementation, so a green run proves:
 *
 *   1. `Task` browser API → multipart POST shape is correct
 *   2. fastify route → `convertNode` dispatch works
 *   3. work polling + file fetch returns the produced bytes
 *
 * Bundle prerequisite: run `pnpm scan:test` (or
 * `pnpm make:test`) once so `host/test.browser.js` exists.
 * The page references it via `<script src="/host/...">`.
 */

import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')

test.describe('browser task.convert', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => (window as any).Task !== undefined)
  })

  test('jpg → png via remote fastify host', async ({ page }) => {
    const file = path.join(FIXTURES, 'image/landscape.jpg')
    const bytes = Array.from(await fs.readFile(file))

    const result = await page.evaluate(async (input: number[]) => {
      const blob = new Blob([new Uint8Array(input)], {
        type: 'image/jpeg',
      })
      const Task = (window as any).Task
      const task = new Task({ host: window.location.origin + '/v2' })
      const out = await task.convert({
        input: {
          format: 'jpg',
          file: { sha256: 'test', content: blob },
        },
        output: { format: 'png' },
      })
      return {
        isBlob: out?.file?.content instanceof Blob,
        size: out?.file?.content?.size ?? 0,
      }
    }, bytes)

    expect(result.isBlob).toBe(true)
    expect(result.size).toBeGreaterThan(0)
  })
})
