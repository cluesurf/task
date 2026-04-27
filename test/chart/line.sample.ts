/**
 * Minimal blessed-contrib line-chart sample, in TypeScript.
 *
 * Run with:
 *   pnpm tsx test/chart/line.sample.ts
 *
 * Press q / esc / ctrl-c to quit.
 *
 * This is the direct TS port of blessed-contrib's classic README
 * snippet — kept as a sanity check for the generic renderer in
 * code/tool/terminal/component/chart/line.ts.
 */

/* eslint-disable @typescript-eslint/no-require-imports */

import type * as Blessed from 'blessed'

// blessed + blessed-contrib don't ship TypeScript declarations (and
// the @types/blessed ones don't cover blessed-contrib). Cast through
// `any` at the import boundary so the rest of the file stays typed.
const blessed = require('blessed') as typeof Blessed
const contrib = require('blessed-contrib')

const screen = blessed.screen({ smartCSR: true, title: 'line sample' })

const line = contrib.line({
  style: { line: 'yellow', text: 'green', baseline: 'black' },
  xLabelPadding: 3,
  xPadding: 5,
  label: 'Title',
})

const data: { x: string[]; y: number[] } = {
  x: ['t1', 't2', 't3', 't4'],
  y: [5, 1, 7, 5],
}

screen.append(line) // must append before setData
line.setData([data])

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

screen.render()
