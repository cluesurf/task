/**
 * Shared helpers for the playwright browser specs.
 *
 * Goal: each spec reads like its node counterpart —
 *
 *   const task = await openTask(page)
 *   const out = await task.convert({
 *     input:  { format: 'jpg', file: fixture('image/landscape.jpg') },
 *     output: { format: 'png' },
 *   })
 *   expect(out.size).toBeGreaterThan(0)
 *
 * Under the hood, each `task.<verb>(input)` call is
 * serialized, shipped into the browser page via
 * `page.evaluate`, and run against the bundled Task class
 * there. Fixture refs (`fixture(rel, mime?)`) become
 * `Blob`s built from `fetch('/fixture/...')` in-page —
 * fixture bytes never travel through playwright's worker
 * channel (an 18 MB audio fixture explodes the V8 heap
 * if shipped as a JSON-safe number array).
 */

import { Page } from '@playwright/test'
import path from 'node:path'

export const FIXTURES_ROOT = path.resolve(
  __dirname,
  '../../../seed-base/base',
)

const FIXTURE_TAG = '__task_fixture__'
const INLINE_TAG = '__task_inline__'

export type FixtureRef = {
  [FIXTURE_TAG]: true
  rel: string
  mime?: string
}

export type InlineRef = {
  [INLINE_TAG]: true
  text: string
  mime?: string
}

/** Marker for a fixture file path; resolved to a Blob inside the page via `/fixture/<rel>`. */
export function fixture(rel: string, mime?: string): FixtureRef {
  return { [FIXTURE_TAG]: true, rel, mime }
}

/** Marker for inline text content; resolved to a `new Blob([text])` inside the page. */
export function inline(text: string, mime?: string): InlineRef {
  return { [INLINE_TAG]: true, text, mime }
}

export type VerbResult = {
  size: number
  mime: string
  /** Populated when output is small (<= 64 KiB) so specs can assert on text. */
  text?: string
}

export type BrowserTaskProxy = {
  [verb: string]: (input: unknown) => Promise<VerbResult>
}

/**
 * Open the page and return a `task` proxy. Each method
 * call (`task.convert(...)`, `task.compress(...)`, etc.)
 * runs inside the browser against the bundled Task class.
 *
 * This is `async` because it has to navigate the page and
 * wait for the bundle to attach `Task` to `window`. The
 * resolved value is a Proxy whose `then` is intentionally
 * undefined so `await openTask(page)` doesn't chain into
 * the proxy itself.
 */
export async function openTask(page: Page): Promise<BrowserTaskProxy> {
  await page.goto('/')
  await page.waitForFunction(() => (window as any).Task !== undefined)

  return new Proxy({} as BrowserTaskProxy, {
    get: (_target, prop) => {
      // Ignore lookups for thenable / Symbol / inspect noise so
      // `await openTask(...)` doesn't see a fake `.then` and try
      // to chain it.
      if (typeof prop !== 'string') return undefined
      if (prop === 'then' || prop === 'catch' || prop === 'finally') {
        return undefined
      }
      const verb = prop
      return async (input: unknown) => runVerb(page, verb, input)
    },
  })
}

async function runVerb(
  page: Page,
  verb: string,
  input: unknown,
): Promise<VerbResult> {
  const serialized = JSON.stringify(input ?? null)
  if (typeof serialized !== 'string') {
    throw new Error(
      `runVerb: input did not serialize (verb=${verb}, type=${typeof input})`,
    )
  }
  return page.evaluate(
    async ({
      verb,
      serialized,
      fixtureTag,
      inlineTag,
    }: {
      verb: string
      serialized: string
      fixtureTag: string
      inlineTag: string
    }) => {
      const reviver = async (value: unknown): Promise<unknown> => {
        if (
          value &&
          typeof value === 'object' &&
          (value as Record<string, unknown>)[fixtureTag]
        ) {
          const ref = value as { rel: string; mime?: string }
          const r = await fetch(`/fixture/${ref.rel}`)
          if (!r.ok) throw new Error(`fixture ${ref.rel}: ${r.status}`)
          const buf = await r.arrayBuffer()
          return new Blob([buf], {
            type: ref.mime ?? 'application/octet-stream',
          })
        }
        if (
          value &&
          typeof value === 'object' &&
          (value as Record<string, unknown>)[inlineTag]
        ) {
          const ref = value as { text: string; mime?: string }
          return new Blob([ref.text], { type: ref.mime ?? 'text/plain' })
        }
        if (Array.isArray(value)) return Promise.all(value.map(reviver))
        if (value && typeof value === 'object') {
          const out: Record<string, unknown> = {}
          for (const [k, v] of Object.entries(value))
            out[k] = await reviver(v)
          return out
        }
        return value
      }
      const input = await reviver(JSON.parse(serialized))
      const Task = (window as unknown as { Task: unknown }).Task as new (
        o: { host: string },
      ) => Record<string, (i: unknown) => Promise<unknown>>
      const task = new Task({ host: window.location.origin + '/v2' })
      const out = (await task[verb]!(input)) as
        | { file?: { content?: Blob } }
        | undefined
      const content = out?.file?.content
      let text: string | undefined
      if (content && content.size <= 64 * 1024) text = await content.text()
      return {
        size: content?.size ?? 0,
        mime: content?.type ?? '',
        text,
      }
    },
    {
      verb,
      serialized,
      fixtureTag: FIXTURE_TAG,
      inlineTag: INLINE_TAG,
    },
  )
}
