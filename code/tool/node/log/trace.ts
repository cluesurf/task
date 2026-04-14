/**
 * Global execution trace mode. `--explain` prints the native
 * commands a verb would run and exits before executing them;
 * `--log` executes them and streams their stdout / stderr through
 * an optional grep-style pattern.
 *
 * Wired from `code/console.ts`'s global options; read from
 * `code/tool/node/command.ts`'s `runCommand` wrapper. Every
 * downstream tool (ffmpeg, convert, ttx, ...) flows through
 * that wrapper, so one hook covers every verb.
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { getLoggingStyle } from './style'

export type TraceMode = 'run' | 'explain' | 'log'

type TraceState = { mode: TraceMode; pattern?: RegExp }

let state: TraceState = { mode: 'run' }

export function setTrace(mode: TraceMode, rawPattern?: string): void {
  state = { mode, pattern: rawPattern ? globToRegex(rawPattern) : undefined }
}

export function getTrace(): TraceState {
  return state
}

/** True when `--explain` is active — handlers should skip
 * rendering their (empty) results so only the `$ cmd` lines
 * surface in the output. */
export function isExplaining(): boolean {
  return state.mode === 'explain'
}

const FLAG: Tint = { tone: 'cyan' }
const HEAD: Tint = { tone: 'blackBright' }

function paint(s: string, tone: Tint): string {
  const color = getLoggingStyle() === 'pretty'
  return color ? tint(s, tone) : stripAnsi(tint(s, tone))
}

/** Print a `$ cmd arg arg` line for `--explain` / `--log`. */
export function printTraceLine(argv: string[]): void {
  const cmd = argv
    .map(a => (/[\s"'$`]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a))
    .join(' ')
  process.stderr.write(paint('$ ', HEAD) + paint(cmd, FLAG) + '\n')
}

/** Print one line of subprocess output, filtered by the pattern if set. */
export function printTraceOutput(line: string): void {
  if (!line) return
  if (state.pattern && !state.pattern.test(stripAnsi(line))) return
  process.stderr.write('  ' + line + '\n')
}

function globToRegex(pat: string): RegExp {
  // Minimal glob → regex: `*` matches anything, everything else is
  // treated literally. Case-insensitive for grep-like ergonomics.
  const escaped = pat
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
  return new RegExp(escaped, 'i')
}
