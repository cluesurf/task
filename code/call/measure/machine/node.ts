import { measureDroplet, type DropletMetric } from '~/code/tool/node/doctl'
import { normalizePlatform } from '~/code/call/list/machine/node'

export type MeasureMachineNodeInput = {
  id: string
  platform: string
  field: DropletMetric
}

async function measureMachineNode(source: MeasureMachineNodeInput): Promise<string> {
  const p = normalizePlatform(source.platform)
  if (p === 'do') return measureDroplet(source.id, source.field)
  throw new Error(`unsupported platform: ${source.platform}`)
}

export default measureMachineNode
export { measureMachineNode }
