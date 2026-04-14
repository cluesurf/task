/**
 * `task watch process` — clear the screen and reprint the
 * process table on an interval. Doesn't go through `runAction`
 * since the spinner / done lines don't make sense for a loop
 * that only ends on Ctrl-C.
 */

import {
  filterByText,
  listProcesses,
  topProcesses,
} from '~/code/tool/node/proc/base'
import { renderProcesses } from '~/code/tool/node/proc/render'

export type WatchProcessNodeInput = {
  text?: string
  interval: number
  top?: 'cpu' | 'memory'
  limit: number
}

export async function watchProcessNode(input: WatchProcessNodeInput) {
  const color = process.stdout.isTTY ?? false
  let stopped = false
  process.on('SIGINT', () => {
    stopped = true
    process.stdout.write('\n')
    process.exit(0)
  })

  const tick = async () => {
    let list = await listProcesses()
    if (input.text) list = await filterByText(list, input.text)
    if (input.top) list = topProcesses(list, input.top, input.limit)
    else list = list.slice(0, input.limit)

    // Clear screen + move cursor to top-left; keeps the scrollback
    // so Ctrl-C leaves a readable snapshot behind.
    if (color) process.stdout.write('\x1b[2J\x1b[H')
    process.stdout.write(renderProcesses(list, color) + '\n')
    process.stdout.write(`  refresh every ${input.interval}ms — Ctrl-C to exit\n`)
  }

  await tick()
  while (!stopped) {
    await new Promise(r => setTimeout(r, input.interval))
    if (!stopped) await tick()
  }
}
