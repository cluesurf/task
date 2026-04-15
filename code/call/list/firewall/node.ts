import { listFirewalls } from '~/code/tool/node/doctl'

export async function listFirewallNode(): Promise<string> {
  return listFirewalls()
}
