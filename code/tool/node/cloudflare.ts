// Cloudflare backend. Thin wrappers over the REST API
// (api.cloudflare.com) and the Analytics GraphQL API
// (api.cloudflare.com/client/v4/graphql).
//
// Auth: $CLOUDFLARE_API_TOKEN (required), $CLOUDFLARE_ACCOUNT_ID
// (optional — resolved from /accounts on demand). Zone flags
// (`--zone <name>`) resolve to the first matching zone id.
//
// R2 + Workers specific ops shell out to `wrangler` where that's
// cleaner than the bare API.

import { exec } from '~/code/tool/node/process'

const API_BASE = 'https://api.cloudflare.com/client/v4'

function token(): string {
  const t = process.env.CLOUDFLARE_API_TOKEN
  if (!t) {
    throw new Error(
      'CLOUDFLARE_API_TOKEN not set. Create one at https://dash.cloudflare.com/profile/api-tokens',
    )
  }
  return t
}

async function api(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token()}`,
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = (await res.json()) as {
    success: boolean
    errors?: { message: string }[]
    result: unknown
  }
  if (!res.ok || !json.success) {
    const msgs = json.errors?.map(e => e.message).join('; ') ?? res.statusText
    throw new Error(`cloudflare API ${method} ${path}: ${msgs}`)
  }
  return json.result
}

export async function graphql(query: string, variables: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(`${API_BASE}/graphql`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = (await res.json()) as { data?: unknown; errors?: { message: string }[] }
  if (json.errors?.length) {
    throw new Error(`cloudflare graphql: ${json.errors.map(e => e.message).join('; ')}`)
  }
  return json.data
}

// ─── accounts / zones ─────────────────────────────────────────────

export async function listAccounts(): Promise<Array<{ id: string; name: string }>> {
  return (await api('GET', '/accounts')) as Array<{ id: string; name: string }>
}

export async function accountId(): Promise<string> {
  if (process.env.CLOUDFLARE_ACCOUNT_ID) return process.env.CLOUDFLARE_ACCOUNT_ID
  const accts = await listAccounts()
  const first = accts[0]
  if (!first) throw new Error('no cloudflare accounts visible to this token')
  return first.id
}

export async function listZones(): Promise<Array<{ id: string; name: string; status: string; plan: { name: string } }>> {
  return (await api('GET', '/zones?per_page=50')) as Array<{
    id: string; name: string; status: string; plan: { name: string }
  }>
}

export async function resolveZoneId(nameOrId: string): Promise<string> {
  if (/^[0-9a-f]{32}$/i.test(nameOrId)) return nameOrId
  const zones = await listZones()
  const z = zones.find(z => z.name === nameOrId)
  if (!z) throw new Error(`zone not found: ${nameOrId}`)
  return z.id
}

export async function getZone(zone: string): Promise<unknown> {
  const id = await resolveZoneId(zone)
  return api('GET', `/zones/${id}`)
}

// ─── DNS ──────────────────────────────────────────────────────────

export async function listDnsRecords(zone: string): Promise<unknown> {
  const id = await resolveZoneId(zone)
  return api('GET', `/zones/${id}/dns_records?per_page=1000`)
}

// ─── Traffic / cache / requests (Analytics GraphQL) ──────────────

type GroupBy = 'country' | 'path' | 'ip' | 'status' | 'cacheStatus' | null

/** Time-range helper. Returns ISO since/until strings. */
function rangeWindow(range: string = '24h'): { since: string; until: string } {
  const m = range.match(/^(\d+)([hdw])$/)
  if (!m) throw new Error(`bad range: ${range} (use 24h, 7d, 2w, ...)`)
  const [, n, unit] = m
  const ms = Number(n) * ({ h: 3_600_000, d: 86_400_000, w: 604_800_000 } as const)[unit as 'h' | 'd' | 'w']
  const until = new Date().toISOString()
  const since = new Date(Date.now() - ms).toISOString()
  return { since, until }
}

export async function traffic(zone: string, opts: { group?: GroupBy; range?: string } = {}): Promise<unknown> {
  const zoneTag = await resolveZoneId(zone)
  const { since, until } = rangeWindow(opts.range)
  const dims = opts.group === 'country'
    ? 'clientCountryName'
    : opts.group === 'path'
    ? 'clientRequestPath'
    : opts.group === 'status'
    ? 'edgeResponseStatus'
    : 'null_'   // no grouping
  const query = `
    query ($zoneTag: string!, $since: Time!, $until: Time!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(
            limit: 100
            filter: { datetime_geq: $since, datetime_leq: $until }
            ${dims === 'null_' ? '' : `orderBy: [sum_requests_DESC]`}
          ) {
            sum { requests bytes }
            ${dims === 'null_' ? '' : `dimensions { ${dims} }`}
          }
        }
      }
    }`
  return graphql(query.replace(/\$\{/g, '\\${'), { zoneTag, since, until })
}

export async function cacheAnalytics(zone: string, opts: { show?: 'hit-rate' | 'status'; range?: string } = {}): Promise<unknown> {
  const zoneTag = await resolveZoneId(zone)
  const { since, until } = rangeWindow(opts.range)
  const query = `
    query ($zoneTag: string!, $since: Time!, $until: Time!) {
      viewer { zones(filter: { zoneTag: $zoneTag }) {
        httpRequestsAdaptiveGroups(
          limit: 50
          filter: { datetime_geq: $since, datetime_leq: $until }
          orderBy: [sum_requests_DESC]
        ) {
          sum { requests cachedRequests cachedBytes bytes }
          dimensions { cacheStatus }
        }
      } }
    }`
  return graphql(query, { zoneTag, since, until })
}

export async function firewallEvents(zone: string, opts: { filter?: string; range?: string; limit?: number } = {}): Promise<unknown> {
  const zoneTag = await resolveZoneId(zone)
  const { since, until } = rangeWindow(opts.range)
  const query = `
    query ($zoneTag: string!, $since: Time!, $until: Time!, $limit: Int!) {
      viewer { zones(filter: { zoneTag: $zoneTag }) {
        firewallEventsAdaptive(
          limit: $limit
          filter: { datetime_geq: $since, datetime_leq: $until }
          orderBy: [datetime_DESC]
        ) {
          action source ruleId clientCountryName clientIP userAgent clientRequestHTTPHost clientRequestPath datetime
        }
      } }
    }`
  return graphql(query, { zoneTag, since, until, limit: opts.limit ?? 100 })
}

export async function searchRequests(zone: string, q: string, opts: { range?: string; limit?: number } = {}): Promise<unknown> {
  // Simple `key:value` parser. Supported keys: status, path, method, country, ip.
  const filters: Record<string, string | number> = {}
  for (const part of q.split(/\s+/)) {
    const [k, v] = part.split(':')
    if (!k || !v) continue
    if (k === 'status') filters.edgeResponseStatus = Number(v)
    if (k === 'path') filters.clientRequestPath = v
    if (k === 'method') filters.clientRequestHTTPMethodName = v
    if (k === 'country') filters.clientCountryName = v
    if (k === 'ip') filters.clientIP = v
  }
  const zoneTag = await resolveZoneId(zone)
  const { since, until } = rangeWindow(opts.range)
  const filterStr = Object.entries(filters)
    .map(([k, v]) => `${k}: ${typeof v === 'number' ? v : JSON.stringify(v)}`)
    .join(', ')
  const filterExtra = filterStr ? `, ${filterStr}` : ''
  const query = `
    query ($zoneTag: string!, $since: Time!, $until: Time!, $limit: Int!) {
      viewer { zones(filter: { zoneTag: $zoneTag }) {
        httpRequestsAdaptiveGroups(
          limit: $limit
          filter: { datetime_geq: $since, datetime_leq: $until${filterExtra} }
          orderBy: [sum_requests_DESC]
        ) {
          sum { requests }
          dimensions { clientRequestPath edgeResponseStatus clientCountryName clientIP clientRequestHTTPMethodName }
        }
      } }
    }`
  return graphql(query, { zoneTag, since, until, limit: opts.limit ?? 100 })
}

// ─── R2 ───────────────────────────────────────────────────────────

export async function listBuckets(): Promise<unknown> {
  const acc = await accountId()
  return api('GET', `/accounts/${acc}/r2/buckets`)
}

export async function inspectBucket(name: string, opts: { show?: 'size' | 'objects' } = {}): Promise<unknown> {
  const acc = await accountId()
  if (opts.show === 'size' || opts.show === 'objects') {
    return api('GET', `/accounts/${acc}/r2/buckets/${name}/usage`)
  }
  return api('GET', `/accounts/${acc}/r2/buckets/${name}`)
}

export async function r2Metrics(opts: { show?: 'egress' | 'ops' } = {}): Promise<unknown> {
  const acc = await accountId()
  // Workers & Pages Analytics GraphQL exposes R2 ops; for the raw
  // account-level egress we use the analytics REST summary.
  return api('GET', `/accounts/${acc}/r2/buckets`)   // placeholder for detailed GraphQL
  void opts
}

// ─── Workers ──────────────────────────────────────────────────────

export async function listWorkers(): Promise<unknown> {
  const acc = await accountId()
  return api('GET', `/accounts/${acc}/workers/scripts`)
}

export async function inspectWorker(name: string): Promise<string> {
  // Prefer wrangler for pretty output; fall back to the REST API.
  try {
    const { stdout } = await exec(['wrangler', 'deployments', 'list', '--name', name])
    return stdout
  } catch {
    const acc = await accountId()
    const r = await api('GET', `/accounts/${acc}/workers/scripts/${name}`)
    return JSON.stringify(r, null, 2)
  }
}

export async function workerMetrics(name: string, opts: { show?: 'requests' | 'latency' | 'errors' } = {}): Promise<unknown> {
  const acc = await accountId()
  const { since, until } = rangeWindow('24h')
  const query = `
    query ($acc: string!, $scriptName: string!, $since: Time!, $until: Time!) {
      viewer { accounts(filter: { accountTag: $acc }) {
        workersInvocationsAdaptive(
          limit: 100
          filter: { scriptName: $scriptName, datetime_geq: $since, datetime_leq: $until }
        ) {
          sum { requests errors subrequests }
          quantiles { cpuTimeP50 cpuTimeP99 responseBodySizeP50 responseBodySizeP99 }
          dimensions { scriptName }
        }
      } }
    }`
  return graphql(query, { acc, scriptName: name, since, until })
  void opts
}

// ─── Attacks / security summary ──────────────────────────────────

export async function listAttacks(zone: string, opts: { filter?: string; range?: string } = {}): Promise<unknown> {
  return firewallEvents(zone, opts)
}

export async function securitySummary(zone: string, opts: { range?: string } = {}): Promise<unknown> {
  const zoneTag = await resolveZoneId(zone)
  const { since, until } = rangeWindow(opts.range)
  const query = `
    query ($zoneTag: string!, $since: Time!, $until: Time!) {
      viewer { zones(filter: { zoneTag: $zoneTag }) {
        firewallEventsAdaptiveGroups(
          limit: 50
          filter: { datetime_geq: $since, datetime_leq: $until }
          orderBy: [count_DESC]
        ) {
          count dimensions { action source }
        }
      } }
    }`
  return graphql(query, { zoneTag, since, until })
}
