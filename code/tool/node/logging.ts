/**
 * CLI output layer. Every action going through `buildActionCommand`
 * runs via `runAction`, which picks one of three presentation modes:
 *
 *   - `pretty` (default): ora spinner + chalk-tinted status lines.
 *     What a dev sees in a terminal.
 *   - `text`: plain ASCII — no ANSI, no animation. Pipe-friendly.
 *   - `json`: one JSON object per action, printed to stdout on
 *     completion. Designed for machines parsing task's output.
 *
 * Mode is selected by `--format` / `-f` on the root console, with
 * `pretty` as the fallback when the flag is missing.
 *
 * The programmatic `new Task()` API never goes through here — so
 * none of ora / chalk / tint ever loads at import time for library
 * users.
 */

import stripAnsi from 'strip-ansi'
import tint, { Tint } from '@termsurf/tint-text'
import snakeCase from 'lodash/snakeCase'
import ora, { Ora } from 'ora'

export type LoggingStyle = 'pretty' | 'text' | 'json' | 'json:pretty'

let STYLE: LoggingStyle = 'pretty'

export function setLoggingStyle(style: LoggingStyle): void {
  STYLE = style
}

export function getLoggingStyle(): LoggingStyle {
  return STYLE
}

/** Coerce `--format` argv value to a valid `LoggingStyle`. */
export function resolveLoggingStyle(value: unknown): LoggingStyle {
  switch (value) {
    case 'text':
    case 'plain':
      return 'text'
    case 'json':
      return 'json'
    case 'json:pretty':
      return 'json:pretty'
    default:
      return 'pretty'
  }
}

export type RunActionInput<R> = {
  action: string
  input: Record<string, unknown>
  run: () => Promise<R>
}

/**
 * Wrap a single action invocation with the active output mode.
 * Returns the handler's resolved value; throws if it threw (with
 * presentation handled per-mode before re-throwing).
 */
export async function runAction<R>({
  action,
  input,
  run,
}: RunActionInput<R>): Promise<R> {
  const started = Date.now()
  const from = readPath(input, ['input', 'format'])
  const to = readPath(input, ['output', 'format'])
  const inputPath = firstPath(input, [
    ['input', 'path'],
    ['input', 'file', 'path'],
    ['input', 'directory', 'path'],
  ])

  if (STYLE === 'json' || STYLE === 'json:pretty') {
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

  if (STYLE === 'text') {
    process.stderr.write(
      renderStartLine({
        action,
        from,
        to,
        path: inputPath,
        color: false,
      }) + '\n',
    )
    try {
      const result = await run()
      process.stderr.write(
        renderDoneLine({
          action,
          from,
          to,
          path: firstPath(input, [
            ['output', 'file', 'path'],
            ['output', 'directory', 'path'],
            ['output', 'path'],
          ]),
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
          reason:
            error instanceof Error ? error.message : String(error),
          color: false,
          ok: false,
        }) + '\n',
      )
      throw error
    }
  }

  // STYLE === 'pretty'
  const startText = renderStartLine({
    action,
    from,
    to,
    path: inputPath,
    color: true,
  })
  const spinner: Ora = ora().start(startText)
  try {
    const result = await run()
    spinner.succeed(
      renderDoneLine({
        action,
        from,
        to,
        path: firstPath(input, [
          ['output', 'file', 'path'],
          ['output', 'directory', 'path'],
          ['output', 'path'],
        ]),
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

const DIM: Tint = { tone: 'blackBright' }
const CYAN: Tint = { tone: 'cyan' }
const CYAN_BOLD: Tint = { tone: 'cyan', bold: true }
const GREEN: Tint = { tone: 'green' }
const GREEN_BOLD: Tint = { tone: 'green', bold: true }
const RED: Tint = { tone: 'red' }
const RED_BOLD: Tint = { tone: 'red', bold: true }

function renderStartLine({
  action,
  from,
  to,
  path,
  color,
}: {
  action: string
  from?: string
  to?: string
  path?: string
  color: boolean
}): string {
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

function renderDoneLine({
  action,
  from,
  to,
  path,
  reason,
  color,
  ok,
}: {
  action: string
  from?: string
  to?: string
  path?: string
  reason?: string
  color: boolean
  ok: boolean
}): string {
  const TONE_HEAD = ok ? GREEN : RED_BOLD
  const TONE_FMT = ok ? GREEN_BOLD : RED_BOLD
  const TONE_PATH = ok ? GREEN : RED

  const pieces: string[] = []
  pieces.push(paint('task <', DIM, color))
  pieces.push(
    paint(
      ok
        ? verbPast(action)
        : `Failed ${verbPresent(action).toLowerCase()}`,
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

function emitJson(payload: Record<string, unknown>): void {
  const spaced = STYLE === 'json:pretty'
  process.stdout.write(
    JSON.stringify(toSnakeKeys(payload), null, spaced ? 2 : 0) + '\n',
  )
}

/**
 * Recursively rewrite every object key as snake_case. Lets the
 * JSON output stay consumable from snake-style ecosystems
 * (Python, SQL, Ruby) without per-field renaming.
 */
function toSnakeKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(toSnakeKeys)
  }
  if (
    value &&
    typeof value === 'object' &&
    value.constructor === Object
  ) {
    const out: Record<string, unknown> = {}
    for (const [key, v] of Object.entries(
      value as Record<string, unknown>,
    )) {
      out[snakeCase(key)] = toSnakeKeys(v)
    }
    return out
  }
  return value
}

function readPath(
  obj: Record<string, unknown>,
  path: string[],
): string | undefined {
  let cursor: unknown = obj
  for (const key of path) {
    if (cursor == null || typeof cursor !== 'object') return undefined
    cursor = (cursor as Record<string, unknown>)[key]
  }
  return typeof cursor === 'string' ? cursor : undefined
}

function firstPath(
  obj: Record<string, unknown>,
  paths: string[][],
): string | undefined {
  for (const p of paths) {
    const v = readPath(obj, p)
    if (v) return v
  }
  return undefined
}

const PAST: Record<string, string> = {
  archive: 'Archived',
  convert: 'Converted',
  format: 'Formatted',
  compile: 'Compiled',
  download: 'Downloaded',
  upload: 'Uploaded',
  extract: 'Extracted',
  optimize: 'Optimized',
  sanitize: 'Sanitized',
  validate: 'Validated',
  verify: 'Verified',
  inspect: 'Inspected',
  resize: 'Resized',
  crop: 'Cropped',
  slice: 'Sliced',
  generate: 'Generated',
  remove: 'Removed',
  parse: 'Parsed',
  disassemble: 'Disassembled',
  check: 'Checked',
}

const PRESENT: Record<string, string> = {
  archive: 'Archiving',
  convert: 'Converting',
  format: 'Formatting',
  compile: 'Compiling',
  download: 'Downloading',
  upload: 'Uploading',
  extract: 'Extracting',
  optimize: 'Optimizing',
  sanitize: 'Sanitizing',
  validate: 'Validating',
  verify: 'Verifying',
  inspect: 'Inspecting',
  resize: 'Resizing',
  crop: 'Cropping',
  slice: 'Slicing',
  generate: 'Generating',
  remove: 'Removing',
  parse: 'Parsing',
  disassemble: 'Disassembling',
  check: 'Checking',
}

function verbPast(action: string): string {
  return PAST[action] ?? capitalize(action)
}

function verbPresent(action: string): string {
  return PRESENT[action] ?? capitalize(action)
}

function capitalize(word: string): string {
  if (word.length === 0) return word
  return word[0]!.toUpperCase() + word.slice(1)
}

const HELP_HEADLINE: Tint = { tone: 'cyan', bold: true }
const HELP_SECTION: Tint = { tone: 'magenta', bold: true }
const HELP_FLAG: Tint = { tone: 'cyan' }
const HELP_REQUIRED: Tint = { tone: 'red', bold: true }
const HELP_META: Tint = { tone: 'blackBright' }

/**
 * Tint yargs's default help output for the `pretty` logging mode.
 * Plain-text input → ANSI-colored output. Recognised patterns:
 *
 *   - First non-blank line (`task <verb>`) → bold cyan headline
 *   - Section headers (`Options:`, `Commands:`) → bold magenta
 *   - `[required]` markers → red bold
 *   - `[string]` / `[boolean]` / `[number]` / `[choices: ...]` /
 *     `[default: ...]` → dim
 *   - Short/long flag prefixes like `  -h, --help` → bold cyan
 */
export function prettifyYargsHelp(text: string): string {
  const lines = text.split('\n')
  let headlineSeen = false

  return lines
    .map(raw => {
      if (!headlineSeen && raw.trim().length > 0) {
        headlineSeen = true
        return tint(raw, HELP_HEADLINE)
      }

      if (/^[A-Z][A-Za-z]+:$/.test(raw.trim())) {
        return tint(raw, HELP_SECTION)
      }

      let out = raw
      out = out.replace(/(\[required\])/g, m => tint(m, HELP_REQUIRED))
      out = out.replace(
        /(\[string\]|\[boolean\]|\[number\]|\[array\]|\[count\]|\[default:[^\]]*\]|\[choices:[^\]]*\])/g,
        m => tint(m, HELP_META),
      )
      out = out.replace(
        /(^\s+)(-[A-Za-z](?:,\s+--[A-Za-z][A-Za-z0-9-]*)?|--[A-Za-z][A-Za-z0-9-]*)/,
        (_, lead, flag) => `${lead}${tint(flag, HELP_FLAG)}`,
      )
      return out
    })
    .join('\n')
}
