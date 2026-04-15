// Persistent user context for `task`. `task use <key> <value>` writes
// here; other verbs read from here when their command-line flag is
// omitted.
//
// Stored at `~/.config/cluesurf-task/context.json`. Respects
// $XDG_CONFIG_HOME.

import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

export type TaskContext = {
  /** Default `--platform` (e.g. 'cloudflare'). */
  platform?: string
  /** Default Cloudflare zone / hostname. */
  zone?: string
  /** Default `--tool` selector (e.g. 'r2'). */
  tool?: string
  /** Default time range for analytics ('24h', '7d', ...). */
  range?: string
  /** Per-platform extras (e.g. { cloudflare: { accountId: '...' } }). */
  meta?: Record<string, Record<string, string>>
}

export function contextPath(): string {
  const xdg = process.env.XDG_CONFIG_HOME
  const base = xdg ? xdg : path.join(os.homedir(), '.config')
  return path.join(base, 'cluesurf-task', 'context.json')
}

export async function readContext(): Promise<TaskContext> {
  try {
    const text = await fs.readFile(contextPath(), 'utf8')
    return JSON.parse(text) as TaskContext
  } catch {
    return {}
  }
}

export async function writeContext(ctx: TaskContext): Promise<void> {
  const p = contextPath()
  await fs.mkdir(path.dirname(p), { recursive: true })
  await fs.writeFile(p, JSON.stringify(ctx, null, 2) + '\n')
}

export async function patchContext(patch: Partial<TaskContext>): Promise<TaskContext> {
  const current = await readContext()
  const next = { ...current, ...patch }
  await writeContext(next)
  return next
}

/** Resolve a flag with fallback to the saved context. */
export async function resolveFlag<K extends keyof TaskContext>(
  key: K,
  flagValue: TaskContext[K] | undefined,
): Promise<TaskContext[K] | undefined> {
  if (flagValue !== undefined) return flagValue
  const ctx = await readContext()
  return ctx[key]
}
