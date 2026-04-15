import { inspectDroplet } from '~/code/tool/node/doctl'

export async function inspectDropletNode({ name }: { name: string }): Promise<string> {
  return inspectDroplet(name)
}
