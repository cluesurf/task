import { logsPod } from '~/code/tool/node/kube'

export type LogPodNodeInput = {
  selector: string
  namespace?: string
  context?: string
  follow?: boolean
  tail?: number
}

async function logPodNode(source: LogPodNodeInput): Promise<void> {
  await logsPod(source.selector, source)
}

export default logPodNode
export { logPodNode }
