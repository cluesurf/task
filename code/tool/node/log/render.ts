/**
 * Pure renderers for the start/done log lines emitted by the
 * spinner / text modes. Keep this module side-effect-free — the
 * spinner orchestrator (`run.ts`) decides what to do with the
 * returned string.
 */

import stripAnsi from 'strip-ansi'
import tint, { Tint } from '@termsurf/tint-text'
import { verbPast, verbPresent } from './verb'

const DIM: Tint = { tone: 'blackBright' }
const CYAN: Tint = { tone: 'cyan' }
const CYAN_BOLD: Tint = { tone: 'cyan', bold: true }
const GREEN: Tint = { tone: 'green' }
const GREEN_BOLD: Tint = { tone: 'green', bold: true }
const RED: Tint = { tone: 'red' }
const RED_BOLD: Tint = { tone: 'red', bold: true }

export type RenderInput = {
  action: string
  from?: string
  to?: string
  path?: string
  color: boolean
}

export type RenderDoneInput = RenderInput & {
  reason?: string
  ok: boolean
}

export function renderStartLine({
  action,
  from,
  to,
  path,
  color,
}: RenderInput): string {
  const pieces: string[] = []
  pieces.push(paint('task <', DIM, color))
  pieces.push(paint(verbPresent(action), CYAN, color))
  if (from) pieces.push(' ', paint(from, CYAN_BOLD, color))
  if (to) {
    pieces.push(
      ' ',
      paint('→', CYAN, color),
      ' ',
      paint(to, CYAN_BOLD, color),
    )
  }
  pieces.push(paint('>', DIM, color))
  if (path) {
    pieces.push(
      '\n  ',
      paint('take <', DIM, color),
      paint(path, CYAN, color),
      paint('>', DIM, color),
    )
  }
  return pieces.join('')
}

export function renderDoneLine({
  action,
  from,
  to,
  path,
  reason,
  color,
  ok,
}: RenderDoneInput): string {
  const TONE_HEAD = ok ? GREEN : RED_BOLD
  const TONE_FMT = ok ? GREEN_BOLD : RED_BOLD
  const TONE_PATH = ok ? GREEN : RED

  const pieces: string[] = []
  pieces.push(paint('task <', DIM, color))
  pieces.push(
    paint(
      ok ? verbPast(action) : `Failed ${verbPresent(action).toLowerCase()}`,
      TONE_HEAD,
      color,
    ),
  )
  if (from) pieces.push(' ', paint(from, TONE_FMT, color))
  if (to) {
    pieces.push(
      ' ',
      paint('→', TONE_HEAD, color),
      ' ',
      paint(to, TONE_FMT, color),
    )
  }
  pieces.push(paint('>', DIM, color))
  if (path) {
    pieces.push(
      '\n  ',
      paint('make <', DIM, color),
      paint(path, TONE_PATH, color),
      paint('>', DIM, color),
    )
  }
  if (reason) {
    pieces.push(
      '\n  ',
      paint('kink <', DIM, color),
      paint(reason, RED, color),
      paint('>', DIM, color),
    )
  }
  return pieces.join('')
}

function paint(text: string, tone: Tint, color: boolean): string {
  return color ? tint(text, tone) : stripAnsi(tint(text, tone))
}
