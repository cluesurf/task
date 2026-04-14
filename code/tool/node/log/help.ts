/**
 * Custom help renderer for the task CLI.
 *
 *   task archive
 *   Create an archive from one or more inputs
 *
 *   OPTIONS
 *
 *   *           --tool
 *   *           --input-path
 *   *  -O,      --output-format
 *   *           --output-file-path
 *      -f,      --format       Output style
 *                                 [pretty]   colors + ora spinner   [default]
 *                                 [text]     strips ANSI
 *                                 [json]     emit one JSON object per action
 *      -h,      --help          Show help
 *      -v,      --version       Show version number
 *
 *   EXAMPLE
 *
 *     # archive a directory as a tarball in JSON output mode
 *     task archive --tool tar --input-path ./src -O tar.gz \
 *                  --output-file-path ./dist/src.tar.gz -f json
 *
 * Required options sort to the top with a red `*` in the first
 * column. Choice values render as background-tinted pills; the
 * default value gets an extra green pill at the end of its line.
 *
 * The same renderer drives both the colored and uncolored
 * versions — `tint` itself drops ANSI when stdout isn't a TTY.
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { findHelp, HelpEntry, HelpEntryOption } from './registry'

const HEADLINE: Tint = { tone: 'whiteBright', bold: true }
const SECTION: Tint = { tone: 'blackBright' }
const FLAG: Tint = { tone: 'cyan' }
const REQUIRED: Tint = { tone: 'red' }
const COMMENT: Tint = { tone: 'blackBright' }
const META: Tint = { tone: 'white' }
const CHOICE_PILL: Tint = { tone: 'black', backTone: 'cyan' }
const DEFAULT_PILL: Tint = { tone: 'black', backTone: 'green' }

const REQUIRED_COL = 3
const SHORT_COL = 5
const LONG_COL = 22
const TOTAL_WIDTH = 80
const INDENT = ''

export function renderHelpFor({
  commandPath,
  fallback,
  color,
}: {
  commandPath: string[]
  fallback: string
  color: boolean
}): string {
  const entry = findHelp(commandPath)
  if (!entry) return color ? prettifyYargsHelp(fallback) : fallback
  return renderEntry(entry, color)
}

/**
 * Light tint pass on yargs's stock help — only used when the
 * active command isn't in the custom-help registry (top-level
 * `task --help`, `task convert --help`).
 */
export function prettifyYargsHelp(text: string): string {
  return '\n' + text
    .split('\n')
    .map(raw => {
      if (/^task\b/.test(raw)) return tint(raw, HEADLINE)
      const t = raw.trim()
      if (/^[A-Z][A-Za-z]+:$/.test(t)) return tint(raw, SECTION)
      let out = raw
      out = out.replace(/(\[required\])/g, m => tint(m, REQUIRED))
      out = out.replace(
        /(\[string\]|\[boolean\]|\[number\]|\[array\]|\[count\]|\[default:[^\]]*\]|\[choices:[^\]]*\])/g,
        m => tint(m, COMMENT),
      )
      out = out.replace(
        /(^\s+)(-[A-Za-z](?:,\s+--[A-Za-z][A-Za-z0-9-]*)?|--[A-Za-z][A-Za-z0-9-]*)/,
        (_, lead, flag) => `${lead}${tint(flag, FLAG)}`,
      )
      return out
    })
    .join('\n')
}

function renderEntry(entry: HelpEntry, color: boolean): string {
  const lines: string[] = []

  lines.push('')
  lines.push(paint(entry.command, HEADLINE, color))
  lines.push(paint(entry.describe, META, color))

  if (entry.commands?.length) {
    lines.push('')
    lines.push(paint('COMMANDS', SECTION, color))
    lines.push('')
    const widest = entry.commands.reduce(
      (m, c) => Math.max(m, c.name.length),
      0,
    )
    for (const c of entry.commands) {
      const name = paint(pad(c.name, widest + 4), FLAG, color)
      const describe = paint(c.describe, META, color)
      lines.push('  ' + name + describe)
    }
  }

  if (entry.options.length) {
    lines.push('')
    lines.push(paint('OPTIONS', SECTION, color))
    lines.push('')

    const required = entry.options.filter(o => o.required)
    const optional = entry.options.filter(o => !o.required)
    for (const opt of required) lines.push(...renderOption(opt, true, color))
    for (const opt of optional) lines.push(...renderOption(opt, false, color))
  }

  if (entry.examples?.length) {
    lines.push('')
    lines.push(paint('EXAMPLE', SECTION, color))
    lines.push('')
    for (const ex of entry.examples) {
      if (ex.comment) {
        lines.push('  ' + paint(`# ${ex.comment}`, COMMENT, color))
      }
      lines.push('  ' + tintCommand(ex.command, color))
      lines.push('')
    }
  }

  // Trailing blank so the prompt that follows the help has air.
  lines.push('')

  return lines.join('\n')
}

function renderOption(
  opt: HelpEntryOption,
  required: boolean,
  color: boolean,
): string[] {
  const requiredCell = pad(
    required ? paint('*', REQUIRED, color) : ' ',
    REQUIRED_COL,
  )
  const shortCell = pad(
    opt.short ? paint(`-${opt.short},`, FLAG, color) : '',
    SHORT_COL,
  )
  const longCell = pad(paint(`--${opt.long}`, FLAG, color), LONG_COL)
  const prefix = INDENT + requiredCell + shortCell + longCell

  const descColumn = TOTAL_WIDTH - prefix.length
  const proseLines = wrapProse(opt.describe ?? '', descColumn)

  const out: string[] = []
  out.push(prefix + paint(proseLines[0] ?? '', META, color))
  for (let i = 1; i < proseLines.length; i++) {
    out.push(' '.repeat(prefix.length) + paint(proseLines[i] ?? '', META, color))
  }

  if (opt.choices?.length) {
    const widest = opt.choices.reduce((m, c) => Math.max(m, c.length), 0)
    for (const choice of opt.choices) {
      const isDefault = opt.default === choice
      const pill = choicePill(choice, widest, color)
      let line = ' '.repeat(prefix.length + 2) + pill
      if (isDefault) line += '  ' + defaultPill(color)
      out.push(line)
    }
  } else if (opt.default !== undefined) {
    out.push(
      ' '.repeat(prefix.length + 2) +
        paint(`(default: ${String(opt.default)})`, COMMENT, color),
    )
  }

  return out
}

function choicePill(value: string, widest: number, color: boolean): string {
  const padded = ` ${value.padEnd(widest)} `
  return paint(padded, CHOICE_PILL, color)
}

function defaultPill(color: boolean): string {
  return paint(' default ', DEFAULT_PILL, color)
}

/**
 * Tint a `task ...` example. Identifiers that look like flags
 * (`--input-path`, `-O`) get the FLAG color; the rest stays dim
 * so the eye picks up the keywords first.
 */
function tintCommand(command: string, color: boolean): string {
  return command.replace(
    /(--?[A-Za-z][A-Za-z0-9-]*)/g,
    flag => paint(flag, FLAG, color),
  )
}

function pad(text: string, width: number): string {
  const visible = stripAnsi(text)
  if (visible.length >= width) return text + ' '
  return text + ' '.repeat(width - visible.length)
}

function paint(text: string, tone: Tint, color: boolean): string {
  return color ? tint(text, tone) : stripAnsi(tint(text, tone))
}

function wrapProse(text: string, width: number): string[] {
  if (!text) return ['']
  if (width <= 0) return [text]
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (current.length === 0) current = word
    else if (current.length + 1 + word.length <= width)
      current = current + ' ' + word
    else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}
