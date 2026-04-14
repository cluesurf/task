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
  const entry =
    findHelp(commandPath) ?? synthesizeEntryFromYargs(commandPath, fallback)
  if (!entry) return fallback
  return renderEntry(entry, color)
}

/**
 * Backwards-compatible shim. The custom renderer now handles every
 * help path — when no `registerHelp` entry exists we synthesize one
 * from yargs's stock text via `synthesizeEntryFromYargs`. This
 * function stays exported so existing callers compile, but it just
 * runs the same path as `renderHelpFor`.
 *
 * @deprecated import `renderHelpFor` instead.
 */
export function prettifyYargsHelp(text: string): string {
  return renderHelpFor({ commandPath: [], fallback: text, color: true })
}

/**
 * Parse yargs's stock help output into a `HelpEntry` so the new
 * tinted renderer can handle commands that didn't call
 * `registerHelp`. The format is stable enough for a line-oriented
 * parse — section headers (`Commands:`, `Options:`, `Positionals:`,
 * `Examples:`) bracket each block.
 */
function synthesizeEntryFromYargs(
  commandPath: string[],
  text: string,
): HelpEntry | undefined {
  if (!text.trim()) return undefined

  const lines = text.split('\n')
  const command = ['task', ...commandPath].join(' ').trim() || 'task'

  // Body before the first section header is the describe blurb.
  let describe = ''
  const options: HelpEntryOption[] = []
  const commands: { name: string; describe: string }[] = []
  const examples: { command: string; comment?: string }[] = []

  let section: 'preamble' | 'commands' | 'options' | 'positionals' | 'examples' =
    'preamble'

  for (const raw of lines) {
    const trimmed = raw.trim()

    // Section headers (yargs always uses `Foo:` form).
    if (/^Commands:\s*$/i.test(trimmed))    { section = 'commands';    continue }
    if (/^Options:\s*$/i.test(trimmed))     { section = 'options';     continue }
    if (/^Positionals:\s*$/i.test(trimmed)) { section = 'positionals'; continue }
    if (/^Examples:\s*$/i.test(trimmed))    { section = 'examples';    continue }

    if (section === 'preamble') {
      // First non-empty line that isn't the script name is the
      // command's describe blurb.
      if (trimmed && !trimmed.startsWith('task ') && !describe) {
        describe = trimmed
      }
      continue
    }

    if (!trimmed) continue

    if (section === 'commands' || section === 'positionals') {
      // Pattern: `<name>  <describe>  [tag]...`
      const m = trimmed.match(/^(\S+)\s+(.+?)(?:\s+\[[^\]]+\])*$/)
      if (m) commands.push({ name: m[1]!, describe: m[2]!.trim() })
      continue
    }

    if (section === 'options') {
      const opt = parseYargsOptionLine(trimmed)
      if (opt) options.push(opt)
      continue
    }

    if (section === 'examples') {
      // yargs separates the command from its description with
      // 2+ spaces. Treat anything after as the comment.
      const m = trimmed.match(/^(\S.*?)(?:\s{2,}(.+))?$/)
      if (m) examples.push({ command: m[1]!, comment: m[2] })
      continue
    }
  }

  return {
    command,
    describe: describe || 'No description provided.',
    options,
    commands: commands.length ? commands : undefined,
    examples: examples.length ? examples : undefined,
  }
}

function parseYargsOptionLine(line: string): HelpEntryOption | undefined {
  // yargs flag chunk: `--long`, `-x`, or `-x, --long`.
  // Tags trail in `[brackets]` and may be combined: `[boolean]`,
  // `[required]`, `[default: foo]`, `[choices: "a", "b", "c"]`.
  const tags = [...line.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]!)
  const headHalf = line.replace(/\s+\[[^\]]+\].*$/, '')

  const flagMatch = headHalf.match(
    /^(?:(-[A-Za-z]),\s*)?(--[A-Za-z][A-Za-z0-9-]*)\s*(.*)$/,
  ) || headHalf.match(/^(-[A-Za-z])\s*(.*)$/)
  if (!flagMatch) return undefined

  let short: string | undefined
  let long: string | undefined
  let describe = ''
  if (flagMatch.length === 4) {
    short = flagMatch[1]?.replace(/^-/, '')
    long = flagMatch[2]!.replace(/^--/, '')
    describe = flagMatch[3]!.trim()
  } else {
    short = flagMatch[1]!.replace(/^-/, '')
    describe = flagMatch[2]!.trim()
  }
  if (!long) return undefined

  let required = false
  let type: string | undefined
  let defaultValue: unknown
  let choices: string[] | undefined
  for (const tag of tags) {
    if (tag === 'required')                            required = true
    else if (/^(string|boolean|number|array|count)$/.test(tag)) type = tag
    else if (tag.startsWith('default:'))               defaultValue = tag.slice(8).trim()
    else if (tag.startsWith('choices:')) {
      choices = tag.slice(8).split(',').map(s => s.trim().replace(/^"|"$/g, ''))
    }
  }

  return { long, short, required, describe, type, default: defaultValue, choices }
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
