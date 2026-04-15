import { measureDroplet, type DropletMetric } from '~/code/tool/node/doctl'

export type MeasureDropletNodeInput = {
  id: string
  type: DropletMetric
}

export async function measureDropletNode(source: MeasureDropletNodeInput): Promise<string> {
  return measureDroplet(source.id, source.type)
}
