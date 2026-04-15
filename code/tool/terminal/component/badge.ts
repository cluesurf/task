// Colored status pills for table cells. Each badge has a glyph
// + label, rendered as bold foreground on a dark matching bg —
// approximates the soft "chip" style of `task scout`, `task list
// service --status`, etc.
//
// ANSI 256-color palette codes picked for VSCode-dark legibility:
//   green:  fg=46  bg=22
//   red:    fg=203 bg=52
//   dim:    fg=245 bg=236
//   yellow: fg=226 bg=58

import stripAnsi from 'strip-ansi'

export type BadgeTone = 'green' | 'red' | 'dim' | 'yellow' | 'blue'

const PALETTE: Record<BadgeTone, { fg: number; bg: number }> = {
  green:  { fg: 46,  bg: 22 },
  red:    { fg: 203, bg: 52 },
  yellow: { fg: 226, bg: 58 },
  blue:   { fg: 39,  bg: 24 },
  dim:    { fg: 245, bg: 236 },
}

const GLYPH: Record<BadgeTone, string> = {
  green:  '✓',
  red:    '✕',
  yellow: '!',
  blue:   'i',
  dim:    '·',
}

export function badge(tone: BadgeTone, label: string): string {
  const { fg, bg } = PALETTE[tone]
  const glyph = GLYPH[tone]
  // \x1b[1m = bold. Padded with a leading + trailing space so the
  // chip has visual breathing room inside a table cell.
  return `\x1b[48;5;${bg}m\x1b[38;5;${fg}m\x1b[1m ${glyph} ${label} \x1b[0m`
}

/** Visible width of a badge (for table column sizing). */
export function badgeWidth(tone: BadgeTone, label: string): number {
  return stripAnsi(badge(tone, label)).length
}
