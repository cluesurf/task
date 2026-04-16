import { listPorts, type PortRow } from '~/code/tool/node/proc/make'
import { renderPorts } from '~/code/tool/node/proc/render'
import { getLoggingStyle } from '~/code/tool/node/log'

export type PortSortKey = 'port' | 'protocol' | 'status' | 'pid' | 'user' | 'command'
export type Direction = 'increasing' | 'decreasing'

export type ListPortNodeInput = {
  status?: string
  protocol?: 'tcp' | 'udp'
  user?: string
  sort?: PortSortKey
  direction?: Direction
}

async function listPortNode(input: ListPortNodeInput) {
  let list = await listPorts()

  if (input.status) {
    const needle = input.status.toLowerCase()
    // `open` is the human-facing alias for LISTEN here — `lsof`
    // reports ESTABLISHED and LISTEN as its two live states.
    const want = needle === 'open' ? 'listen' : needle
    list = list.filter(p => p.status.toLowerCase() === want)
  }
  if (input.protocol) {
    const want = input.protocol.toLowerCase()
    list = list.filter(p => p.protocol.toLowerCase().startsWith(want))
  }
  if (input.user) list = list.filter(p => p.user === input.user)
  if (input.sort) {
    list = sortPorts(list, input.sort, input.direction ?? 'increasing')
  }

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(renderPorts(list, style === 'pretty') + '\n')
  }
  return { ports: list }
}

function sortPorts(
  list: PortRow[],
  key: PortSortKey,
  direction: Direction,
): PortRow[] {
  const sign = direction === 'decreasing' ? -1 : 1
  return [...list].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (typeof av === 'number' && typeof bv === 'number') {
      return sign * (av - bv)
    }
    return sign * String(av).localeCompare(String(bv))
  })
}

export default listPortNode
export { listPortNode }
