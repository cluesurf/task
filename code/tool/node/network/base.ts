/**
 * Network probes — `ping`, HTTP latency, traceroute, interface
 * enumeration, route table. Shells out to the OS tools where
 * they're available on every platform we target and parses the
 * output into shared types so downstream rendering is uniform.
 */

import os from 'node:os'
import { exec } from '~/code/tool/node/process'

export type PingResult = {
  host: string
  sent: number
  received: number
  lossPercent: number
  minMs?: number
  avgMs?: number
  maxMs?: number
  lines: string[]
}

export async function pingHost(
  host: string,
  count = 4,
): Promise<PingResult> {
  const windows = process.platform === 'win32'
  const args = windows
    ? ['-n', String(count), host]
    : ['-c', String(count), host]
  const { stdout } = await exec(['ping', ...args])
  return parsePing(host, stdout)
}

function parsePing(host: string, out: string): PingResult {
  const lines = out.split('\n')
  // Match "N packets transmitted, M received, L% packet loss" (macOS/Linux)
  // or "Packets: Sent = N, Received = M, Lost = L"  (Windows)
  const summary = lines.find(
    l => /transmitted|Packets:/i.test(l),
  )
  let sent = 0
  let received = 0
  let lossPercent = 0
  if (summary) {
    const mac = summary.match(
      /(\d+)\s+packets transmitted,\s+(\d+).*?,\s+([\d.]+)%\s+packet loss/i,
    )
    const win = summary.match(
      /Sent\s*=\s*(\d+),\s*Received\s*=\s*(\d+),\s*Lost\s*=\s*(\d+)/i,
    )
    if (mac) {
      sent = Number(mac[1])
      received = Number(mac[2])
      lossPercent = Number(mac[3])
    } else if (win) {
      sent = Number(win[1])
      received = Number(win[2])
      lossPercent = sent > 0 ? Math.round((Number(win[3]) / sent) * 100) : 0
    }
  }
  // "round-trip min/avg/max/stddev = 15.1/22.3/40.0/9.2 ms" (mac/linux)
  const stats = out.match(
    /=\s*([\d.]+)\/([\d.]+)\/([\d.]+)(?:\/[\d.]+)?\s*ms/,
  )
  return {
    host,
    sent,
    received,
    lossPercent,
    minMs: stats ? Number(stats[1]) : undefined,
    avgMs: stats ? Number(stats[2]) : undefined,
    maxMs: stats ? Number(stats[3]) : undefined,
    lines,
  }
}

// ---- HTTP latency --------------------------------------------------

export type MeasureResult = {
  url: string
  status: number
  totalMs: number
  dnsMs?: number
  connectMs?: number
  ttfbMs?: number
  sizeBytes?: number
}

/**
 * `task measure <url>` — shell out to `curl` with a write-out
 * template so we get split timings (DNS / connect / TTFB /
 * total) without parsing `-v` traces.
 */
export async function measureUrl(url: string): Promise<MeasureResult> {
  const format =
    '%{http_code} %{time_namelookup} %{time_connect} %{time_starttransfer} %{time_total} %{size_download}'
  const { stdout } = await exec([
    'curl',
    '-sS',
    '-L',
    '-o',
    '/dev/null',
    '-w',
    format,
    url,
  ])
  const parts = stdout.trim().split(/\s+/)
  const toMs = (s: string) => Math.round(Number(s) * 1000)
  return {
    url,
    status: Number(parts[0]),
    dnsMs: toMs(parts[1]!),
    connectMs: toMs(parts[2]!),
    ttfbMs: toMs(parts[3]!),
    totalMs: toMs(parts[4]!),
    sizeBytes: Number(parts[5]),
  }
}

// ---- Traceroute ----------------------------------------------------

export type TraceHop = {
  hop: number
  host: string
  ip?: string
  avgMs?: number
}

export async function tracerouteHost(
  host: string,
  maxHops = 30,
): Promise<TraceHop[]> {
  const windows = process.platform === 'win32'
  const bin = windows ? 'tracert' : 'traceroute'
  const args = windows
    ? ['-h', String(maxHops), host]
    : ['-m', String(maxHops), host]
  const { stdout } = await exec([bin, ...args])
  const hops: TraceHop[] = []
  for (const raw of stdout.split('\n')) {
    const line = raw.trim()
    const match = line.match(
      /^(\d+)\s+(\S+)(?:\s+\(([^)]+)\))?\s+(.*)$/,
    )
    if (!match) continue
    const hop = Number(match[1])
    if (!Number.isFinite(hop)) continue
    const rtts = (match[4]!.match(/([\d.]+)\s*ms/g) ?? []).map(s =>
      Number(s.replace(/\s*ms/, '')),
    )
    const avg = rtts.length
      ? rtts.reduce((a, b) => a + b, 0) / rtts.length
      : undefined
    hops.push({
      hop,
      host: match[2]!,
      ip: match[3],
      avgMs: avg !== undefined ? Math.round(avg) : undefined,
    })
  }
  return hops
}

// ---- Interfaces ----------------------------------------------------

export type NetInterface = {
  name: string
  addresses: Array<{ family: 'IPv4' | 'IPv6'; address: string; mac?: string }>
  status: 'up' | 'down'
}

/**
 * `os.networkInterfaces()` is the one place every platform
 * reports the same shape. We augment "up" vs "down" from the
 * fact that Node only lists interfaces that have at least one
 * assigned address — assuming "listed = up" is correct often
 * enough that we don't shell out to `ifconfig` / `ip`.
 */
export function listInterfaces(): NetInterface[] {
  const raw = os.networkInterfaces()
  const out: NetInterface[] = []
  for (const [name, entries] of Object.entries(raw)) {
    if (!entries) continue
    const addresses = entries.map(e => ({
      family: e.family as 'IPv4' | 'IPv6',
      address: e.address,
      mac: e.mac,
    }))
    out.push({ name, addresses, status: 'up' })
  }
  return out
}

// ---- Routes --------------------------------------------------------

export type RouteRow = {
  destination: string
  gateway: string
  interface: string
}

export async function listRoutes(): Promise<RouteRow[]> {
  if (process.platform === 'win32') {
    const { stdout } = await exec(['route', 'print'])
    return parseWindowsRoutes(stdout)
  }
  const { stdout } = await exec(['netstat', '-rn'])
  return parseUnixRoutes(stdout)
}

function parseUnixRoutes(out: string): RouteRow[] {
  const rows: RouteRow[] = []
  // Parse both BSD (macOS) and Linux `netstat -rn` output. Each
  // has distinct column orders, but Destination / Gateway / (Netif
  // or Iface) always appear in the same relative positions.
  let header: string[] | undefined
  for (const raw of out.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (/^Destination\s+/i.test(line) || /^Kernel IP routing/i.test(line)) {
      header = line.toLowerCase().split(/\s+/)
      continue
    }
    if (!header || /^(internet|routing|kernel)/i.test(line)) continue
    const cols = line.split(/\s+/)
    const dst = cols[0]
    const gw = cols[1]
    const iface = cols[cols.length - 1]
    if (!dst || !gw || !iface) continue
    if (dst === 'Destination') continue
    rows.push({ destination: dst, gateway: gw, interface: iface })
  }
  return rows
}

function parseWindowsRoutes(out: string): RouteRow[] {
  const rows: RouteRow[] = []
  for (const line of out.split('\n')) {
    const cols = line.trim().split(/\s+/)
    if (cols.length < 4) continue
    if (!/^\d/.test(cols[0] ?? '')) continue
    rows.push({
      destination: cols[0]!,
      gateway: cols[2]!,
      interface: cols[3]!,
    })
  }
  return rows
}

// ---- DNS -----------------------------------------------------------

export type DnsRecord = { type: string; value: string }

const DEFAULT_DNS_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS']

/**
 * `dig` exists on macOS and most Linux distros; Windows falls
 * back to `nslookup`. We only need the answer section, not the
 * authority / additional blocks.
 */
export async function lookupDns(
  host: string,
  types: string[] = DEFAULT_DNS_TYPES,
): Promise<DnsRecord[]> {
  if (process.platform === 'win32') {
    return lookupViaNslookup(host, types)
  }
  const records: DnsRecord[] = []
  for (const type of types) {
    const { stdout } = await exec(['dig', '+short', host, type])
    for (const line of stdout.split('\n')) {
      const value = line.trim()
      if (value) records.push({ type, value })
    }
  }
  return records
}

async function lookupViaNslookup(
  host: string,
  types: string[],
): Promise<DnsRecord[]> {
  const records: DnsRecord[] = []
  for (const type of types) {
    const { stdout } = await exec(['nslookup', `-type=${type}`, host])
    for (const line of stdout.split('\n')) {
      const m = line.match(/(?:address|mx preference|internet address)[\s=]+(.+)/i)
      if (m) records.push({ type, value: m[1]!.trim() })
    }
  }
  return records
}
