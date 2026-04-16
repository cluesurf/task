import { saveClusterConfig } from '~/code/tool/node/doctl'

async function loadKubeconfigNode({
  cluster,
}: {
  cluster: string
}): Promise<string> {
  return saveClusterConfig(cluster)
}

export default loadKubeconfigNode
export { loadKubeconfigNode }
