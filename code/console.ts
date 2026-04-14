#!/usr/bin/env -S node --no-warnings=ExperimentalWarning
/**
 * CLI entrypoint for the `task` bin (see package.json `bin`).
 *
 * This file only wires the top-level action groups. Each group
 * lives at `code/call/<action>/console.ts` and collects its
 * concrete subcommands from `code/call/<action>/<thing>/console.ts`.
 * Sub-subcommands lazy-import `./node` inside their handlers so
 * heavy native deps (DuckDB, ffmpeg, etc.) only load when a
 * command actually runs.
 *
 * To add a new action verb: create `code/call/<action>/console.ts`
 * and import it here.
 */

import yargs from 'yargs'

import {
  setLoggingStyle,
  resolveLoggingStyle,
  getLoggingStyle,
  renderHelpFor,
  printCliError,
  CliError,
  setTrace,
} from '~/code/tool/node/log'
import { addConsole } from '~/code/call/add/console'
import { archiveConsole } from '~/code/call/archive/console'
import { checkConsole } from '~/code/call/check/console'
import { combineConsole } from '~/code/call/combine/console'
import { compileConsole } from '~/code/call/compile/console'
import { compressConsole } from '~/code/call/compress/console'
import { convertConsole } from '~/code/call/convert/console'
import { copyConsole } from '~/code/call/copy/console'
import { cropConsole } from '~/code/call/crop/console'
import { disassembleConsole } from '~/code/call/disassemble/console'
import { downloadConsole } from '~/code/call/download/console'
import { dumpConsole } from '~/code/call/dump/console'
import { extractConsole } from '~/code/call/extract/console'
import { flipConsole } from '~/code/call/flip/console'
import { formatConsole } from '~/code/call/format/console'
import { generateConsole } from '~/code/call/generate/console'
import { getConsole } from '~/code/call/get/console'
import { haltConsole } from '~/code/call/halt/console'
import { highlightConsole } from '~/code/call/highlight/console'
import { inspectConsole } from '~/code/call/inspect/console'
import { listConsole } from '~/code/call/list/console'
import { loadConsole } from '~/code/call/load/console'
import { makeConsole } from '~/code/call/make/console'
import { normalizeConsole } from '~/code/call/normalize/console'
import { openConsole } from '~/code/call/open/console'
import { optimizeConsole } from '~/code/call/optimize/console'
import { padConsole } from '~/code/call/pad/console'
import { parseConsole } from '~/code/call/parse/console'
import { pushConsole } from '~/code/call/push/console'
import { removeConsole } from '~/code/call/remove/console'
import { renderConsole } from '~/code/call/render/console'
import { resizeConsole } from '~/code/call/resize/console'
import { rmConsole } from '~/code/call/rm/console'
import { rotateConsole } from '~/code/call/rotate/console'
import { sanitizeConsole } from '~/code/call/sanitize/console'
import { searchConsole } from '~/code/call/search/console'
import { setConsole } from '~/code/call/set/console'
import { shapeConsole } from '~/code/call/shape/console'
import { sliceConsole } from '~/code/call/slice/console'
import { subsetConsole } from '~/code/call/subset/console'
import { testConsole } from '~/code/call/test/console'
import { trimConsole } from '~/code/call/trim/console'
import { updateConsole } from '~/code/call/update/console'
import { validateConsole } from '~/code/call/validate/console'
import { verifyConsole } from '~/code/call/verify/console'
import { watchConsole } from '~/code/call/watch/console'

process.on('uncaughtException', err => {
  printCliError(err)
  process.exit(1)
})

async function main() {
  // `--help` / `-h` short-circuit. yargs's help middleware doesn't
  // fire early enough when a parent group also declares a required
  // subcommand (`trim <thing>` etc.) — the demandCommand error
  // wins first. Peeling help off up-front sidesteps that entirely
  // and renders the custom layout for any registered command path.
  const raw = process.argv.slice(2)
  // Only `--help` short-circuits help. `-h` stays available for
  // per-command aliases (most usefully `--height` on resize).
  if (raw.includes('--help')) {
    setLoggingStyle(resolveLoggingStyle('pretty'))
    const path = raw.filter(a => !a.startsWith('-'))
    const out = renderHelpFor({
      commandPath: path,
      fallback: '',
      color: true,
    })
    if (out.trim()) {
      process.stdout.write(out + '\n')
      return
    }
  }

  const argv = rewriteImplicitSubcommands(raw)

  await yargs(argv)
    .scriptName('task')
    .usage('$0 <action> [thing] [options]')
    .option('format', {
      alias: 'f',
      describe:
        'Output style. `pretty` (default) uses colors + ora spinner; ' +
        '`text` strips ANSI; `json` / `json:pretty` emit one JSON ' +
        'object per action on stdout.',
      type: 'string',
      choices: ['pretty', 'text', 'plain', 'json', 'json:pretty'],
      default: 'pretty',
      global: true,
    })
    .option('explain', {
      describe:
        'Print the native commands the verb would run, without executing them',
      type: 'boolean',
      global: true,
    })
    .option('log', {
      describe:
        'Execute and stream subprocess output. Pass a glob pattern to ' +
        'filter matching lines (use `"*"` for all).',
      type: 'string',
      global: true,
    })
    .middleware(argv => {
      setLoggingStyle(resolveLoggingStyle(argv.format))
      if (argv.explain) {
        setTrace('explain')
      } else if (argv.log !== undefined) {
        const p = String(argv.log)
        setTrace('log', p && p !== '*' ? p : undefined)
      }
    }, true)
    .middleware((argv, instance) => {
      if (argv.help) {
        const path = (argv._ as Array<string | number>).map(String)
        instance.showHelp(text => {
          const out = renderHelpFor({
            commandPath: path,
            fallback: text,
            color: getLoggingStyle() === 'pretty',
          })
          process.stdout.write(out + '\n')
        })
        process.exit(0)
      }
    }, true)
    .help(false)
    .option('help', {
      describe: 'Show help',
      type: 'boolean',
      global: true,
    })
    .fail((msg, err, instance) => {
      if (err) throw err
      const path = process.argv.slice(2).filter(a => !a.startsWith('-'))
      const parent = path[0]
        ? `run \`task ${path[0]} --help\` to see available commands`
        : 'run `task --help` to see available commands'
      printCliError(
        new CliError(msg ?? 'invalid command', { hint: parent }),
      )
      process.exit(1)
    })
    .command(addConsole)
    .command(archiveConsole)
    .command(checkConsole)
    .command(combineConsole)
    .command(compileConsole)
    .command(compressConsole)
    .command(convertConsole)
    .command(copyConsole)
    .command(cropConsole)
    .command(disassembleConsole)
    .command(downloadConsole)
    .command(dumpConsole)
    .command(extractConsole)
    .command(flipConsole)
    .command(formatConsole)
    .command(generateConsole)
    .command(getConsole)
    .command(haltConsole)
    .command(highlightConsole)
    .command(inspectConsole)
    .command(listConsole)
    .command(loadConsole)
    .command(makeConsole)
    .command(normalizeConsole)
    .command(openConsole)
    .command(optimizeConsole)
    .command(padConsole)
    .command(parseConsole)
    .command(pushConsole)
    .command(removeConsole)
    .command(renderConsole)
    .command(resizeConsole)
    .command(rmConsole)
    .command(rotateConsole)
    .command(sanitizeConsole)
    .command(searchConsole)
    .command(setConsole)
    .command(shapeConsole)
    .command(sliceConsole)
    .command(subsetConsole)
    .command(testConsole)
    .command(trimConsole)
    .command(updateConsole)
    .command(validateConsole)
    .command(verifyConsole)
    .command(watchConsole)
    .demandCommand(1, 'Specify an action')
    .strict()
    .version()
    .alias('version', 'v')
    .parseAsync()
}

/**
 * Extension → media kind. Used by every verb that operates on a
 * single file kind (compress, trim, rotate, ...) so users can
 * pass a path without naming the subcommand. New extensions go
 * here once and every verb picks them up.
 */
const MEDIA_KIND_BY_EXT: Record<string, string> = {
  ttf: 'font', otf: 'font', woff: 'font', woff2: 'font', eot: 'font', ttx: 'font',
  png: 'image', jpg: 'image', jpeg: 'image', webp: 'image', avif: 'image',
  gif: 'image', bmp: 'image', tiff: 'image', tif: 'image', heic: 'image', svg: 'image',
  mp3: 'audio', wav: 'audio', flac: 'audio', ogg: 'audio', opus: 'audio',
  m4a: 'audio', aac: 'audio',
  mp4: 'video', mov: 'video', mkv: 'video', webm: 'video', avi: 'video', m4v: 'video',
  pdf: 'document', docx: 'document', doc: 'document', odt: 'document',
  epub: 'document', md: 'document', rtf: 'document', tex: 'document', html: 'document',
  zip: 'archive', tar: 'archive', gz: 'archive', '7z': 'archive', rar: 'archive',
  bz2: 'archive', xz: 'archive', zst: 'archive',
  csv: 'data', tsv: 'data', json: 'data', parquet: 'data',
  xlsx: 'data', xls: 'data', ndjson: 'data', jsonl: 'data',
  // source languages — routed by `task compile` / `task format`.
  c: 'c', h: 'c',
  cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp', hxx: 'cpp',
  rs: 'rust',
  swift: 'swift',
  wat: 'wast', wast: 'wast',
}

function kindFromPath(p: string): string | undefined {
  const lower = p.toLowerCase()
  // Compound archive extensions first.
  if (/\.tar\.(gz|bz2|xz|zst)$/.test(lower)) return 'archive'
  const dot = lower.lastIndexOf('.')
  if (dot < 0) return undefined
  return MEDIA_KIND_BY_EXT[lower.slice(dot + 1)]
}

/**
 * `task <verb> <path>` is shorthand for `task <verb> <kind> <path>`,
 * where `<kind>` is inferred from the path's extension. Each verb
 * declares its valid subcommand kinds and (optionally) a hard
 * default when the extension doesn't map to any sub.
 *
 * The rewrite only fires when the first positional is *not* a
 * known sub-verb and doesn't start with `-`, so real subcommand
 * invocations and flag-only help are untouched.
 */
type ImplicitConfig = {
  subs: string[]
  /** Fallback when the path's extension doesn't map to a sub. */
  default?: string
}

const IMPLICIT_DEFAULTS: Record<string, ImplicitConfig> = {
  inspect:   { subs: ['ast', 'color', 'file', 'metadata', 'process', 'system', 'webpage'], default: 'file' },
  check:     { subs: ['file'], default: 'file' },
  compile:   { subs: ['c', 'cpp', 'rust', 'swift', 'wast'] },
  compress:  { subs: ['audio', 'font', 'image', 'video'] },
  format:    { subs: ['assembly', 'clang', 'kotlin', 'python', 'ruby', 'rust', 'swift'] },
  trim:      { subs: ['audio', 'image', 'video'] },
  rotate:    { subs: ['image', 'video'] },
  flip:      { subs: ['image'] },
  normalize: { subs: ['audio'] },
  resize:    { subs: ['image', 'video'] },
  optimize:  { subs: ['image', 'video'] },
  subset:    { subs: ['font'] },
  dump:      { subs: ['font'] },
  shape:     { subs: ['font'] },
  render:    { subs: ['font'] },
  update:    { subs: ['font', 'image', 'video'] },
  convert:   { subs: ['archive', 'audio', 'data', 'document', 'font', 'image', 'video'] },
  extract:   { subs: ['archive', 'font', 'pages'] },
  slice:     { subs: ['document'] },
  crop:      { subs: ['document'] },
  mark:      { subs: ['pdf'] },
  modify:    { subs: ['pdf'] },
  validate:  { subs: ['document'] },
  verify:    { subs: ['image'] },
}

function rewriteImplicitSubcommands(argv: string[]): string[] {
  if (argv.length < 2) return argv
  const verb = argv[0]
  if (!verb) return argv
  const config = IMPLICIT_DEFAULTS[verb]
  if (!config) return argv
  const positional = argv[1]
  if (!positional || positional.startsWith('-')) return argv
  if (config.subs.includes(positional)) return argv
  const kind = kindFromPath(positional)
  if (kind && config.subs.includes(kind)) {
    return [verb, kind, ...argv.slice(1)]
  }
  if (config.default) {
    return [verb, config.default, ...argv.slice(1)]
  }
  return argv
}

main().catch(err => {
  printCliError(err)
  process.exit(1)
})
