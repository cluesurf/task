/**
 * Cross-env types + type-guard for `task fetch`. Hoisted out of
 * `./node.ts` so `./command.ts` can share the shape without
 * importing Node-only code.
 */

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

export function testFetchNode(input: unknown): input is FetchNodeInput {
  if (input == null || typeof input !== 'object') return false
  const urls = (input as { urls?: unknown }).urls
  return (
    Array.isArray(urls) && urls.every(u => typeof u === 'string')
  )
}
