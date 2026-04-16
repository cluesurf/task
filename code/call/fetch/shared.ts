/**
 * Cross-env types + type-guard for `task fetch`. Hoisted out of
 * `./node.ts` so `./command.ts` can share the shape without
 * importing Node-only code.
 *
 * `testFetchNode` and `parseFetchNode` are defensive guards for
 * the case where `fetch` is called from an untrusted surface
 * (queued job, HTTP endpoint). They reject shell-escapable
 * strings, malformed URLs, and out-of-range numeric flags — see
 * `code/tool/shared/sanitize.ts`.
 */

import {
  sanitizeBool,
  sanitizeInt,
  sanitizeString,
  sanitizeStringArray,
  sanitizeUrl,
  unwrap,
  type SanitizeResult,
} from '~/code/tool/shared/sanitize'

export type FetchNodeInput = {
  urls: string[]
  output?: string
  into?: string
  name?: string
  recursive?: boolean
  depth?: number
  mirror?: boolean
  include?: string[]
  exclude?: string[]
  retry?: number
  timeout?: number
  resume?: boolean
  rate?: string
  concurrency?: number
  header?: string[]
  cookie?: string
  auth?: string
  token?: string
  agent?: string
  randomAgent?: boolean
  referer?: string
  origin?: string
  type?: string
  size?: string
  match?: string
  extract?: boolean
  format?: string
  pipe?: boolean
  sync?: boolean
  flatten?: boolean
  index?: boolean
  dryRun?: boolean
  verbose?: boolean
  quiet?: boolean
}

export type FetchNodeOutput = {
  files: Array<{
    url: string
    path?: string
    bytes?: number
    status: 'ok' | 'fail' | 'skipped'
  }>
}

export function testFetchNode(
  input: unknown,
): input is FetchNodeInput {
  return parseFetchNodeLoose(input).ok
}

/** Parse and sanitize a fetch input. Throws on any rejection.
 * Use this at the entry of `fetchNode` when invoked from
 * untrusted surfaces. */

export function parseFetchNode(input: unknown): FetchNodeInput {
  return unwrap(parseFetchNodeLoose(input), 'fetch')
}

function parseFetchNodeLoose(
  input: unknown,
): SanitizeResult<FetchNodeInput> {
  if (input == null || typeof input !== 'object') {
    return { ok: false, reason: 'input: not an object' }
  }
  const raw = input as Record<string, unknown>

  const urls = sanitizeStringArray(raw.urls, {
    field: 'urls',
    maxItems: 1024,
  })
  if (!urls.ok) return urls
  for (let i = 0; i < urls.value.length; i++) {
    const u = sanitizeUrl(urls.value[i], {
      field: `urls[${i}]`,
      schemes: ['http', 'https', 'ftp', 'ftps'],
    })
    if (!u.ok) return u
  }

  const out: FetchNodeInput = { urls: urls.value }

  for (const field of [
    'output',
    'into',
    'name',
    'rate',
    'cookie',
    'auth',
    'token',
    'agent',
    'referer',
    'origin',
    'type',
    'size',
    'match',
    'format',
  ] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeString(raw[field], { field })
    if (!r.ok) return r
    ;(out as Record<string, unknown>)[field] = r.value
  }

  if (raw.header !== undefined) {
    const r = sanitizeStringArray(raw.header, {
      field: 'header',
      maxItems: 64,
    })
    if (!r.ok) return r
    out.header = r.value
  }
  for (const field of ['include', 'exclude'] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeStringArray(raw[field], {
      field,
      maxItems: 128,
    })
    if (!r.ok) return r
    out[field] = r.value
  }

  for (const field of [
    'recursive',
    'mirror',
    'resume',
    'randomAgent',
    'extract',
    'pipe',
    'sync',
    'flatten',
    'index',
    'dryRun',
    'verbose',
    'quiet',
  ] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeBool(raw[field], { field })
    if (!r.ok) return r
    ;(out as Record<string, unknown>)[field] = r.value
  }

  for (const [field, range] of [
    ['depth', [0, 64]],
    ['retry', [0, 100]],
    ['timeout', [0, 24 * 60 * 60 * 1000]],
    ['concurrency', [1, 64]],
  ] as const) {
    if (raw[field] === undefined) continue
    const r = sanitizeInt(raw[field], {
      field,
      lo: range[0],
      hi: range[1],
    })
    if (!r.ok) return r
    ;(out as Record<string, unknown>)[field] = r.value
  }

  return { ok: true, value: out }
}
