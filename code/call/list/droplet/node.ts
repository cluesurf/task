import { listDroplets } from '~/code/tool/node/doctl'

export type ListDropletNodeInput = { json?: boolean; ips?: boolean }

async function listDropletNode(source: ListDropletNodeInput): Promise<string> {
  return listDroplets(source)
}

export default listDropletNode
export { listDropletNode }
