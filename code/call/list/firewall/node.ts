import { listFirewalls } from '~/code/tool/node/doctl'

async function listFirewallNode(): Promise<string> {
  return listFirewalls()
}

export default listFirewallNode
export { listFirewallNode }
