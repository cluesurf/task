import { listPorts } from '~/code/tool/node/proc/base'
import { renderPorts } from '~/code/tool/node/proc/render'
import { getLoggingStyle } from '~/code/tool/node/log'

export type ListPortNodeInput = {
  status?: string
  protocol?: 'tcp' | 'udp'
  user?: string
}

export async function listPortNode(input: ListPortNodeInput) {
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

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(renderPorts(list, style === 'pretty') + '\n')
  }
  return { ports: list }
}
