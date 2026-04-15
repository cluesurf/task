/**
 * Pure formatter command builders. No I/O — every export returns
 * `{ bin, args, install }`. The Node-side runner at
 * `~/code/tool/node/format/base` shells these out with `spawn`.
 *
 * Each builder takes the same minimal shape:
 *   { input, write?, extra? }
 *
 * `write: true` (default) does in-place formatting (`-w` / `-i`).
 * `write: false` prints the formatted source to stdout, leaving
 * the file untouched — useful for diff-style review or piping.
 */

export type FormatOptions = {
  input: string
  /** In-place vs stdout. Defaults to in-place. */
  write?: boolean
  extra?: string[]
  /** Path to a config file (passed via the formatter's
   * `--config-file` / equivalent). Optional. */
  configFile?: string
}

export type FormatCommand = {
  bin: string
  args: string[]
  install: string
}

const INSTALL = {
  gofmt:        'install Go: brew install go / apt install golang',
  google_java:  'brew install google-java-format',
  shfmt:        'brew install shfmt / go install mvdan.cc/sh/v3/cmd/shfmt@latest',
  sql_formatter: 'pnpm add -g sql-formatter',
  asmfmt:       'go install github.com/klauspost/asmfmt/cmd/asmfmt@latest',
  prettier:     'pnpm add -g prettier',
  dart:         'brew install dart-sdk / apt install dart',
  ormolu:       'brew install ormolu',
  ocamlformat:  'opam install ocamlformat',
  zig:          'brew install zig / https://ziglang.org/download',
  clang_tidy:   'brew install llvm / apt install clang-tidy',
}

export function buildGofmtCommand(o: FormatOptions): FormatCommand {
  // gofmt -w writes in place; without -w it prints to stdout.
  // -s simplifies code where safe (range loops, etc.).
  const args: string[] = ['-s']
  if (o.write !== false) args.push('-w')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'gofmt', args, install: INSTALL.gofmt }
}

export function buildJavaFormatCommand(o: FormatOptions): FormatCommand {
  // -i = in-place. Without -i it prints to stdout.
  const args: string[] = []
  if (o.write !== false) args.push('-i')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'google-java-format', args, install: INSTALL.google_java }
}

export function buildShfmtCommand(o: FormatOptions): FormatCommand {
  // -i 2 : 2-space indent (POSIX-y)
  // -ci : indent switch cases
  // -bn : binary ops at line end
  // -w writes in place.
  const args: string[] = ['-i', '2', '-ci', '-bn']
  if (o.write !== false) args.push('-w')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'shfmt', args, install: INSTALL.shfmt }
}

export function buildSqlFormatterCommand(o: FormatOptions): FormatCommand {
  // sql-formatter has no in-place mode by default — write the
  // result back to the file when requested.
  const args: string[] = []
  if (o.write !== false) args.push('--fix')
  else args.push('--output', '-')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'sql-formatter', args, install: INSTALL.sql_formatter }
}

export function buildAsmfmtCommand(o: FormatOptions): FormatCommand {
  const args: string[] = []
  if (o.write !== false) args.push('-w')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'asmfmt', args, install: INSTALL.asmfmt }
}

export function buildPrettierCommand(
  o: FormatOptions & { parser?: string },
): FormatCommand {
  const args: string[] = []
  if (o.write !== false) args.push('--write')
  else args.push('--check')   // prints filename if formatted differs
  if (o.parser) args.push('--parser', o.parser)
  if (o.configFile) args.push('--config', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'prettier', args, install: INSTALL.prettier }
}

export function buildDartFormatCommand(o: FormatOptions): FormatCommand {
  // `dart format` is in-place by default; --output=show prints
  // formatted output to stdout instead.
  const args: string[] = ['format']
  if (o.write === false) args.push('--output=show')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'dart', args, install: INSTALL.dart }
}

export function buildOrmoluCommand(o: FormatOptions): FormatCommand {
  // ormolu --mode inplace : write back; default mode is stdout.
  const args: string[] = []
  if (o.write !== false) args.push('--mode', 'inplace')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'ormolu', args, install: INSTALL.ormolu }
}

export function buildOcamlformatCommand(o: FormatOptions): FormatCommand {
  // ocamlformat --inplace : write back; default mode is stdout.
  // --enable-outside-detected-project so CLI usage works without
  // .ocamlformat in cwd.
  const args: string[] = ['--enable-outside-detected-project']
  if (o.write !== false) args.push('--inplace')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'ocamlformat', args, install: INSTALL.ocamlformat }
}

export function buildZigFmtCommand(o: FormatOptions): FormatCommand {
  // `zig fmt` is always in-place. There's no stdout mode; if the
  // user asked for write:false we --check (exit 1 if reformat
  // would change the file) instead.
  const args: string[] = ['fmt']
  if (o.write === false) args.push('--check')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'zig', args, install: INSTALL.zig }
}

export function buildClangTidyCommand(o: FormatOptions): FormatCommand {
  // clang-tidy is a linter that can apply suggested fixes with --fix.
  // Treated here as a "format-ish pass" — reorders includes,
  // applies modernize-* and readability-* fixers.
  const args: string[] = []
  if (o.write !== false) args.push('--fix')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'clang-tidy', args, install: INSTALL.clang_tidy }
}
