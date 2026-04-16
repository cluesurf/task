import { listClusters } from '~/code/tool/node/doctl'

async function listClusterNode(): Promise<string> {
  return listClusters()
}

export default listClusterNode
export { listClusterNode }
