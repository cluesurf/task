import { inspectDroplet } from '~/code/tool/node/doctl'

async function inspectDropletNode({ name }: { name: string }): Promise<string> {
  return inspectDroplet(name)
}

export default inspectDropletNode
export { inspectDropletNode }
