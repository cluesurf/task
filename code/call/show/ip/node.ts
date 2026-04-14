/**
 * `task show ip` — one-liner for "what's my IP?".
 *
 *   default    primary non-loopback IPv4 from the first up
 *              interface (en0, eth0, ...)
 *   --all      every interface / every address as a short table
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { listInterfaces } from '~/code/tool/node/network/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const IP: Tint = { tone: 'green' }
const DIM: Tint = { tone: 'white' }

export type ShowIpNodeInput = { all: boolean }

export async function showIpNode(input: ShowIpNodeInput) {
  const ifaces = listInterfaces()
  const style = getLoggingStyle()
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))
  const human = style === 'pretty' || style === 'text'

  if (!input.all) {
    // Pick the first non-internal IPv4 — the one you'd put in a
    // browser on another machine on the same LAN.
    for (const iface of ifaces) {
      if (iface.name === 'lo' || iface.name === 'lo0') continue
      const ipv4 = iface.addresses.find(
        a => a.family === 'IPv4' && !a.address.startsWith('169.254.'),
      )
      if (ipv4) {
        if (human) {
          process.stdout.write(paint(ipv4.address, IP) + '\n')
        }
        return { address: ipv4.address, interface: iface.name }
      }
    }
    if (human) {
      process.stdout.write(paint('(no external IPv4)', DIM) + '\n')
    }
    return { address: null, interface: null }
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
  return { all }
}
