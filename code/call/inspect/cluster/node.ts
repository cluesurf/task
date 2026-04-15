import { inspectCluster } from '~/code/tool/node/doctl'

export async function inspectClusterNode({ name }: { name: string }): Promise<string> {
  return inspectCluster(name)
}
