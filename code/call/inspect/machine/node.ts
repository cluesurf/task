import { inspectDroplet } from '~/code/tool/node/doctl'
import { normalizePlatform } from '~/code/call/list/machine/node'

export type InspectMachineNodeInput = { name: string; platform: string }

export async function inspectMachineNode(source: InspectMachineNodeInput): Promise<string> {
  const p = normalizePlatform(source.platform)
  if (p === 'do') return inspectDroplet(source.name)
  throw new Error(`unsupported platform: ${source.platform}`)
}
