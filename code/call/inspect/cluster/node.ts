import { inspectCluster } from '~/code/tool/node/doctl'

async function inspectClusterNode({ name }: { name: string }): Promise<string> {
  return inspectCluster(name)
}

export default inspectClusterNode
export { inspectClusterNode }
