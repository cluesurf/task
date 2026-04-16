/**
 * `task show ip` — one-liner for "what's my IP?".
 *
 *   default    primary non-loopback IPv4 from the first up
 *              interface (en0, eth0, ...)
 *   --all      every interface / every address as a short table
 */

/**
 * `task show ip` — two scopes:
 *
 *   --scope local (default)   the LAN IP reported by
 *                             `os.networkInterfaces()` — the one a
 *                             peer on the same network would use.
 *   --scope public            the WAN IP as seen by the open
 *                             internet. Queries ipify's HTTPS
 *                             endpoint; falls back to checkip.
 *
 * `--all` expands --scope local into a per-interface dump.
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { listInterfaces } from '~/code/tool/node/network/make'
import { getLoggingStyle } from '~/code/tool/node/log'

const IP: Tint = { tone: 'green' }
const DIM: Tint = { tone: 'white' }

const PUBLIC_IP_ENDPOINTS = [
  'https://api.ipify.org',
  'https://ifconfig.me/ip',
  'https://icanhazip.com',
]

export type ShowIpNodeInput = {
  scope: 'local' | 'public'
  all: boolean
}

async function showIpNode(input: ShowIpNodeInput) {
  const style = getLoggingStyle()
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))
  const human = style === 'pretty' || style === 'text'

  if (input.scope === 'public') {
    const address = await fetchPublicIp()
    if (human) {
      process.stdout.write(
        (address ? paint(address, IP) : paint('(unavailable)', DIM)) + '\n',
      )
    }
    return { address, scope: 'public' as const }
  }

  const ifaces = listInterfaces()

  if (!input.all) {
    // Pick the first non-internal IPv4 — the one you'd put in a
    // browser on another machine on the same LAN.
    for (const iface of ifaces) {
      if (iface.name === 'lo' || iface.name === 'lo0') continue
      const ipv4 = iface.addresses.find(
        a => a.family === 'IPv4' && !a.address.startsWith('169.254.'),
      )
      if (ipv4) {
        if (human) process.stdout.write(paint(ipv4.address, IP) + '\n')
        return { address: ipv4.address, interface: iface.name, scope: 'local' as const }
      }
    }
    if (human) process.stdout.write(paint('(no external IPv4)', DIM) + '\n')
    return { address: null, interface: null, scope: 'local' as const }
  }

  const all = ifaces.flatMap(iface =>
    iface.addresses.map(a => ({
      interface: iface.name,
      family: a.family,
      address: a.address,
    })),
  )

  if (human) {
    for (const row of all) {
      process.stdout.write(
        paint(row.interface.padEnd(8), DIM) +
          ' ' +
          paint(row.family.padEnd(5), DIM) +
          ' ' +
          paint(row.address, IP) +
          '\n',
      )
    }
  }
  return { all, scope: 'local' as const }
}

/**
 * Walk the provider list until one answers with a plausible IP.
 * Uses the global `fetch` (Node 18+) with a short timeout so an
 * offline machine fails fast instead of hanging.
 */
async function fetchPublicIp(): Promise<string | null> {
  for (const url of PUBLIC_IP_ENDPOINTS) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3000)
    try {
      const response = await fetch(url, { signal: controller.signal })
      const text = (await response.text()).trim()
      if (/^[0-9a-fA-F.:]+$/.test(text)) return text
    } catch {
      // Provider failed — try the next one.
    } finally {
      clearTimeout(timer)
    }
  }
  return null
}

export default showIpNode
export { showIpNode }
