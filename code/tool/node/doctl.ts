// DigitalOcean backend. Thin wrappers over `doctl` — shared by the
// generic verbs (list / inspect / measure / load) when they dispatch
// to a DO-flavored noun.
//
// Auth: $DIGITALOCEAN_ACCESS_TOKEN or `doctl auth init`.

import { exec } from '~/code/tool/node/process'

export type DropletMetric =
  | 'cpu'
  | 'memory'
  | 'load'
  | 'filesystem-free'
  | 'bandwidth'

const DROPLET_METRIC: Record<DropletMetric, string> = {
  cpu: 'cpu',
  memory: 'memory-total',
  load: 'load-1',
  'filesystem-free': 'filesystem-free',
  bandwidth: 'bandwidth',
}

export async function listDroplets({
  json,
  ips,
}: { json?: boolean; ips?: boolean } = {}): Promise<string> {
  if (ips) {
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
  const argv = ['doctl', 'compute', 'droplet', 'list']
  if (json) argv.push('-o', 'json')
  const { stdout } = await exec(argv)
  return stdout
}

export async function inspectDroplet(name: string): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'compute', 'droplet', 'get', name, '-o', 'json',
  ])
  return stdout
}

// Droplet monitoring metrics — `doctl` hasn't shipped a `monitoring
// metrics` subcommand yet (current releases expose only `alert` /
// `uptime`). Go direct to the DigitalOcean REST API instead. Auth
// uses $DIGITALOCEAN_ACCESS_TOKEN (same token `doctl` uses).

const DO_METRIC_API: Record<DropletMetric, string> = {
  cpu: 'cpu',
  memory: 'memory_available',
  load: 'load_1',
  'filesystem-free': 'filesystem_free',
  bandwidth: 'bandwidth',
}

function doToken(): string {
  const t = process.env.DIGITALOCEAN_ACCESS_TOKEN
  if (!t) {
    throw new Error(
      'DIGITALOCEAN_ACCESS_TOKEN not set. Create one at https://cloud.digitalocean.com/account/api/tokens',
    )
  }
  return t
}

async function doMetricApi(
  type: DropletMetric,
  id: string,
  opts: { since: number; until: number; interface?: 'public' | 'private'; direction?: 'inbound' | 'outbound' },
): Promise<{ ts: number[]; y: number[] }> {
  const metric = DO_METRIC_API[type]
  const params = new URLSearchParams({
    host_id: id,
    start: String(opts.since),
    end: String(opts.until),
  })
  if (type === 'bandwidth') {
    params.set('interface', opts.interface ?? 'public')
    params.set('direction', opts.direction ?? 'outbound')
  }
  const url = `https://api.digitalocean.com/v2/monitoring/metrics/droplet/${metric}?${params}`
  const res = await fetch(url, {
    headers: { authorization: `Bearer ${doToken()}` },
  })
  if (!res.ok) {
    throw new Error(`DO metrics ${metric} failed: ${res.status} ${res.statusText}`)
  }
  const json = (await res.json()) as {
    data?: { result?: Array<{ metric?: { mode?: string }; values?: Array<[number, string]> }> }
  }
  const results = json.data?.result ?? []

  // CPU is reported per mode (idle/iowait/user/system/nice/...).
  // Sum every non-idle mode into one series, aligned by timestamp,
  // so the result is "active CPU seconds" since boot.
  if (type === 'cpu') {
    const active = results.filter(r => {
      const m = r.metric?.mode
      return m && m !== 'idle' && m !== 'iowait'
    })
    return sumAligned(active)
  }

  const values = results[0]?.values ?? []
  return {
    ts: values.map(([ts]) => ts),
    y: values.map(([, v]) => Number(v)),
  }
}

/** Align per-mode series by timestamp and sum their values. */
function sumAligned(
  series: Array<{ values?: Array<[number, string]> }>,
): { ts: number[]; y: number[] } {
  const acc = new Map<number, number>()
  for (const s of series) {
    for (const [ts, v] of s.values ?? []) {
      acc.set(ts, (acc.get(ts) ?? 0) + Number(v))
    }
  }
  const ts = [...acc.keys()].sort((a, b) => a - b)
  return { ts, y: ts.map(t => acc.get(t)!) }
}

export async function measureDroplet(
  id: string,
  type: DropletMetric,
): Promise<string> {
  const s = await measureDropletSeries(id, type)
  return JSON.stringify(s, null, 2)
}

/** Structured version — returns parsed series for chart renderers.
 *   ts: epoch seconds (raw, for real-time rate math)
 *   x:  short display labels aligned with ts
 *   y:  values (cumulative for cpu+bandwidth, gauge for memory/load/fs)
 * `since` / `until` default to the last hour. */
export async function measureDropletSeries(
  id: string,
  type: DropletMetric,
  opts: { since?: string; until?: string } = {},
): Promise<{ ts: number[]; x: string[]; y: number[] }> {
  const now = Math.floor(Date.now() / 1000)
  const until = opts.until ? Number(opts.until) : now
  const since = opts.since ? Number(opts.since) : now - 3600
  const { ts, y } = await doMetricApi(type, id, { since, until })
  const span = until - since
  return { ts, y, x: ts.map(t => formatLabel(t, span)) }
}

/** Pick a label format that matches the window size. */
function formatLabel(epochSec: number, spanSec: number): string {
  const d = new Date(epochSec * 1000)
  if (spanSec <= 3 * 3600) return d.toTimeString().slice(0, 5)
  if (spanSec <= 2 * 86400) return d.toISOString().slice(5, 16).replace('T', ' ')
  return d.toISOString().slice(0, 10)
}

export async function listClusters(): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'kubernetes', 'cluster', 'list', '-o', 'json',
  ])
  return stdout
}

export async function inspectCluster(name: string): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'kubernetes', 'cluster', 'get', name, '-o', 'json',
  ])
  return stdout
}

export async function saveClusterConfig(name: string): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'kubernetes', 'cluster', 'kubeconfig', 'save', name,
  ])
  return stdout
}

export async function listFirewalls(): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'compute', 'firewall', 'list', '-o', 'json',
  ])
  return stdout
}

export async function listDomains(): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'compute', 'domain', 'list', '-o', 'json',
  ])
  return stdout
}

export async function listDomainRecords(domain: string): Promise<string> {
  const { stdout } = await exec([
    'doctl', 'compute', 'domain', 'records', 'list', domain, '-o', 'json',
  ])
  return stdout
}
