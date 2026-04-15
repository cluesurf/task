// Cross-provider machine usage. Takes one or more fields
// (`cpu,memory,bandwidth,...`) over a time window and either prints
// json, a flat table, or renders a blessed-contrib line chart.
//
// Today only `--platform do` is wired. AWS EC2 / GCP slot in here at
// the switch below when added.

import { listDroplets, measureDropletSeries, type DropletMetric } from '~/code/tool/node/doctl'
import { normalizePlatform } from '~/code/call/list/machine/node'
import { renderLineChart, type LineSeries } from '~/code/tool/terminal/component/chart'
import { compactNumber, humanBytes, renderTable, sparkline } from '~/code/tool/terminal/component/table'

export type UsageView = 'chart' | 'json' | 'table' | 'series'

export type InspectUsageNodeInput = {
  platform: string
  fields: DropletMetric[]
  /** Window like `1h`, `24h`, `2d`. Default `1h`. */
  time?: string
  /** Optional machine id. When omitted every droplet contributes a series. */
  id?: string
  view?: UsageView
  format?: 'json' | 'table'
}

export type UsagePoint = { ts: number[]; x: string[]; y: number[] }

export type UsageResult = {
  field: DropletMetric
  machine: string
  data: UsagePoint
}

export async function inspectUsageNode(source: InspectUsageNodeInput): Promise<void> {
  const p = normalizePlatform(source.platform)
  if (p !== 'do') throw new Error(`unsupported platform: ${source.platform}`)

  const { since, until } = window(source.time ?? '1h')

  const machines = source.id
    ? [{ id: source.id, name: source.id }]
    : await getAllDroplets()

  const results: Array<UsageResult & { name: string }> = []
  for (const m of machines) {
    for (const field of source.fields) {
      const data = await measureDropletSeries(m.id, field, { since, until })
      results.push({ field, machine: m.id, name: m.name, data })
    }
  }

  const view = source.view ?? (source.format === 'json' ? 'json' : 'table')
  if (view === 'json' || source.format === 'json') {
    process.stdout.write(JSON.stringify(results, null, 2) + '\n')
    return
  }

  if (view === 'chart') {
    // One line chart per field. Per series:
    //  - drop machines with no samples (monitoring agent not
    //    installed) — blessed-contrib renders garbage when mixed
    //    with non-empty series
    //  - convert cumulative counters (cpu, bandwidth) to rates so
    //    the y-axis reflects the actual usage swing, not the
    //    monotonic total since boot
    for (const field of source.fields) {
      const series: LineSeries[] = results
        .filter(r => r.field === field && r.data.y.length > 1)
        .map(r => {
          const rate = toRate(field, r.data)
          return { title: r.name, x: rate.x, y: rate.y }
        })

      if (series.length === 0) {
        process.stderr.write(
          `no ${field} samples in ${source.time ?? '1h'} — enable DO monitoring on the droplets and retry.\n`,
        )
        continue
      }

      await renderLineChart({
        label: ` ${field} ${rateUnit(field)} — ${source.time ?? '1h'} `,
        series,
        oneShot: source.fields.length > 1,
      })
    }
    return
  }

  if (view === 'series') {
    // One row per (machine, field, timestamp). Useful for piping
    // into awk / grep / a CSV pipeline when chart mode isn't
    // convenient.
    const columns = [
      { header: 'TIME', align: 'left' as const },
      { header: 'MACHINE', align: 'left' as const },
      { header: 'FIELD', align: 'left' as const },
      { header: 'VALUE', align: 'right' as const },
    ]
    const rows: (string | number | null)[][] = []
    for (const r of results) {
      for (let i = 0; i < r.data.x.length; i++) {
        rows.push([r.data.x[i]!, r.name, r.field, formatField(r.field, r.data.y[i]!)])
      }
    }
    process.stdout.write(
      renderTable({ columns, rows, color: process.stdout.isTTY ?? false }),
    )
    return
  }

  // Default table view: last-value + sparkline preview of the
  // series. Values run through the per-field formatter so memory
  // lands as `4.2 GB`, cpu as a compact number, etc.
  const columns = [
    { header: 'MACHINE', align: 'left' as const },
    { header: 'ID', align: 'left' as const },
    ...source.fields.flatMap(f => [
      { header: f.toUpperCase(), align: 'right' as const },
      { header: `${f.toUpperCase()}·${source.time ?? '1h'}`, align: 'left' as const },
    ]),
  ]
  const rows = machines.map(m => {
    const cells: (string | number | null)[] = [m.name, m.id]
    for (const field of source.fields) {
      const r = results.find(x => x.machine === m.id && x.field === field)
      const last = r?.data.y[r.data.y.length - 1]
      cells.push(last !== undefined ? formatField(field, last) : null)
      cells.push(r && r.data.y.length ? sparkline(r.data.y) : null)
    }
    return cells
  })
  process.stdout.write(
    renderTable({ columns, rows, color: process.stdout.isTTY ?? false }),
  )
}

/** Counter fields (cpu, bandwidth) come back as monotonically
 * increasing totals. Convert to a per-second rate using the real
 * gap between timestamps. Level gauges (memory, load,
 * filesystem-free) pass through unchanged. */
function toRate(
  field: DropletMetric,
  data: { ts: number[]; x: string[]; y: number[] },
): { x: string[]; y: number[] } {
  if (field === 'memory' || field === 'load' || field === 'filesystem-free') {
    return { x: data.x, y: data.y }
  }
  const x: string[] = []
  const y: number[] = []
  for (let i = 1; i < data.y.length; i++) {
    const dt = data.ts[i]! - data.ts[i - 1]!
    if (dt <= 0) continue
    const dy = data.y[i]! - data.y[i - 1]!
    // Negative deltas can happen if a counter resets (host reboot)
    // or if a series skipped a sample — clamp at 0 so chart scale
    // isn't destroyed by spikes.
    y.push(Math.max(0, dy / dt))
    x.push(data.x[i]!)
  }
  return { x, y }
}

function rateUnit(field: DropletMetric): string {
  if (field === 'cpu') return '(cores)'          // rate of cpu-sec/sec ≈ active cores
  if (field === 'bandwidth') return '(B/s)'
  if (field === 'memory') return '(bytes free)'
  if (field === 'filesystem-free') return '(bytes free)'
  if (field === 'load') return '(1-min)'
  return ''
}

function formatField(field: DropletMetric, value: number): string {
  switch (field) {
    case 'memory':
    case 'filesystem-free':
      return humanBytes(value)
    case 'bandwidth':
      return `${humanBytes(value)}/s`
    case 'cpu':
      // DO returns cumulative CPU time in seconds per mode. A raw
      // number isn't directly a percentage, but it is a useful
      // "how much work has this machine done" scalar. Format as
      // hours for readability on long ranges.
      return value > 3600 ? `${(value / 3600).toFixed(1)}h` : compactNumber(value)
    case 'load':
      return compactNumber(value)
  }
}

function window(time: string): { since: string; until: string } {
  const m = time.match(/^(\d+)([hdm])$/)
  if (!m) throw new Error(`bad time: ${time} (try 1h, 24h, 2d)`)
  const [, n, unit] = m
  const seconds = Number(n) * ({ h: 3600, d: 86400, m: 60 } as const)[unit as 'h' | 'd' | 'm']
  const now = Math.floor(Date.now() / 1000)
  return { since: String(now - seconds), until: String(now) }
}

async function getAllDroplets(): Promise<Array<{ id: string; name: string }>> {
  const raw = await listDroplets({ json: true })
  const arr = JSON.parse(raw) as Array<{ id: number | string; name: string }>
  return arr.map(d => ({ id: String(d.id), name: d.name }))
}
