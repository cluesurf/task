import { listPods } from '~/code/tool/node/kube'

export type ListPodNodeInput = { namespace?: string; context?: string }

async function listPodNode(source: ListPodNodeInput = {}): Promise<string> {
  return listPods(source)
}

export default listPodNode
export { listPodNode }
