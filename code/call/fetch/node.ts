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
import { spawnAndWait } from '~/code/tool/node/spawn'
import { formatShellCommand } from '~/code/tool/shared/verb'
import { buildCommandToFetch } from './command'
import {
  parseFetchNode,
  testFetchNode,
  type FetchNodeInput,
  type FetchNodeOutput,
} from './shared'

export type { FetchNodeInput, FetchNodeOutput }
export { testFetchNode }

export async function fetchNode(
  source: FetchNodeInput,
): Promise<FetchNodeOutput> {
  const input = parseFetchNode(source)
  const urls = input.urls
  if (urls.length === 0) {
    throw new Error('fetch: at least one URL required')
  }

  const command = buildCommandToFetch(input, urls)

  if (input.dryRun) {
    process.stdout.write(
      `${formatShellCommand(command)}\n`,
    )
    return { files: urls.map(u => ({ url: u, status: 'skipped' })) }
  }

  if (input.into) {
    await fs.mkdir(input.into, { recursive: true })
  }

  await spawnAndWait({
    verb: 'fetch',
    bin: command.bin,
    args: command.args,
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
