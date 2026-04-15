// Generic bar-chart renderer over blessed-contrib. Falls back to
// a short text table on non-TTY.

/* eslint-disable @typescript-eslint/no-explicit-any */

export type BarChartOptions = {
  label?: string
  categories: string[]
  values: number[]
  maxHeight?: number
  barWidth?: number
  barSpacing?: number
  oneShot?: boolean
}

export async function renderBarChart(opts: BarChartOptions): Promise<void> {
  if (!process.stdout.isTTY) {
    for (const [i, cat] of opts.categories.entries()) {
      process.stdout.write(`${cat}\t${opts.values[i]}\n`)
    }
    return
  }

  const blessedNs: any = await tryImport('blessed')
  const contribNs: any = await tryImport('blessed-contrib')
  if (!blessedNs || !contribNs) {
    for (const [i, cat] of opts.categories.entries()) {
      process.stdout.write(`${cat}\t${opts.values[i]}\n`)
    }
    return
  }
  const blessed = blessedNs.default ?? blessedNs
  const contrib = contribNs.default ?? contribNs

  const screen = blessed.screen({ smartCSR: true, title: opts.label ?? 'chart' })
  const bar = contrib.bar({
    label: opts.label ?? '',
    barWidth: opts.barWidth ?? 6,
    barSpacing: opts.barSpacing ?? 3,
    xOffset: 2,
    maxHeight: opts.maxHeight,
    width: '100%',
    height: '100%',
  })
  screen.append(bar)
  bar.setData({ titles: opts.categories, data: opts.values })
  screen.render()

  if (opts.oneShot) {
    await new Promise(r => setTimeout(r, 50))
    screen.destroy()
    return
  }

  await new Promise<void>(resolve => {
    screen.key(['q', 'C-c', 'escape'], () => {
      screen.destroy()
      resolve()
    })
  })
}

async function tryImport(pkg: string): Promise<any> {
  try {
    return await import(pkg)
  } catch {
    return null
  }
}
