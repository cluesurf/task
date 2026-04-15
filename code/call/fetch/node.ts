/**
 * `task fetch` — a `wget` / `curl` / `aria2c` abstraction. The
 * backend is picked from the options (mirror → wget, concurrency>1
 * → aria2c, else curl) by `./command.ts`. This file is the thin
 * Node executor: pick backend → build argv → spawn → shape output.
 *
 * Full four-branch (remote / external / local-internal) dispatch
 * is not yet schema-driven for fetch; `testFetchNode` is exported
 * so parent verbs can still type-guard against this input shape.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { buildCommandToFetch } from './command'
import {
  type FetchNodeInput,
  type FetchNodeOutput,
  testFetchNode,
} from './shared'

export type { FetchNodeInput, FetchNodeOutput }
export { testFetchNode }

export async function fetchNode(
  input: FetchNodeInput,
): Promise<FetchNodeOutput> {
  const urls = input.urls ?? []
  if (urls.length === 0) {
    throw new Error('fetch: at least one URL required')
  }

  const command = buildCommandToFetch(input, urls)

  if (input.dryRun) {
    process.stdout.write(
      `${command.bin} ${command.args.map(quote).join(' ')}\n`,
    )
    return { files: urls.map(u => ({ url: u, status: 'skipped' })) }
  }

  if (input.into) {
    await fs.mkdir(input.into, { recursive: true })
  }

  await runProcess(command.bin, command.args, {
    quiet: input.quiet,
    pipe: input.pipe,
  })

  return {
    files: urls.map(u => ({
      url: u,
      path: resolveLikelyPath(u, input),
      status: 'ok',
    })),
  }
}

function resolveLikelyPath(
  url: string,
  input: FetchNodeInput,
): string | undefined {
  if (input.pipe) return undefined
  if (input.output) return path.resolve(input.output)
  const name =
    input.name ??
    (path.basename(new URL(url).pathname) || 'index.html')
  return path.resolve(input.into ?? '.', name)
}

function quote(s: string): string {
  return /[\s"'$`\\]/.test(s)
    ? `'${s.replace(/'/g, `'\\''`)}'`
    : s
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
      const msg =
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? `fetch: \`${cmd}\` not found on PATH. Install it first.`
          : `fetch: ${cmd} failed — ${err.message}`
      reject(new Error(msg))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else
        reject(
          new Error(`fetch: ${cmd} exited with code ${code}`),
        )
    })
  })
}
