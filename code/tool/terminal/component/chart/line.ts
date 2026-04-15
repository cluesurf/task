// Generic line-chart renderer over blessed-contrib. Works with any
// series of `{ title, x[], y[] }`. Falls back to JSON on non-TTY so
// piped / CI use stays sane.
//
// Usage:
//   await renderLineChart({
//     label: 'CPU %',
//     series: [{ title: 'droplet-123', x: ['10:00','10:05'], y: [21,32] }],
//   })

/* eslint-disable @typescript-eslint/no-explicit-any */

export type LineSeries = {
  /** Legend label. */
  title: string
  /** X-axis tick labels (usually ISO timestamps, pre-trimmed). */
  x: string[]
  /** Y values (numeric, same length as `x`). */
  y: number[]
  /** Optional color (blessed color name: red, green, yellow, ...). */
  style?: { line?: string }
}

export type LineChartOptions = {
  label?: string
  series: LineSeries[]
  showLegend?: boolean
  /** Exit the screen as soon as `onReady` returns / resolves.
   * Default: interactive (press q / ctrl-c). */
  oneShot?: boolean
  /** Take over the full terminal. Default: full-screen. */
  width?: number
  height?: number
}

export async function renderLineChart(opts: LineChartOptions): Promise<void> {
  // Non-TTY → print a compact JSON envelope and return. Keeps `--view
  // chart | --format json` interchangeable when the user is piping.
  if (!process.stdout.isTTY) {
    process.stdout.write(JSON.stringify({ label: opts.label, series: opts.series }) + '\n')
    return
  }

  // blessed + blessed-contrib are heavy — import lazily so just
  // loading the task CLI doesn't pull in ncurses bindings.
  // Both packages are CommonJS, so ESM dynamic import gives us a
  // namespace wrapper; unwrap the default.
  const blessedNs: any = await importOptional('blessed')
  const contribNs: any = await importOptional('blessed-contrib')
  if (!blessedNs || !contribNs) {
    process.stdout.write(
      JSON.stringify({ label: opts.label, series: opts.series }) + '\n',
    )
    return
  }
  const blessed = blessedNs.default ?? blessedNs
  const contrib = contribNs.default ?? contribNs

  let screen: any
  try {
    screen = blessed.screen({
      smartCSR: true,
      fastCSR: true,
      // `tput: false` disables blessed's terminfo parser — when it
      // can't decode a capability it leaks its own JS source (the
      // `out = [...]; stack.push(...)` wall we'd otherwise see at
      // exit). Built-in color tables are good enough for our use.
      tput: false,
      fullUnicode: true,
      useBCE: true,
      title: opts.label ?? 'chart',
    })
  } catch (err) {
    process.stderr.write(
      `warning: blessed failed to create screen (${(err as Error).message}); falling back to JSON.\n`,
    )
    process.stdout.write(
      JSON.stringify({ label: opts.label, series: opts.series }) + '\n',
    )
    return
  }
  const line = contrib.line({
    label: opts.label ?? '',
    showLegend: opts.showLegend ?? opts.series.length > 1,
    wholeNumbersOnly: false,
    xLabelPadding: 3,
    xPadding: 5,
    style: { text: 'green', baseline: 'black' },
    width: opts.width ?? '100%',
    height: opts.height ?? '100%',
  })
  screen.append(line)
  line.setData(opts.series)
  screen.render()

  const teardown = () => {
    // Full cleanup: restore alt screen, show cursor, clear any
    // half-written escape sequences. Without this, ctrl-c and
    // clean quits leave the terminal in an unusable state.
    try {
      screen.program.disableMouse()
      screen.program.showCursor()
      screen.program.normalBuffer()
      screen.program.clear()
    } catch {}
    try {
      screen.destroy()
    } catch {}
  }

  if (opts.oneShot) {
    await new Promise(r => setTimeout(r, 50))
    teardown()
    return
  }

  await new Promise<void>(resolve => {
    const quit = () => {
      teardown()
      resolve()
    }
    screen.key(['q', 'C-c', 'escape'], quit)
    // Also clean up on SIGINT / SIGTERM so ctrl-c while the chart
    // is open doesn't leave the terminal mangled.
    process.once('SIGINT', quit)
    process.once('SIGTERM', quit)
  })
}

async function importOptional(pkg: string): Promise<any> {
  try {
    return await import(pkg)
  } catch {
    process.stderr.write(
      `warning: ${pkg} not installed; falling back to JSON. Install with:\n  pnpm add blessed blessed-contrib\n`,
    )
    return null
  }
}
