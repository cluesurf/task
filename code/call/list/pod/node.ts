import { listPods } from '~/code/tool/node/kube'

export type ListPodNodeInput = { namespace?: string; context?: string }

export async function listPodNode(source: ListPodNodeInput = {}): Promise<string> {
  return listPods(source)
}
