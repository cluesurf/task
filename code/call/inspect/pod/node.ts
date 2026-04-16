import { inspectPod } from '~/code/tool/node/kube'

export type InspectPodNodeInput = { name: string; namespace?: string; context?: string }

async function inspectPodNode(source: InspectPodNodeInput): Promise<string> {
  return inspectPod(source.name, source)
}

export default inspectPodNode
export { inspectPodNode }
