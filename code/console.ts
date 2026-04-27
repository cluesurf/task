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
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { addConsole } from '~/code/call/add/console'
import { archiveConsole } from '~/code/call/archive/console'
import { backupConsole } from '~/code/call/backup/console'
import { buildConsole } from '~/code/call/build/console'
import { checkConsole } from '~/code/call/check/console'
import { cleanConsole } from '~/code/call/clean/console'
import { combineConsole } from '~/code/call/combine/console'
import { compareConsole } from '~/code/call/compare/console'
import { compileConsole } from '~/code/call/compile/console'
import { compressConsole } from '~/code/call/compress/console'
import { configureConsole } from '~/code/call/configure/console'
import { containerConsole } from '~/code/call/container/console'
import { convertConsole } from '~/code/call/convert/console'
import { copyConsole } from '~/code/call/copy/console'
import { cropConsole } from '~/code/call/crop/console'
import { decryptConsole } from '~/code/call/decrypt/console'
import { diffConsole } from '~/code/call/diff/console'
import { disassembleConsole } from '~/code/call/disassemble/console'
import { downloadConsole } from '~/code/call/download/console'
import { dumpConsole } from '~/code/call/dump/console'
import { editConsole } from '~/code/call/edit/console'
import { encryptConsole } from '~/code/call/encrypt/console'
import { exportConsole } from '~/code/call/export/console'
import { fetchConsole } from '~/code/call/fetch/console'
import { flipConsole } from '~/code/call/flip/console'
import { formatConsole } from '~/code/call/format/console'
import { forwardConsole } from '~/code/call/forward/console'
import { generateConsole } from '~/code/call/generate/console'
import { getConsole } from '~/code/call/get/console'
import { haltConsole } from '~/code/call/halt/console'
import { highlightConsole } from '~/code/call/highlight/console'
import { inspectConsole } from '~/code/call/inspect/console'
import { installConsole } from '~/code/call/install/console'
import { lintConsole } from '~/code/call/lint/console'
import { listConsole } from '~/code/call/list/console'
import { loadConsole } from '~/code/call/load/console'
import { logConsole } from '~/code/call/log/console'
import { makeConsole } from '~/code/call/make/console'
import { measureConsole } from '~/code/call/measure/console'
import { normalizeConsole } from '~/code/call/normalize/console'
import { openConsole } from '~/code/call/open/console'
import { optimizeConsole } from '~/code/call/optimize/console'
import { padConsole } from '~/code/call/pad/console'
import { parseConsole } from '~/code/call/parse/console'
import { pingConsole } from '~/code/call/ping/console'
// project/ merged into verb-first paths (build/code, test/code, etc.)
import { pushConsole } from '~/code/call/push/console'
import { queryConsole } from '~/code/call/query/console'
import { recordConsole } from '~/code/call/record/console'
import { removeConsole } from '~/code/call/remove/console'
import { renderConsole } from '~/code/call/render/console'
import { replayConsole } from '~/code/call/replay/console'
import { resizeConsole } from '~/code/call/resize/console'
import { restartConsole } from '~/code/call/restart/console'
import { restoreConsole } from '~/code/call/restore/console'
// rm/ merged into remove/ssh-host — see code/call/remove/ssh-host/
import { rotateConsole } from '~/code/call/rotate/console'
import { runConsole } from '~/code/call/run/console'
import { sanitizeConsole } from '~/code/call/sanitize/console'
import { scaleConsole } from '~/code/call/scale/console'
import { scanConsole } from '~/code/call/scan/console'
import { scoutConsole } from '~/code/call/scout/console'
import { searchConsole } from '~/code/call/search/console'
import { setConsole } from '~/code/call/set/console'
import { shapeConsole } from '~/code/call/shape/console'
import { showConsole } from '~/code/call/show/console'
import { sliceConsole } from '~/code/call/slice/console'
import { splitConsole } from '~/code/call/split/console'
import { stopConsole } from '~/code/call/stop/console'
import { subsetConsole } from '~/code/call/subset/console'
import { syncConsole } from '~/code/call/sync/console'
import { testConsole } from '~/code/call/test/console'
import { traceConsole } from '~/code/call/trace/console'
import { trimConsole } from '~/code/call/trim/console'
import { unpackConsole } from '~/code/call/unpack/console'
import { uploadConsole } from '~/code/call/upload/console'
import { updateConsole } from '~/code/call/update/console'
import { validateConsole } from '~/code/call/validate/console'
import { verifyConsole } from '~/code/call/verify/console'
import { useConsole } from '~/code/call/use/console'
import { watchConsole } from '~/code/call/watch/console'

// Top-level help entry. Registered here (not inside any verb
// console) so `task --help`, `task -h`, and any unrecognized path
// fall back to a single tinted list of every verb. Verb descriptions
// stay in sync with each verb's own registerGroupHelp / registerHelp
// call automatically — this is just the index.
registerGroupHelp({
  command: 'task',
  describe: 'One function registry for CLI, Node, and browser.',
  commands: [
    { name: 'add',         describe: 'Create a new entry in long-lived state (SSH, ...)' },
    { name: 'archive',     describe: 'Create an archive from one or more inputs' },
    { name: 'build',       describe: 'Build a project (zero-config) or compile a single file' },
    { name: 'check',       describe: 'Check that a file exists and is readable' },
    { name: 'clean',       describe: 'Remove build outputs / caches (zero-config)' },
    { name: 'combine',     describe: 'Combine a still image and audio track into a video' },
    { name: 'compile',     describe: 'Compile source code to a binary or bytecode' },
    { name: 'compress',    describe: 'Compress for web delivery or smaller size' },
    { name: 'configure',   describe: 'Bootstrap a fresh dev machine from a manifest / preset' },
    { name: 'container',   describe: 'Container lifecycle: build / scan / size / shell / clean' },
    { name: 'convert',     describe: 'Convert between formats' },
    { name: 'copy',        describe: 'Copy an artifact to the clipboard' },
    { name: 'crop',        describe: 'Crop a document or image' },
    { name: 'disassemble', describe: 'Disassemble binaries' },
    { name: 'download',    describe: 'Download from external sources' },
    { name: 'dump',        describe: 'Dump a file to an editable source form (and back)' },
    { name: 'edit',        describe: 'Open a config in $EDITOR' },
    { name: 'extract',     describe: 'Extract content from containers' },
    { name: 'fetch',       describe: 'Download URLs (wget / curl / aria2c)' },
    { name: 'flip',        describe: 'Flip a media file horizontally or vertically' },
    { name: 'format',      describe: 'Format source code' },
    { name: 'generate',    describe: 'Generate hashes, QR codes, random strings' },
    { name: 'get',         describe: 'Read a single property or entry' },
    { name: 'halt',        describe: 'Terminate processes or free a port' },
    { name: 'highlight',   describe: 'Stamp a highlight + note on a PDF' },
    { name: 'inspect',     describe: 'Inspect a file, process, network, or system' },
    { name: 'install',     describe: 'Install project dependencies (zero-config)' },
    { name: 'lint',        describe: 'Lint the project (zero-config — clippy / golangci-lint / ruff / ...)' },
    { name: 'list',        describe: 'List running resources or stored entries' },
    { name: 'make',        describe: 'Create a new artifact (SSH key, ...)' },
    { name: 'measure',     describe: 'Measure HTTP latency to a URL' },
    { name: 'modify',      describe: 'Modify the structure of a file (PDF pages, ...)' },
    { name: 'normalize',   describe: 'Normalize a media file (loudness, levels)' },
    { name: 'open',        describe: 'Open an interactive session (SSH, ...)' },
    { name: 'optimize',    describe: 'Optimize an asset' },
    { name: 'pad',         describe: 'Pad an audio file with trailing silence' },
    { name: 'parse',       describe: 'Parse source or data into a structured form' },
    { name: 'ping',        describe: 'ICMP ping a host and report latency / loss' },
    { name: 'push',        describe: 'Push an artifact to a remote (SSH key → host)' },
    { name: 'record',      describe: 'Record screen / terminal sessions' },
    { name: 'remove',      describe: 'Remove content, metadata, or a stored entry' },
    { name: 'render',      describe: 'Render a visual artifact (font sample, ...)' },
    { name: 'replay',      describe: 'Replay an asciinema .cast (terminal or render to gif/mp4)' },
    { name: 'resize',      describe: 'Resize an image or video' },
    { name: 'restore',     describe: 'Restore a database from a dump' },
    { name: 'rotate',      describe: 'Rotate an image or video by a given angle' },
    { name: 'sanitize',    describe: 'Sanitize code or other content' },
    { name: 'scan',        describe: 'Probe a remote for fingerprints and keys' },
    { name: 'search',      describe: 'Search file contents or names under a path' },
    { name: 'set',         describe: 'Write a property onto a target' },
    { name: 'shape',       describe: 'Run HarfBuzz shaping (text → glyph sequence)' },
    { name: 'slice',       describe: 'Slice a document or other asset' },
    { name: 'split',       describe: 'Split a file into segments' },
    { name: 'subset',      describe: 'Subset a file to a smaller slice' },
    { name: 'sync',        describe: 'Mirror / backup (rsync, SMB/NAS, restic/borg/kopia)' },
    { name: 'test',        describe: 'Test reachability or connectivity' },
    { name: 'trace',       describe: 'Trace the path a packet takes to a host' },
    { name: 'trim',        describe: 'Cut a section out of a media file' },
    { name: 'update',      describe: 'Apply an edit to a file' },
    { name: 'upload',      describe: 'Upload to S3 / GCS / Azure / FTP / SFTP / WebDAV / IPFS' },
    { name: 'validate',    describe: 'Validate a document or other artifact' },
    { name: 'verify',      describe: 'Verify the integrity or content of an asset' },
    { name: 'watch',       describe: 'Live-update a listing as state changes' },
  ],
})

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
  // Both `--help` and `-h` short-circuit to the custom renderer.
  // When the path isn't registered (`task show ip --help`, typos,
  // unknown verbs), fall back to the top-level `task` entry so
  // the output always stays in the tinted layout instead of
  // yargs's stock commands dump.
  if (raw.includes('--help') || raw.includes('-h')) {
    setLoggingStyle(resolveLoggingStyle('pretty'))
    const path = raw.filter(a => !a.startsWith('-'))
    let out = renderHelpFor({
      commandPath: path,
      fallback: '',
      color: true,
    })
    if (!out.trim()) {
      out = renderHelpFor({
        commandPath: [],
        fallback: '',
        color: true,
      })
    }
    if (out.trim()) {
      process.stdout.write(out + '\n')
      return
    }
  }

  const argv = rewriteArchive(rewriteCombine(rewriteImplicitSubcommands(raw)))

  await yargs(argv)
    .scriptName('task')
    .usage('$0 <action> [thing] [options]')
    .option('format', {
      alias: 'f',
      describe:
        'Output style. `pretty` (default) uses colors + ora spinner; ' +
        '`text` strips ANSI; `json` / `json:pretty` emit one JSON ' +
        'object per action on stdout; `html` emits a styled table ' +
        '(verb-specific; currently: `scout username`).',
      type: 'string',
      choices: ['pretty', 'text', 'plain', 'json', 'json:pretty', 'html', 'markdown', 'md'],
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
      if (argv.help || argv.h) {
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
      alias: 'h',
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
    .command(backupConsole)
    .command(buildConsole)
    .command(checkConsole)
    .command(cleanConsole)
    .command(combineConsole)
    .command(compareConsole)
    .command(compileConsole)
    .command(compressConsole)
    .command(configureConsole)
    .command(containerConsole)
    .command(convertConsole)
    .command(copyConsole)
    .command(cropConsole)
    .command(decryptConsole)
    .command(diffConsole)
    .command(disassembleConsole)
    .command(downloadConsole)
    .command(dumpConsole)
    .command(editConsole)
    .command(encryptConsole)
    .command(exportConsole)
    .command(fetchConsole)
    .command(flipConsole)
    .command(formatConsole)
    .command(forwardConsole)
    .command(generateConsole)
    .command(getConsole)
    .command(haltConsole)
    .command(highlightConsole)
    .command(inspectConsole)
    .command(installConsole)
    .command(lintConsole)
    .command(listConsole)
    .command(loadConsole)
    .command(logConsole)
    .command(makeConsole)
    .command(measureConsole)
    .command(normalizeConsole)
    .command(openConsole)
    .command(optimizeConsole)
    .command(padConsole)
    .command(parseConsole)
    .command(pingConsole)
    // project merged into verb-first (build/code, test/code, etc.)
    .command(pushConsole)
    .command(queryConsole)
    .command(recordConsole)
    .command(removeConsole)
    .command(renderConsole)
    .command(replayConsole)
    .command(resizeConsole)
    .command(restartConsole)
    .command(restoreConsole)
    // rm merged into remove/ssh-host
    .command(rotateConsole)
    .command(runConsole)
    .command(sanitizeConsole)
    .command(scaleConsole)
    .command(scanConsole)
    .command(scoutConsole)
    .command(searchConsole)
    .command(setConsole)
    .command(shapeConsole)
    .command(showConsole)
    .command(sliceConsole)
    .command(splitConsole)
    .command(stopConsole)
    .command(subsetConsole)
    .command(syncConsole)
    .command(testConsole)
    .command(traceConsole)
    .command(trimConsole)
    .command(unpackConsole)
    .command(updateConsole)
    .command(uploadConsole)
    .command(validateConsole)
    .command(verifyConsole)
    .command(useConsole)
    .command(watchConsole)
    .completion(
      'autocomplete',
      'Print a shell-completion script. Append the output to your ' +
        'shell rc file (zsh / bash / fish), e.g. ' +
        '`task autocomplete >> ~/.zshrc && exec zsh`.',
    )
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

/** Lowercase extension without the leading dot, or `undefined`
 * when the path has none. Used to derive `-I` / `-O` format
 * flags from the two-positional convert shorthand. */
function extensionOf(p: string): string | undefined {
  const lower = p.toLowerCase()
  if (/\.tar\.gz$/.test(lower)) return 'tar.gz'
  if (/\.tar\.bz2$/.test(lower)) return 'tar.bz2'
  if (/\.tar\.xz$/.test(lower)) return 'tar.xz'
  if (/\.tar\.zst$/.test(lower)) return 'tar.zst'
  const dot = lower.lastIndexOf('.')
  if (dot < 0) return undefined
  return lower.slice(dot + 1)
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
  inspect:   { subs: ['analytics', 'ast', 'bot', 'bucket', 'cache', 'cluster', 'color', 'db', 'dns', 'figma', 'file', 'firewall', 'machine', 'metadata', 'network', 'pod', 'port', 'process', 'request', 'security', 'service', 'system', 'table', 'traffic', 'usage', 'waf', 'webpage', 'worker', 'zone'], default: 'file' },
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
  unpack:    { subs: ['archive', 'font'] },
  slice:     { subs: ['document', 'pdf'], default: 'document' },
  split:     { subs: ['audio', 'document'] },
  crop:      { subs: ['document'] },
  mark:      { subs: ['pdf'] },
  modify:    { subs: ['pdf'] },
  validate:  { subs: ['document'] },
  verify:    { subs: ['image'] },
}

/**
 * Verbs that accept `task <verb> <in> <out>` as a three-positional
 * shorthand. The second path is lifted into `-o <out>` before
 * yargs parses so the downstream form sees it as an explicit
 * output flag.
 */
const TWO_POSITIONAL_VERBS = new Set(['convert'])

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

  // `task convert a.png a.jpg` — two positional paths. Lift the
  // second into `-o <path>` so buildActionCommand's positional
  // handler fills input from the first and yargs takes output
  // from the flag. Convert also requires `-I` / `-O` format
  // flags, which we infer from the file extensions — otherwise
  // the user would still have to repeat `-I png -O jpg`.
  const maybeOut = argv[2]
  const alreadyHasOutputFlag = argv
    .slice(2)
    .some(a => a === '-o' || a === '--output-file-path')
  const alreadyHasInputFormat = argv
    .slice(2)
    .some(a => a === '-I' || a === '--input-format')
  const alreadyHasOutputFormat = argv
    .slice(2)
    .some(a => a === '-O' || a === '--output-format')
  if (
    TWO_POSITIONAL_VERBS.has(verb) &&
    kind &&
    config.subs.includes(kind) &&
    maybeOut &&
    !maybeOut.startsWith('-') &&
    kindFromPath(maybeOut) &&
    !alreadyHasOutputFlag
  ) {
    const rest = argv.slice(3)
    const inExt = extensionOf(positional)
    const outExt = extensionOf(maybeOut)
    const extras: string[] = []
    if (verb === 'convert' && inExt && !alreadyHasInputFormat) {
      extras.push('-I', inExt)
    }
    if (verb === 'convert' && outExt && !alreadyHasOutputFormat) {
      extras.push('-O', outExt)
    }
    return [verb, kind, positional, '-o', maybeOut, ...extras, ...rest]
  }

  if (kind && config.subs.includes(kind)) {
    return [verb, kind, ...argv.slice(1)]
  }
  if (config.default) {
    return [verb, config.default, ...argv.slice(1)]
  }
  return argv
}

/**
 * `task combine` accepts two path shapes:
 *
 *   task combine image.png audio.mp3 -o video.mp4   # heterogeneous
 *   task combine a.pdf b.pdf c.pdf  -o merged.pdf   # N homogeneous
 *
 * The heterogeneous form maps image → `-i` and audio → `-a`.
 * The homogeneous form lifts each positional into a repeated
 * `-i` so combine's merge path sees the same shape as a
 * flag-only invocation.
 */
function rewriteCombine(argv: string[]): string[] {
  if (argv[0] !== 'combine') return argv
  if (argv.some(a => a === '-i' || a === '--input-file-path' || a === '-a')) {
    return argv
  }
  const positionals: string[] = []
  let i = 1
  while (i < argv.length && argv[i] && !argv[i]!.startsWith('-')) {
    positionals.push(argv[i]!)
    i++
  }
  const rest = argv.slice(i)
  if (positionals.length === 0) return argv

  const kinds = positionals.map(kindFromPath)
  const image = positionals.find((_, idx) => kinds[idx] === 'image')
  const audio = positionals.find((_, idx) => kinds[idx] === 'audio')
  if (image && audio && positionals.length === 2) {
    return ['combine', '-i', image, '-a', audio, ...rest]
  }
  const inputs = positionals.flatMap(p => ['-i', p])
  return ['combine', ...inputs, ...rest]
}

/**
 * `task archive <path> -o <archive.tar.gz>` — fills in the pieces
 * the archive schema wants as flags (`--input-path` and
 * `--output-format`, derived from the output extension).
 */
function rewriteArchive(argv: string[]): string[] {
  if (argv[0] !== 'archive') return argv
  const first = argv[1]
  if (!first || first.startsWith('-')) return argv
  const hasInputPath = argv.some(
    a => a === '--input-path' || a === '-i',
  )
  const hasOutputFormat = argv.some(
    a => a === '--output-format' || a === '-O',
  )
  if (hasInputPath) return argv

  // Pull `-o <path>` out of rest so we can infer the format from
  // its extension. Everything else stays in its original slot.
  const rest = argv.slice(2)
  let outPath: string | undefined
  for (let i = 0; i < rest.length; i++) {
    if ((rest[i] === '-o' || rest[i] === '--output-file-path') && rest[i + 1]) {
      outPath = rest[i + 1]
      break
    }
  }

  const inject = ['--input-path', first]
  if (!hasOutputFormat && outPath) {
    const ext = extensionOf(outPath)
    if (ext) inject.push('-O', ext)
  }
  return ['archive', ...inject, ...rest]
}

main().catch(err => {
  printCliError(err)
  process.exit(1)
})
