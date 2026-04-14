import {
  buildTree,
  childrenOf,
  filterByText,
  filterByUser,
  groupBy,
  listPorts,
  listProcesses,
  sortProcesses,
  subtree,
  topProcesses,
  type Process,
  type SortKey,
} from '~/code/tool/node/proc/base'
import {
  renderGroups,
  renderProcesses,
  renderTree,
} from '~/code/tool/node/proc/render'
import { getLoggingStyle } from '~/code/tool/node/log'

export type ListProcessNodeInput = {
  pid?: number
  port?: number
  text?: string
  user?: string
  top?: 'cpu' | 'memory'
  sort?: string
  direction?: 'increasing' | 'decreasing'
  layout: 'table' | 'tree'
  group?: 'name' | 'user'
  show?: string
  limit: number
}

export async function listProcessNode(input: ListProcessNodeInput) {
  const all = await listProcesses()

  // --port short-circuits everything else — caller wants "who owns
  // this port?" answered as a single-row table.
  if (input.port !== undefined) {
    const ports = await listPorts()
    const hit = ports.find(p => p.port === input.port)
    const match = hit ? all.find(p => p.pid === hit.pid) : undefined
    const rows = match ? [match] : []
    render(rows, input, null)
    return { processes: rows }
  }

  let list = all
  if (input.text) list = filterByText(list, input.text)
  if (input.user) list = filterByUser(list, input.user)

  // Positional PID narrows to that subtree (for --layout tree) or
  // that pid's children (for --show children), otherwise just
  // that single process.
  if (input.pid !== undefined) {
    if (input.layout === 'tree') {
      const node = subtree(list, input.pid)
      const style = getLoggingStyle()
      if (style === 'pretty' || style === 'text')
        process.stdout.write(
          renderTree(node ? [node] : [], style === 'pretty') + '\n',
        )
      return { tree: node }
    }
    if (input.show === 'children') {
      list = childrenOf(list, input.pid)
    } else {
      list = list.filter(p => p.pid === input.pid)
    }
  }

  // Group-by short-circuits the table path with its own shape.
  if (input.group) {
    const groups = groupBy(list, input.group)
    const style = getLoggingStyle()
    if (style === 'pretty' || style === 'text')
      process.stdout.write(renderGroups(groups, style === 'pretty') + '\n')
    return { groups }
  }

  if (input.top) list = topProcesses(list, input.top, input.limit)
  else if (input.sort)
    list = sortProcesses(
      list,
      input.sort as SortKey,
      input.direction ?? 'decreasing',
    )

  list = list.slice(0, input.limit)

  render(list, input, null)
  return { processes: list }
}

function render(
  list: Process[],
  input: ListProcessNodeInput,
  _opts: unknown,
): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return

  if (input.layout === 'tree') {
    const tree = buildTree(list)
    process.stdout.write(renderTree(tree, style === 'pretty') + '\n')
    return
  }
  process.stdout.write(renderProcesses(list, style === 'pretty') + '\n')
}
