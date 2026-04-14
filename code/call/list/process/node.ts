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
import { parseFilter } from '~/code/tool/node/proc/filter'
import {
  DEFAULT_PROCESS_COLUMNS,
  DEFAULT_TREE_COLUMNS,
  isProcessColumn,
  renderGroups,
  renderProcesses,
  renderTree,
  type ProcessColumn,
} from '~/code/tool/node/proc/render'
import { getLoggingStyle } from '~/code/tool/node/log'

export type ListProcessNodeInput = {
  pid?: number
  port?: number
  text?: string
  name?: string
  filter?: string
  user?: string
  top?: 'cpu' | 'memory'
  sort?: string
  direction?: 'increasing' | 'decreasing'
  layout: 'table' | 'tree'
  group?: 'name' | 'user'
  show?: string | string[]
  limit: number
  page: number
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

  // `--show` can arrive as either a single string (`--show
  // memory,cpu`) or yargs may fold repeated flags into an array
  // (`--show memory --show children`). Normalize to an array of
  // trimmed tokens so everything downstream sees the same shape.
  const showParts = toTokens(input.show)
  const wantChildren = showParts.includes('children')
  const hasAnyFilter = !!(input.text || input.name || input.filter || input.user)

  // Tree mode filters differently — a match keeps its whole
  // ancestor chain (so the hit still reads inside its parent
  // hierarchy), and descendants come along only when the caller
  // asks for them via `--show children`. Table mode just reduces
  // to the matching rows.
  let list = all
  if (input.layout === 'tree' && hasAnyFilter) {
    let matches = all
    if (input.text) matches = await filterByText(matches, input.text)
    if (input.name) {
      const match = globToMatcher(input.name)
      matches = matches.filter(p => match(p.name))
    }
    if (input.user) matches = filterByUser(matches, input.user)
    if (input.filter) {
      const predicate = parseFilter(input.filter)
      matches = matches.filter(predicate)
    }
    const keep = expandForTree(all, matches, wantChildren)
    list = all.filter(p => keep.has(p.pid))
  } else {
    if (input.text) list = await filterByText(list, input.text)
    if (input.name) {
      const match = globToMatcher(input.name)
      list = list.filter(p => match(p.name))
    }
    if (input.user) list = filterByUser(list, input.user)
    if (input.filter) {
      const predicate = parseFilter(input.filter)
      list = list.filter(predicate)
    }
  }

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
    if (wantChildren) {
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

  // For tree mode, keep every process so the hierarchy survives —
  // slicing before `buildTree` orphans grandchildren whose parents
  // got cut. Pagination of the tree is applied per-line downstream.
  if (input.layout !== 'tree') {
    const start = Math.max(0, (input.page - 1) * input.limit)
    list = list.slice(start, start + input.limit)
  }

  render(list, input, null)
  return { processes: list }
}

/**
 * Glob → predicate. `*` matches anything, everything else is
 * literal. Case-insensitive for the same ergonomic reason `grep
 * -i` is the common default.
 */
/**
 * Case-insensitive matcher for `--name`. Patterns with `*` are
 * anchored globs (`*ode` = ends with ode, `node*` = starts with
 * node, `*node*` = contains node). Patterns without `*` are
 * treated as substring matches — so `--name chrome` finds
 * "Google Chrome" and "Google Chrome Helper" without needing
 * wildcards.
 */
function globToMatcher(pattern: string): (value: string) => boolean {
  if (pattern.includes('*')) {
    const escaped = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*')
    const rx = new RegExp(`^${escaped}$`, 'i')
    return value => rx.test(value)
  }
  const needle = pattern.toLowerCase()
  return value => value.toLowerCase().includes(needle)
}

function toTokens(raw: string | string[] | undefined): string[] {
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : [raw]
  return list.flatMap(s => s.split(',')).map(s => s.trim()).filter(Boolean)
}

/**
 * Expand a seed set of matches into the pid set that should be
 * rendered in tree mode. Always includes every ancestor chain so
 * each hit reads framed by its parents; descendants follow only
 * when the caller asked for `--show children`.
 */
function expandForTree(
  all: Process[],
  matches: Process[],
  includeDescendants: boolean,
): Set<number> {
  const byPid = new Map<number, Process>()
  const kidsByParent = new Map<number, number[]>()
  for (const p of all) {
    byPid.set(p.pid, p)
    const bucket = kidsByParent.get(p.ppid) ?? []
    bucket.push(p.pid)
    kidsByParent.set(p.ppid, bucket)
  }

  const keep = new Set<number>()
  for (const match of matches) {
    // Walk up the parent chain. pid 1 listing itself as parent
    // (or a cycle on a weird kernel) terminates the walk.
    let cursor: Process | undefined = match
    while (cursor) {
      if (keep.has(cursor.pid)) break
      keep.add(cursor.pid)
      const next = byPid.get(cursor.ppid)
      if (!next || next.pid === cursor.pid) break
      cursor = next
    }
  }
  if (includeDescendants) {
    const queue: number[] = matches.map(m => m.pid)
    while (queue.length > 0) {
      const pid = queue.shift()!
      const kids = kidsByParent.get(pid) ?? []
      for (const child of kids) {
        if (!keep.has(child)) {
          keep.add(child)
          queue.push(child)
        }
      }
    }
  }
  return keep
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
    const rendered = renderTree(
      tree,
      style === 'pretty',
      pickColumns(input.show, DEFAULT_TREE_COLUMNS),
    )
    const lines = rendered.split('\n').filter(l => l.length > 0)
    // When a filter is active, every row on screen is either a
    // match or context for one — slicing would cut legitimate
    // hits. Only paginate when the user asks for it explicitly
    // with `--page N`. The unfiltered tree still honors the
    // limit / page defaults.
    const hasFilter = !!(input.text || input.name || input.filter || input.user)
    if (hasFilter && input.page === 1) {
      process.stdout.write(lines.join('\n') + '\n')
      return
    }
    const start = Math.max(0, (input.page - 1) * input.limit)
    const slice = lines.slice(start, start + input.limit)
    process.stdout.write(slice.join('\n') + '\n')
    return
  }
  process.stdout.write(
    renderProcesses(list, style === 'pretty', pickColumns(input.show)) + '\n',
  )
}

/**
 * Read `--show` into a column list. Unknown tokens are silently
 * dropped (they might be `children`, which is handled above, or
 * a typo — we fall back to the default set in that case).
 */
function pickColumns(
  raw: string | string[] | undefined,
  fallback: ProcessColumn[] = DEFAULT_PROCESS_COLUMNS,
): ProcessColumn[] {
  const tokens = toTokens(raw).map(t => t.toLowerCase())
  const cols = tokens.filter(isProcessColumn)
  return cols.length > 0 ? cols : fallback
}
