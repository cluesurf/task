import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import {
  allPlatformNames,
  platformByName,
  probe,
  type PlatformCheck,
} from '~/code/tool/node/username/platforms'
import { getLoggingStyle, isExplaining } from '~/code/tool/node/log'
import { badge, badgeWidth } from '~/code/tool/terminal/component/badge'

// Header / label tints. Platform column header is lowercase +
// dim so it recedes; the username and pill content carry the
// visual weight.
const HEAD:    Tint = { tone: 'white' }
const DIM:     Tint = { tone: 'blackBright' }
const NAME:    Tint = { tone: 'whiteBright' }
const LEGEND_DOT_FREE:  Tint = { tone: 'green' }
const LEGEND_DOT_TAKEN: Tint = { tone: 'red' }
const LEGEND_DOT_UNK:   Tint = { tone: 'blackBright' }

export type ScoutUsernameNodeInput = {
  /** One or many usernames — matrix view when 2+. */
  usernames: string[]
  platform?: string | string[]
  concurrency?: number
  format?: 'pretty' | 'json'
}

export type ScoutUsernameNodeOutput = {
  usernames: string[]
  platforms: string[]
  /** Flat list for JSON consumers; grid is rendered, not emitted. */
  results: Array<{
    username: string
    platform: string
    status: 'taken' | 'available' | 'unknown'
    url: string
  }>
}

async function scoutUsernameNode(
  input: ScoutUsernameNodeInput,
): Promise<ScoutUsernameNodeOutput> {
  const usernames = input.usernames.filter(Boolean)
  if (usernames.length === 0) {
    throw new Error('scout username: at least one username required')
  }

  const platformNames = resolvePlatforms(input.platform)
  const picks = platformNames
    .map(n => platformByName(n))
    .filter((p): p is PlatformCheck => !!p)

  const missing = platformNames.filter(n => !platformByName(n))
  if (missing.length) {
    process.stderr.write(
      `scout username: unknown platform(s): ${missing.join(', ')}\n` +
      `known: ${allPlatformNames().join(', ')}\n`,
    )
  }

  // Probe every (username, platform) pair in parallel (capped).
  type Cell = {
    username: string
    platform: string
    status: 'taken' | 'available' | 'unknown'
    url: string
  }
  const jobs: Array<{ u: string; p: PlatformCheck }> = []
  for (const u of usernames) for (const p of picks) jobs.push({ u, p })

  const concurrency = Math.max(1, Math.min(20, input.concurrency ?? 8))
  const cells = await runPool(jobs, concurrency, async ({ u, p }): Promise<Cell> => {
    const r = await probe(p, u)
    return { username: u, platform: p.name, status: r.status, url: r.url }
  })

  renderMatrix(usernames, picks.map(p => p.name), cells)

  return {
    usernames,
    platforms: picks.map(p => p.name),
    results: cells,
  }
}

function resolvePlatforms(raw: string | string[] | undefined): string[] {
  if (!raw) return allPlatformNames()
  const list = Array.isArray(raw) ? raw : [raw]
  return list.flatMap(s => s.split(',').map(x => x.trim().toLowerCase())).filter(Boolean)
}

async function runPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (t: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let i = 0
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const idx = i++
      if (idx >= items.length) return
      out[idx] = await fn(items[idx]!)
    }
  })
  await Promise.all(workers)
  return out
}

// ---- matrix renderer --------------------------------------------

function renderMatrix(
  usernames: string[],
  platforms: string[],
  cells: Array<{ username: string; platform: string; status: 'taken' | 'available' | 'unknown'; url: string }>,
): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  if (isExplaining()) return
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))

  const key = (u: string, p: string) => `${u}\u0000${p}`
  const byKey = new Map<string, typeof cells[number]>()
  for (const c of cells) byKey.set(key(c.username, c.platform), c)

  // Badge widths are deterministic (" ✓ free " = 8, " ✕ taken " = 9,
  // " · n/a " = 7). Use the max pill size so columns line up.
  const pillCellWidth = Math.max(
    badgeWidth('green', 'free'),
    badgeWidth('red', 'taken'),
    badgeWidth('dim', 'n/a'),
  )
  const pillWidths = platforms.map(p => Math.max(p.length, pillCellWidth))
  const nameColWidth = Math.max(
    'username'.length,
    ...usernames.map(u => u.length),
  )

  const terminalWidth = Math.max(60, process.stdout.columns ?? 100)
  const leftMargin = 2
  const gutter = 3
  const fixedCost = leftMargin + nameColWidth + gutter
  const chunks = chunkColumns(platforms, pillWidths, terminalWidth - fixedCost, gutter)

  const lines: string[] = ['']

  for (const [chunkIdx, chunk] of chunks.entries()) {
    const { indices } = chunk
    const totalRowWidth =
      leftMargin +
      nameColWidth +
      indices.reduce((acc, i) => acc + gutter + pillWidths[i]!, 0)

    // Header: lowercase platform names in dim white, left-aligned.
    const headerRow: string[] = [paint('username'.padEnd(nameColWidth), HEAD)]
    for (const i of indices) {
      headerRow.push(paint(platforms[i]!.padEnd(pillWidths[i]!), HEAD))
    }
    lines.push(' '.repeat(leftMargin) + headerRow.join(' '.repeat(gutter)))

    // Header underline.
    lines.push(' '.repeat(leftMargin) + paint('─'.repeat(totalRowWidth - leftMargin), DIM))

    for (const [ri, u] of usernames.entries()) {
      const row: string[] = [paint(u.padEnd(nameColWidth), NAME)]
      for (const i of indices) {
        const c = byKey.get(key(u, platforms[i]!))
        row.push(pill(c?.status ?? 'unknown', pillWidths[i]!, color))
      }
      lines.push(' '.repeat(leftMargin) + row.join(' '.repeat(gutter)))
      // Row separator (skip after the last row).
      if (ri < usernames.length - 1) {
        lines.push(' '.repeat(leftMargin) + paint('─'.repeat(totalRowWidth - leftMargin), DIM))
      }
    }

    if (chunkIdx < chunks.length - 1) lines.push('')
  }

  // Legend: • free   • taken   • n/a (colored bullets).
  lines.push('')
  lines.push(
    ' '.repeat(leftMargin) +
      paint('●', LEGEND_DOT_FREE) + ' free   ' +
      paint('●', LEGEND_DOT_TAKEN) + ' taken  ' +
      paint('●', LEGEND_DOT_UNK) + ' n/a',
  )
  lines.push('')

  process.stdout.write(lines.join('\n') + '\n')
}

function chunkColumns(
  platforms: string[],
  widths: number[],
  available: number,
  gutter: number,
): Array<{ indices: number[]; width: number }> {
  const out: Array<{ indices: number[]; width: number }> = []
  let current: number[] = []
  let used = 0
  for (let i = 0; i < platforms.length; i++) {
    const w = widths[i]!
    const add = current.length === 0 ? w : w + gutter
    if (current.length && used + add > available) {
      out.push({ indices: current, width: used })
      current = [i]
      used = w
    } else {
      current.push(i)
      used += add
    }
  }
  if (current.length) out.push({ indices: current, width: used })
  return out
}

/** Colored status badge, padded to `width` on the right so the
 * inter-column gutter stays un-tinted. */
function pill(
  status: 'taken' | 'available' | 'unknown',
  width: number,
  color: boolean,
): string {
  const tone: 'green' | 'red' | 'dim' =
    status === 'available' ? 'green'
  : status === 'taken'     ? 'red'
  :                          'dim'
  const label = status === 'available' ? 'free' : status === 'taken' ? 'taken' : 'n/a'
  const b = color ? badge(tone, label) : ` ${label} `
  const visible = stripAnsi(b).length
  if (visible >= width) return b
  return b + ' '.repeat(width - visible)
}

export default scoutUsernameNode
export { scoutUsernameNode }
