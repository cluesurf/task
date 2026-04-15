/**
 * Pure argv builders for `task fetch`. Three backends (curl, wget,
 * aria2c) each emit a `{ bin, args }` shape that `./node.ts` hands
 * to `runCommandSequence` / `spawn`. Backend is picked from the
 * options — the user does not name the binary.
 *
 * Extracted from `./node.ts` as a step toward the four-branch
 * canonical pattern in `convert/image/imagemagick/{node,command}.ts`.
 */

import type { FetchNodeInput } from './shared'

const DEFAULT_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
]

export type FetchBackend = 'curl' | 'wget' | 'aria2c'

export type FetchCommand = {
  backend: FetchBackend
  bin: FetchBackend
  args: string[]
}

export function pickFetchBackend(input: FetchNodeInput): FetchBackend {
  const wantsMirror = input.mirror || input.recursive
  const wantsParallel = (input.concurrency ?? 1) > 1 && !wantsMirror
  return wantsMirror ? 'wget' : wantsParallel ? 'aria2c' : 'curl'
}

export function buildCommandToFetch(
  input: FetchNodeInput,
  urls: string[],
): FetchCommand {
  const backend = pickFetchBackend(input)
  const args =
    backend === 'wget'
      ? buildWgetArgs(input, urls)
      : backend === 'aria2c'
        ? buildAria2Args(input, urls)
        : buildCurlArgs(input, urls)
  return { backend, bin: backend, args }
}

export function buildCurlArgs(
  input: FetchNodeInput,
  urls: string[],
): string[] {
  const a: string[] = []
  a.push('--fail', '--location')
  if (input.retry != null) a.push('--retry', String(input.retry))
  else a.push('--retry', '3')
  if (input.timeout != null)
    a.push('--max-time', String(Math.ceil(input.timeout / 1000)))
  if (input.resume) a.push('--continue-at', '-')
  if (input.rate) a.push('--limit-rate', input.rate)
  if (input.auth) a.push('--user', input.auth)
  if (input.token) a.push('-H', `Authorization: Bearer ${input.token}`)
  if (input.cookie) a.push('--cookie', input.cookie)
  if (input.referer) a.push('--referer', input.referer)
  if (input.origin) a.push('-H', `Origin: ${input.origin}`)
  a.push('--user-agent', pickAgent(input))
  for (const h of input.header ?? []) a.push('-H', h)
  if (input.quiet) a.push('--silent', '--show-error')
  if (input.verbose) a.push('--verbose')

  if (input.pipe) {
    a.push('--output', '-')
  } else if (input.output && urls.length === 1) {
    a.push('--output', input.output)
  } else if (input.into) {
    a.push('--output-dir', input.into, '--remote-name-all')
  } else {
    a.push('--remote-name-all')
  }

  for (const u of urls) a.push(u)
  return a
}

export function buildWgetArgs(
  input: FetchNodeInput,
  urls: string[],
): string[] {
  const a: string[] = []
  if (input.mirror) a.push('--mirror')
  else if (input.recursive) a.push('--recursive')
  if (input.depth != null) a.push(`--level=${input.depth}`)
  if (input.retry != null) a.push(`--tries=${input.retry}`)
  if (input.timeout != null)
    a.push(`--timeout=${Math.ceil(input.timeout / 1000)}`)
  if (input.resume) a.push('--continue')
  if (input.rate) a.push(`--limit-rate=${input.rate}`)
  if (input.into) a.push('-P', input.into)
  if (input.auth) {
    const [user, pass = ''] = input.auth.split(':')
    a.push(`--user=${user}`, `--password=${pass}`)
  }
  if (input.token)
    a.push(`--header=Authorization: Bearer ${input.token}`)
  if (input.cookie) a.push(`--load-cookies=${input.cookie}`)
  if (input.referer) a.push(`--referer=${input.referer}`)
  a.push(`--user-agent=${pickAgent(input)}`)
  for (const h of input.header ?? []) a.push(`--header=${h}`)
  for (const pat of input.include ?? []) a.push(`--accept=${pat}`)
  for (const pat of input.exclude ?? []) a.push(`--reject=${pat}`)
  if (input.type) a.push(`--accept=${commaJoinTypes(input.type)}`)
  if (input.flatten) a.push('--no-directories')
  if (input.quiet) a.push('--quiet')
  if (input.verbose) a.push('--verbose')
  for (const u of urls) a.push(u)
  return a
}

export function buildAria2Args(
  input: FetchNodeInput,
  urls: string[],
): string[] {
  const a: string[] = []
  a.push(`--max-connection-per-server=${input.concurrency ?? 4}`)
  a.push(`--split=${input.concurrency ?? 4}`)
  if (input.retry != null) a.push(`--max-tries=${input.retry}`)
  if (input.timeout != null)
    a.push(`--timeout=${Math.ceil(input.timeout / 1000)}`)
  if (input.resume) a.push('--continue=true')
  if (input.rate)
    a.push(`--max-overall-download-limit=${input.rate}`)
  if (input.into) a.push(`--dir=${input.into}`)
  if (input.output && urls.length === 1)
    a.push(`--out=${input.output}`)
  if (input.auth) {
    const [user, pass = ''] = input.auth.split(':')
    a.push(`--http-user=${user}`, `--http-passwd=${pass}`)
  }
  if (input.token)
    a.push(`--header=Authorization: Bearer ${input.token}`)
  if (input.referer) a.push(`--referer=${input.referer}`)
  a.push(`--user-agent=${pickAgent(input)}`)
  for (const h of input.header ?? []) a.push(`--header=${h}`)
  if (input.quiet) a.push('--quiet=true')
  for (const u of urls) a.push(u)
  return a
}

function pickAgent(input: FetchNodeInput): string {
  if (input.agent) return input.agent
  if (input.randomAgent) {
    return DEFAULT_AGENTS[
      Math.floor(Math.random() * DEFAULT_AGENTS.length)
    ]!
  }
  return DEFAULT_AGENTS[0]!
}

function commaJoinTypes(types: string): string {
  return types
    .split(',')
    .map(t => t.trim().replace(/^\./, ''))
    .join(',')
}
