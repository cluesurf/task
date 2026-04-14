/**
 * `runAction` — wrap a single action invocation with the active
 * output mode. The CLI `buildActionCommand` helper calls this for
 * every command; the programmatic `Task` class never does.
 *
 *   - `pretty`: ora spinner + colored start/done lines.
 *   - `text`: plain start/done lines, no animation, no ANSI.
 *   - `json` / `json:pretty`: one JSON event on stdout per action.
 *
 * Errors are presented per-mode (✖ on the spinner, plain `Failed`
 * line in text, `status: 'error'` in JSON) and then re-thrown so
 * the caller's process-exit logic stays in charge.
 */

import ora, { Ora } from 'ora'
import { getLoggingStyle } from './style'
import { firstPath, readPath } from './path'
import { renderStartLine, renderDoneLine } from './render'
import { emitJson } from './json'

const INPUT_PATH_KEYS: string[][] = [
  ['input', 'path'],
  ['input', 'file', 'path'],
  ['input', 'directory', 'path'],
]

const OUTPUT_PATH_KEYS: string[][] = [
  ['output', 'file', 'path'],
  ['output', 'directory', 'path'],
  ['output', 'path'],
]

export type RunActionInput<R> = {
  action: string
  input: Record<string, unknown>
  run: () => Promise<R>
}

/**
 * Read verbs print their output as the content of the command
 * (a table, a glyph sequence, etc.). Prefixing that with a start
 * + done spinner would just clutter the visible output, so we
 * skip the lifecycle lines in pretty/text modes. JSON mode still
 * emits the single event so machine consumers can tell the shape
 * of what came back.
 */
const SILENT_ACTIONS = new Set([
  'inspect', 'get', 'check', 'shape', 'list', 'halt',
  'show', 'ping', 'measure', 'trace', 'scan', 'copy',
])

export async function runAction<R>({
  action,
  input,
  run,
}: RunActionInput<R>): Promise<R> {
  const style = getLoggingStyle()
  const started = Date.now()
  const from = readPath(input, ['input', 'format'])
  const to = readPath(input, ['output', 'format'])
  const inputPath = firstPath(input, INPUT_PATH_KEYS)
  const silent = SILENT_ACTIONS.has(action)

  if (style === 'json' || style === 'json:pretty') {
    try {
      const result = await run()
      emitJson({
        status: 'ok',
        action,
        input,
        result,
        duration_ms: Date.now() - started,
      })
      return result
    } catch (error) {
      emitJson({
        status: 'error',
        action,
        input,
        error: error instanceof Error ? error.message : String(error),
        duration_ms: Date.now() - started,
      })
      throw error
    }
  }

  if (silent) {
    try {
      return await run()
    } catch (error) {
      // Re-throw so the top-level catch renders the pretty error
      // block. No spinner to fail out of.
      throw error
    }
  }

  if (style === 'text') {
    process.stderr.write(
      renderStartLine({ action, from, to, path: inputPath, color: false }) +
        '\n',
    )
    try {
      const result = await run()
      process.stderr.write(
        renderDoneLine({
          action,
          from,
          to,
          path: firstPath(input, OUTPUT_PATH_KEYS),
          color: false,
          ok: true,
        }) + '\n',
      )
      return result
    } catch (error) {
      process.stderr.write(
        renderDoneLine({
          action,
          from,
          to,
          reason: error instanceof Error ? error.message : String(error),
          color: false,
          ok: false,
        }) + '\n',
      )
      throw error
    }
  }

  // style === 'pretty'
  const spinner: Ora = ora({ spinner: 'dots' }).start(
    renderStartLine({ action, from, to, path: inputPath, color: true }),
  )
  try {
    const result = await run()
    spinner.succeed(
      renderDoneLine({
        action,
        from,
        to,
        path: firstPath(input, OUTPUT_PATH_KEYS),
        color: true,
        ok: true,
      }),
    )
    return result
  } catch (error) {
    spinner.fail(
      renderDoneLine({
        action,
        from,
        to,
        reason: error instanceof Error ? error.message : String(error),
        color: true,
        ok: false,
      }),
    )
    throw error
  }
}
