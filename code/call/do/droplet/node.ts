// DigitalOcean droplet helpers via `doctl`. Auth via $DIGITALOCEAN_ACCESS_TOKEN
// or `doctl auth init` — both honored by doctl transparently.

import { exec } from '~/code/tool/node/process'

async function listDroplets(format?: 'json' | 'text'): Promise<string> {
  const argv = ['doctl', 'compute', 'droplet', 'list']
  if (format === 'json') argv.push('-o', 'json')
  const { stdout } = await exec(argv)
  return stdout
}

/** IP (public + private + IPv6) of every droplet, one per line. */
export async function listDropletIps(): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'compute',
    'droplet',
    'list',
    '--format',
    'Name,PublicIPv4,PrivateIPv4,PublicIPv6',
    '--no-header',
  ])
  return stdout
}

export async function inspectDroplet(name: string): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'compute',
    'droplet',
    'get',
    name,
    '-o',
    'json',
  ])
  return stdout
}

/** Recent CPU / memory / bandwidth metrics. `type` selects the series. */
export async function dropletMetrics(
  id: string,
  type: 'cpu' | 'memory' | 'load' | 'filesystem-free' | 'bandwidth',
): Promise<string> {
  const subcommand =
    {
      cpu: 'cpu',
      memory: 'memory-total',
      load: 'load-1',
      'filesystem-free': 'filesystem-free',
      bandwidth: 'bandwidth',
    } as const
  const { stdout } = await exec([
    'doctl',
    'monitoring',
    'metrics',
    'droplet',
    subcommand[type],
    '--droplet-id',
    id,
    '-o',
    'json',
  ])
  return stdout
}

export default listDroplets
export { listDroplets }
