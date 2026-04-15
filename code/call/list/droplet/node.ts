import { listDroplets } from '~/code/tool/node/doctl'

export type ListDropletNodeInput = { json?: boolean; ips?: boolean }

export async function listDropletNode(source: ListDropletNodeInput): Promise<string> {
  return listDroplets(source)
}
