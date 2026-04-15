/**
 * Resolve a verb → `Plan` by layering `.taskrc` overrides on top
 * of the detected ecosystem's registry defaults. Pure function;
 * no shell execution happens here — see `./run.ts`.
 */

import { detect } from './detect'
import { loadRc } from './rc'
import type { Plan, TaskVerb } from './types'

export type ResolveOptions = {
  cwd: string
  verb: TaskVerb
  /** Pin to a specific ecosystem id (`.taskrc` shortcut would
   * otherwise beat detection). */
  ecosystem?: string
}

export function resolve(opts: ResolveOptions): Plan | undefined {
  const rc = loadRc(opts.cwd)
  if (rc[opts.verb]) {
    return {
      verb: opts.verb,
      ecosystem: '.taskrc',
      command: rc[opts.verb]!,
      source: 'rc',
    }
  }

  const det = detect(opts.cwd)
  const eco = opts.ecosystem
    ? det.all.find(e => e.id === opts.ecosystem)
    : det.best
  if (!eco) return undefined

  const cmd = eco.commands[opts.verb]
  if (!cmd) return undefined

  return {
    verb: opts.verb,
    ecosystem: eco.id,
    command: cmd,
    source: 'registry',
  }
}
