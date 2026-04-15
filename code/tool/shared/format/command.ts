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

// ---- Batch 2: Lua, BEAM, Nix, Terraform, Scala, Clojure, PHP,
// Perl, Elm, PureScript, Nim, Crystal, D, V, TOML. Priority:
// active ecosystems with a de facto formatter. Historical
// languages (Fortran/Ada/R/Julia/CMake/Dafny/Racket/emacs-lisp/
// Groovy/Proto3) live in a later batch.

export function buildStyluaCommand(o: FormatOptions): FormatCommand {
  // stylua rewrites in place by default. --check runs dry;
  // non-zero exit when diffs would be produced.
  const args: string[] = []
  if (o.write === false) args.push('--check')
  if (o.configFile) args.push('--config-path', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'stylua', args, install: 'brew install stylua / cargo install stylua' }
}

export function buildMixFormatCommand(o: FormatOptions): FormatCommand {
  const args = ['format']
  if (o.write === false) args.push('--check-formatted')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'mix', args, install: 'brew install elixir / apt install elixir' }
}

export function buildErlfmtCommand(o: FormatOptions): FormatCommand {
  const args: string[] = []
  if (o.write !== false) args.push('--write')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'erlfmt', args, install: 'rebar3 escriptize github.com/WhatsApp/erlfmt' }
}

export function buildGleamFormatCommand(o: FormatOptions): FormatCommand {
  const args = ['format']
  if (o.write === false) args.push('--check')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'gleam', args, install: 'brew install gleam' }
}

export function buildNixFmtCommand(o: FormatOptions): FormatCommand {
  const args: string[] = []
  if (o.write === false) args.push('--check')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'nixpkgs-fmt', args, install: 'nix-env -iA nixpkgs.nixpkgs-fmt' }
}

export function buildTerraformFmtCommand(o: FormatOptions): FormatCommand {
  // `terraform fmt` rewrites in place by default. `-check` = dry run.
  const args = ['fmt']
  if (o.write === false) args.push('-check')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'terraform', args, install: 'brew install terraform (or tfenv)' }
}

export function buildScalafmtCommand(o: FormatOptions): FormatCommand {
  const args: string[] = []
  if (o.write === false) args.push('--test')
  if (o.configFile) args.push('--config', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'scalafmt', args, install: 'brew install scalafmt / coursier install scalafmt' }
}

export function buildCljfmtCommand(o: FormatOptions): FormatCommand {
  // cljfmt has `fix` (write) and `check` (dry-run) subcommands.
  const args = [o.write === false ? 'check' : 'fix']
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'cljfmt', args, install: 'brew install cljfmt or lein plugin' }
}

export function buildPhpCsFixerCommand(o: FormatOptions): FormatCommand {
  const args = ['fix']
  if (o.write === false) args.push('--dry-run')
  if (o.configFile) args.push('--config', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'php-cs-fixer', args, install: 'brew install php-cs-fixer (already in Dockerfile + Cask)' }
}

export function buildPerltidyCommand(o: FormatOptions): FormatCommand {
  // perltidy -b rewrites in place (keeping a .bak sibling). Without
  // -b it emits to stdout (or a .tdy sibling per profile).
  const args: string[] = []
  if (o.write !== false) args.push('-b')
  if (o.configFile) args.push('-pro', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'perltidy', args, install: 'brew install perltidy (already in Dockerfile)' }
}

export function buildElmFormatCommand(o: FormatOptions): FormatCommand {
  const args: string[] = []
  if (o.write === false) args.push('--validate')
  else args.push('--yes')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'elm-format', args, install: 'brew install elm-format / npm install -g elm-format' }
}

export function buildPursTidyCommand(o: FormatOptions): FormatCommand {
  const args = [o.write === false ? 'format' : 'format-in-place']
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'purs-tidy', args, install: 'npm install -g purs-tidy' }
}

export function buildNimprettyCommand(o: FormatOptions): FormatCommand {
  // nimpretty is always in place. For dry-run we redirect to
  // stdout via `-o:/dev/stdout`.
  const args: string[] = []
  if (o.write === false) args.push('-o:/dev/stdout')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'nimpretty', args, install: 'ships with nim' }
}

export function buildCrystalFormatCommand(o: FormatOptions): FormatCommand {
  const args = ['tool', 'format']
  if (o.write === false) args.push('--check')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'crystal', args, install: 'brew install crystal' }
}

export function buildDfmtCommand(o: FormatOptions): FormatCommand {
  const args: string[] = []
  if (o.write !== false) args.push('--inplace')
  if (o.configFile) args.push('--config', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'dfmt', args, install: 'brew install dmd (dfmt ships with it)' }
}

export function buildVFmtCommand(o: FormatOptions): FormatCommand {
  const args = ['fmt']
  if (o.write !== false) args.push('-w')
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'v', args, install: 'https://github.com/vlang/v' }
}

export function buildTaploCommand(o: FormatOptions): FormatCommand {
  const args = ['format']
  if (o.write === false) args.push('--check')
  if (o.configFile) args.push('--config', o.configFile)
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'taplo', args, install: 'brew install taplo / cargo install taplo-cli' }
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
