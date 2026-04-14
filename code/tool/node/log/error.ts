/**
 * Pretty CLI error renderer. Matches the help / spinner style:
 *
 *   ERROR
 *   <message>
 *   run `task <verb> --help` to see available commands
 *
 * Use `CliError` when throwing from a handler so the top-level
 * catch in `code/console.ts` can attach a hint. Plain `Error`s
 * still render cleanly — just without the hint line.
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { getLoggingStyle } from './style'

const LABEL: Tint = { tone: 'red', bold: true }
const MESSAGE: Tint = { tone: 'white' }
const HINT: Tint = { tone: 'blackBright' }
const FLAG: Tint = { tone: 'cyan' }

export class CliError extends Error {
  readonly hint?: string
  constructor(message: string, options?: { hint?: string }) {
    super(message)
    this.name = 'CliError'
    this.hint = options?.hint
  }
}

/**
 * JS runtime error classes whose messages read like compiler
 * diagnostics (`x.split is not a function`). A user hitting one
 * of these wasn't trying to debug node internals, so we rewrite
 * them to a generic "something went wrong internally" line and
 * stash the real message in `DEBUG` mode only.
 */
const INTERNAL_ERROR_NAMES = new Set([
  'TypeError',
  'ReferenceError',
  'SyntaxError',
  'RangeError',
  'URIError',
  'EvalError',
])

export function renderCliError(err: unknown): string {
  const color = getLoggingStyle() === 'pretty'
  const paint = (text: string, tone: Tint) =>
    color ? tint(text, tone) : stripAnsi(tint(text, tone))

  const { message, hint } = summarize(err)

  const lines: string[] = []
  lines.push('')
  lines.push(paint('ERROR', LABEL))
  lines.push(paint(message, MESSAGE))
  if (hint) {
    // Tint tokens that look like flags (`--help`, `-i`) or full
    // `task ...` invocations so the eye picks them out.
    const tinted = hint.replace(
      /(`[^`]+`)/g,
      m => paint(m.slice(1, -1), FLAG),
    )
    lines.push(paint(tinted, HINT))
  }
  lines.push('')
  return lines.join('\n')
}

function summarize(err: unknown): { message: string; hint?: string } {
  if (err instanceof CliError) {
    return { message: err.message, hint: err.hint }
  }
  if (err instanceof Error) {
    if (INTERNAL_ERROR_NAMES.has(err.name)) {
      const debug = process.env.TASK_DEBUG
      return {
        message: debug
          ? `unexpected internal error — ${err.name}: ${err.message}`
          : 'unexpected internal error',
        hint: debug
          ? 'stack trace above — please report at github.com/cluesurf/task/issues'
          : 'set `TASK_DEBUG=1` for details, or report at github.com/cluesurf/task/issues',
      }
    }
    return { message: err.message }
  }
  return { message: String(err) }
}

export function printCliError(err: unknown): void {
  process.stderr.write(renderCliError(err) + '\n')
}
