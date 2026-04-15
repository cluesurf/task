import { saveClusterConfig } from '~/code/tool/node/doctl'

export async function loadKubeconfigNode({
  cluster,
}: {
  cluster: string
}): Promise<string> {
  return saveClusterConfig(cluster)
}
