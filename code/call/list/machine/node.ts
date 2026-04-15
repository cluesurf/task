// Platform-agnostic machine list. `--platform` picks the backend.
// Only DigitalOcean ('do' / 'digital-ocean') is wired today; AWS EC2
// and GCP slot in here at the same level when added.

import { listDroplets } from '~/code/tool/node/doctl'

export type ListMachineNodeInput = {
  platform: string
  show?: 'ip'
  json?: boolean
}

export async function listMachineNode(source: ListMachineNodeInput): Promise<string> {
  const p = normalizePlatform(source.platform)
  if (p === 'do') {
    return listDroplets({ json: source.json, ips: source.show === 'ip' })
  }
  throw new Error(`unsupported platform: ${source.platform} (only 'do' / 'digital-ocean' today)`)
}

export function normalizePlatform(p: string): 'do' | string {
  if (p === 'do' || p === 'digital-ocean' || p === 'digitalocean') return 'do'
  return p
}
