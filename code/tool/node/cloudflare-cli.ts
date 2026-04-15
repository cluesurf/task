// Small helper used by every cloudflare subcommand under
// inspect / list / measure / search / watch. Wires up common
// flags (`--platform`, `--zone`, `--range`, `--tool`) and a
// JSON-or-table output.

import yargs, { type Argv } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export function cfCommonFlags<T>(y: Argv<T>) {
  return y
    .option('platform', { type: 'string' })
    .option('zone', { type: 'string' })
    .option('tool', { type: 'string' })
    .option('range', { type: 'string', describe: '24h, 7d, 2w' })
    .option('json', { type: 'boolean', default: true })
}

export async function resolveCfZone(flag: string | undefined): Promise<string> {
  const z = await resolveFlag('zone', flag)
  if (!z) {
    throw new Error(
      'no zone specified. Pass --zone <host> or run `task use zone <host>`.',
    )
  }
  return z
}

export async function resolveCfPlatform(flag: string | undefined): Promise<string> {
  const p = (await resolveFlag('platform', flag)) ?? 'cloudflare'
  return p
}

export async function resolveCfRange(flag: string | undefined): Promise<string> {
  return (await resolveFlag('range', flag)) ?? '24h'
}

export function printJson(x: unknown): void {
  process.stdout.write(JSON.stringify(x, null, 2) + '\n')
}

// Prevent tree-shaking from dropping the yargs re-export above.
export { yargs }
