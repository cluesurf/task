/**
 * `task fetch` — a `wget` / `curl` abstraction with opinionated
 * defaults. Shells out to `curl` for single-file fetches, to `wget`
 * for mirror / recursive, and to `aria2c` when the user asks for
 * parallel (`--concurrency > 1`). Each backend is selected from the
 * options — the user does not pick the binary.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

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
  files: Array<{ url: string; path?: string; bytes?: number; status: 'ok' | 'fail' | 'skipped' }>
}

const DEFAULT_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
]

export async function fetchNode(
  input: FetchNodeInput,
): Promise<FetchNodeOutput> {
  const urls = input.urls ?? []
  if (urls.length === 0) {
    throw new Error('fetch: at least one URL required')
  }

  const wantsMirror = input.mirror || input.recursive
  const wantsParallel = (input.concurrency ?? 1) > 1 && !wantsMirror
  const backend = wantsMirror ? 'wget' : wantsParallel ? 'aria2c' : 'curl'

  const args = backend === 'wget'
    ? buildWgetArgs(input, urls)
    : backend === 'aria2c'
      ? buildAria2Args(input, urls)
      : buildCurlArgs(input, urls)

  if (input.dryRun) {
    process.stdout.write(`${backend} ${args.map(quote).join(' ')}\n`)
    return { files: urls.map(u => ({ url: u, status: 'skipped' })) }
  }

  if (input.into) {
    await fs.mkdir(input.into, { recursive: true })
  }

  await runProcess(backend, args, { quiet: input.quiet, pipe: input.pipe })

  return {
    files: urls.map(u => ({
      url: u,
      path: resolveLikelyPath(u, input),
      status: 'ok',
    })),
  }
}

function buildCurlArgs(input: FetchNodeInput, urls: string[]): string[] {
  const a: string[] = []
  a.push('--fail', '--location')
  if (input.retry != null) a.push('--retry', String(input.retry))
  else a.push('--retry', '3')
  if (input.timeout != null) a.push('--max-time', String(Math.ceil(input.timeout / 1000)))
  if (input.resume) a.push('--continue-at', '-')
  if (input.rate) a.push('--limit-rate', input.rate)
  if (input.auth) a.push('--user', input.auth)
  if (input.token) a.push('-H', `Authorization: Bearer ${input.token}`)
  if (input.cookie) {
    a.push('--cookie', input.cookie)
  }
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

function buildWgetArgs(input: FetchNodeInput, urls: string[]): string[] {
  const a: string[] = []
  if (input.mirror) a.push('--mirror')
  else if (input.recursive) a.push('--recursive')
  if (input.depth != null) a.push(`--level=${input.depth}`)
  if (input.retry != null) a.push(`--tries=${input.retry}`)
  if (input.timeout != null) a.push(`--timeout=${Math.ceil(input.timeout / 1000)}`)
  if (input.resume) a.push('--continue')
  if (input.rate) a.push(`--limit-rate=${input.rate}`)
  if (input.into) a.push('-P', input.into)
  if (input.auth) {
    const [user, pass = ''] = input.auth.split(':')
    a.push(`--user=${user}`, `--password=${pass}`)
  }
  if (input.token) a.push(`--header=Authorization: Bearer ${input.token}`)
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

function buildAria2Args(input: FetchNodeInput, urls: string[]): string[] {
  const a: string[] = []
  a.push(`--max-connection-per-server=${input.concurrency ?? 4}`)
  a.push(`--split=${input.concurrency ?? 4}`)
  if (input.retry != null) a.push(`--max-tries=${input.retry}`)
  if (input.timeout != null) a.push(`--timeout=${Math.ceil(input.timeout / 1000)}`)
  if (input.resume) a.push('--continue=true')
  if (input.rate) a.push(`--max-overall-download-limit=${input.rate}`)
  if (input.into) a.push(`--dir=${input.into}`)
  if (input.output && urls.length === 1) a.push(`--out=${input.output}`)
  if (input.auth) {
    const [user, pass = ''] = input.auth.split(':')
    a.push(`--http-user=${user}`, `--http-passwd=${pass}`)
  }
  if (input.token) a.push(`--header=Authorization: Bearer ${input.token}`)
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
    return DEFAULT_AGENTS[Math.floor(Math.random() * DEFAULT_AGENTS.length)]!
  }
  return DEFAULT_AGENTS[0]!
}

function commaJoinTypes(types: string): string {
  return types
    .split(',')
    .map(t => t.trim().replace(/^\./, ''))
    .join(',')
}

function resolveLikelyPath(url: string, input: FetchNodeInput): string | undefined {
  if (input.pipe) return undefined
  if (input.output) return path.resolve(input.output)
  const name = input.name ?? (path.basename(new URL(url).pathname) || 'index.html')
  return path.resolve(input.into ?? '.', name)
}

function quote(s: string): string {
  return /[\s"'$`\\]/.test(s) ? `'${s.replace(/'/g, `'\\''`)}'` : s
}

async function runProcess(
  cmd: string,
  args: string[],
  opts: { quiet?: boolean; pipe?: boolean },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: opts.pipe
        ? ['inherit', 'inherit', 'inherit']
        : opts.quiet
          ? ['ignore', 'ignore', 'inherit']
          : 'inherit',
    })
    child.on('error', err => {
      const msg = (err as NodeJS.ErrnoException).code === 'ENOENT'
        ? `fetch: \`${cmd}\` not found on PATH. Install it first.`
        : `fetch: ${cmd} failed — ${err.message}`
      reject(new Error(msg))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`fetch: ${cmd} exited with code ${code}`))
    })
  })
}
