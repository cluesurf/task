/**
 * HTML resolver: turn `<url|file>` into a string of HTML.
 *
 * - file path  → fs.readFile
 * - URL        → fetch (default — fast, static HTML)
 * - URL + render→ puppeteer / playwright headless render
 *                  (needed for SPAs where tables hydrate in JS)
 */

import fs from 'node:fs/promises'

export type HtmlSource = {
  /** URL or file path. */
  input: string
  /** Render JS via headless browser before extracting. */
  render?: boolean
  /** Headless engine when --render is set. Default puppeteer. */
  engine?: 'puppeteer' | 'playwright'
  /** ms to wait after page load before reading the DOM. */
  waitMs?: number
  /** CSS selector to wait for (overrides waitMs when set). */
  waitFor?: string
  /** User-agent override. */
  userAgent?: string
}

export async function resolveHtml(src: HtmlSource): Promise<string> {
  if (!isUrl(src.input)) {
    return await fs.readFile(src.input, 'utf8')
  }
  if (src.render) {
    return await renderUrl(src)
  }
  return await fetchStatic(src)
}

function isUrl(s: string): boolean {
  return /^https?:\/\//i.test(s)
}

async function fetchStatic(src: HtmlSource): Promise<string> {
  const res = await fetch(src.input, {
    headers: src.userAgent ? { 'user-agent': src.userAgent } : undefined,
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`fetch ${src.input} → ${res.status}`)
  return await res.text()
}

async function renderUrl(src: HtmlSource): Promise<string> {
  const engine = src.engine ?? 'puppeteer'
  if (engine === 'playwright') return await renderPlaywright(src)
  return await renderPuppeteer(src)
}

async function renderPuppeteer(src: HtmlSource): Promise<string> {
  // Lazy import — puppeteer pulls Chromium on first use, so we
  // only load it when --render is actually requested.
  const puppeteer = (await import('puppeteer' as string).catch(() => null)) as
    | { launch: (opts?: unknown) => Promise<unknown> }
    | null
  if (!puppeteer) {
    throw new Error('parse html --render: puppeteer not installed. Run `pnpm add puppeteer`.')
  }
  const browser = (await puppeteer.launch({ headless: 'new' } as unknown)) as {
    newPage: () => Promise<{
      setUserAgent: (ua: string) => Promise<void>
      goto: (url: string, opts?: unknown) => Promise<unknown>
      waitForSelector: (sel: string, opts?: unknown) => Promise<unknown>
      waitForTimeout?: (ms: number) => Promise<void>
      content: () => Promise<string>
    }>
    close: () => Promise<void>
  }
  try {
    const page = await browser.newPage()
    if (src.userAgent) await page.setUserAgent(src.userAgent)
    await page.goto(src.input, { waitUntil: 'networkidle2' })
    if (src.waitFor) await page.waitForSelector(src.waitFor, { timeout: 30_000 })
    else if (src.waitMs) await new Promise(r => setTimeout(r, src.waitMs))
    return await page.content()
  } finally {
    await browser.close()
  }
}

async function renderPlaywright(src: HtmlSource): Promise<string> {
  const pw = (await import('playwright' as string).catch(() => null)) as
    | { chromium: { launch: (opts?: unknown) => Promise<unknown> } }
    | null
  if (!pw) {
    throw new Error('parse html --render --engine playwright: playwright not installed. Run `pnpm add playwright`.')
  }
  const browser = (await pw.chromium.launch({ headless: true } as unknown)) as {
    newPage: (opts?: unknown) => Promise<{
      goto: (url: string, opts?: unknown) => Promise<unknown>
      waitForSelector: (sel: string, opts?: unknown) => Promise<unknown>
      waitForTimeout: (ms: number) => Promise<void>
      content: () => Promise<string>
    }>
    close: () => Promise<void>
  }
  try {
    const page = await browser.newPage({ userAgent: src.userAgent })
    await page.goto(src.input, { waitUntil: 'networkidle' })
    if (src.waitFor) await page.waitForSelector(src.waitFor, { timeout: 30_000 })
    else if (src.waitMs) await page.waitForTimeout(src.waitMs)
    return await page.content()
  } finally {
    await browser.close()
  }
}
