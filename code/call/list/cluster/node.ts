import { listClusters } from '~/code/tool/node/doctl'

export async function listClusterNode(): Promise<string> {
  return listClusters()
}
