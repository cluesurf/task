import { logsPod } from '~/code/tool/node/kube'

export type LogPodNodeInput = {
  selector: string
  namespace?: string
  context?: string
  follow?: boolean
  tail?: number
}

export async function logPodNode(source: LogPodNodeInput): Promise<void> {
  await logsPod(source.selector, source)
}
