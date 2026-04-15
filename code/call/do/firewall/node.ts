import { exec } from '~/code/tool/node/process'

export async function listFirewalls(): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'compute',
    'firewall',
    'list',
    '-o',
    'json',
  ])
  return stdout
}
