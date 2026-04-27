/**
 * `task inspect dns <host>` — local-resolver DNS lookup.
 * Uses Node's built-in `node:dns` so we don't shell out for the
 * common case. `--tool cloudflare` switches to a Cloudflare API
 * call against a zone (the prior behavior of this verb).
 *
 * Returns A / AAAA / MX / NS / TXT / CNAME records. By default
 * resolves all record types in parallel; pass `type` to scope.
 */

import {
  promises as dns,
  type AnyRecord,
  type MxRecord,
} from 'node:dns'

export type InspectDnsRecordType =
  | 'A'
  | 'AAAA'
  | 'CNAME'
  | 'MX'
  | 'NS'
  | 'TXT'
  | 'SOA'
  | 'SRV'
  | 'PTR'
  | 'CAA'
  | 'ANY'

export type InspectDnsNodeInput = {
  host: string
  type?: InspectDnsRecordType
  /** Override the system resolver. */
  resolver?: string
  /** Cloudflare zone-records mode. Falls back to legacy Cloudflare API. */
  tool?: 'system' | 'cloudflare'
}

export type InspectDnsRecord = {
  type: string
  value: string
  priority?: number
  ttl?: number
}

export type InspectDnsNodeOutput = {
  host: string
  resolver?: string
  records: InspectDnsRecord[]
}

const DEFAULT_TYPES: InspectDnsRecordType[] = [
  'A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT',
]

async function inspectDnsNode(
  source: InspectDnsNodeInput,
): Promise<InspectDnsNodeOutput> {
  if (source.tool === 'cloudflare') {
    return inspectDnsCloudflare(source.host)
  }

  const resolver = makeResolver(source.resolver)
  const types: InspectDnsRecordType[] =
    source.type === 'ANY' || source.type === undefined
      ? DEFAULT_TYPES
      : [source.type]

  const records: InspectDnsRecord[] = []
  await Promise.all(
    types.map(async t => {
      try {
        const found = await resolveType(resolver, source.host, t)
        records.push(...found)
      } catch (err) {
        const code = (err as NodeJS.ErrnoException).code
        if (code === 'ENOTFOUND' || code === 'ENODATA') return
        // surface other errors (e.g. ECONNREFUSED on a stale resolver)
        records.push({ type: `${t}_error`, value: String(err) })
      }
    }),
  )

  return { host: source.host, resolver: source.resolver, records }
}

function makeResolver(addr?: string): dns.Resolver {
  const r = new dns.Resolver()
  if (addr) r.setServers([addr])
  return r
}

async function resolveType(
  resolver: dns.Resolver,
  host: string,
  type: InspectDnsRecordType,
): Promise<InspectDnsRecord[]> {
  switch (type) {
    case 'A':     return (await resolver.resolve4(host)).map(v => ({ type: 'A', value: v }))
    case 'AAAA':  return (await resolver.resolve6(host)).map(v => ({ type: 'AAAA', value: v }))
    case 'CNAME': return (await resolver.resolveCname(host)).map(v => ({ type: 'CNAME', value: v }))
    case 'MX':    return (await resolver.resolveMx(host)).map(({ exchange, priority }: MxRecord) => ({
      type: 'MX', value: exchange, priority,
    }))
    case 'NS':    return (await resolver.resolveNs(host)).map(v => ({ type: 'NS', value: v }))
    case 'TXT':   return (await resolver.resolveTxt(host)).map(v => ({ type: 'TXT', value: v.join('') }))
    case 'SOA': {
      const soa = await resolver.resolveSoa(host)
      return [{
        type: 'SOA',
        value: `${soa.nsname} ${soa.hostmaster} ${soa.serial} ` +
          `${soa.refresh} ${soa.retry} ${soa.expire} ${soa.minttl}`,
      }]
    }
    case 'SRV':   return (await resolver.resolveSrv(host)).map(v => ({
      type: 'SRV', value: `${v.name}:${v.port}`, priority: v.priority,
    }))
    case 'PTR':   return (await resolver.resolvePtr(host)).map(v => ({ type: 'PTR', value: v }))
    case 'CAA':   return (await resolver.resolveCaa(host)).map(v => ({
      type: 'CAA', value: `${v.critical} ${Object.keys(v).filter(k => k !== 'critical').join(',')} ${JSON.stringify(v)}`,
    }))
    case 'ANY':   return (await resolver.resolveAny(host)).map((r: AnyRecord) => ({
      type: r.type, value: JSON.stringify(r),
    }))
  }
}

async function inspectDnsCloudflare(zone: string): Promise<InspectDnsNodeOutput> {
  const { listDnsRecords } = await import('~/code/tool/node/cloudflare')
  const records = await listDnsRecords(zone)
  return {
    host: zone,
    records: (records as Array<{ type: string; content: string; priority?: number; ttl?: number }>).map(r => ({
      type: r.type,
      value: r.content,
      priority: r.priority,
      ttl: r.ttl,
    })),
  }
}

export default inspectDnsNode
export { inspectDnsNode }
