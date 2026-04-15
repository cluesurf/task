/**
 * Unit asserts for every format command builder. No formatter
 * binary required — checks the pure argv shape each builder
 * returns. Exit code 0 on success; 1 on any assertion fail.
 *
 * Invoked from `test/console/format.sh`.
 */

import * as B from '~/code/tool/shared/format/command'
import type { FormatCommand } from '~/code/tool/shared/format/command'

let failures = 0

function assert(label: string, cond: unknown, detail?: string): void {
  if (cond) {
    process.stdout.write(`  ✓ ${label}\n`)
  } else {
    failures++
    process.stdout.write(`  ✗ ${label}${detail ? ` — ${detail}` : ''}\n`)
  }
}

function has(cmd: FormatCommand, needle: string): boolean {
  return cmd.args.join(' ').includes(needle)
}

let c: FormatCommand

// ---- Go (gofmt) -------------------------------------------------

c = B.buildGofmtCommand({ input: 'main.go' })
assert('gofmt: bin',          c.bin === 'gofmt')
assert('gofmt: -s simplify',  c.args.includes('-s'))
assert('gofmt: -w in-place',  c.args.includes('-w'))
assert('gofmt: input last',   c.args[c.args.length - 1] === 'main.go')

c = B.buildGofmtCommand({ input: 'main.go', write: false })
assert('gofmt --check: no -w', !c.args.includes('-w'))

// ---- Java (google-java-format) ---------------------------------

c = B.buildJavaFormatCommand({ input: 'Main.java' })
assert('java: bin',         c.bin === 'google-java-format')
assert('java: -i in-place', c.args.includes('-i'))

c = B.buildJavaFormatCommand({ input: 'Main.java', write: false })
assert('java --check: no -i', !c.args.includes('-i'))

// ---- Shell (shfmt) ---------------------------------------------

c = B.buildShfmtCommand({ input: 'deploy.sh' })
assert('shfmt: bin',        c.bin === 'shfmt')
assert('shfmt: -i 2',       has(c, '-i 2'))
assert('shfmt: -ci',        c.args.includes('-ci'))
assert('shfmt: -w',         c.args.includes('-w'))

// ---- SQL (sql-formatter) ---------------------------------------

c = B.buildSqlFormatterCommand({ input: 'q.sql' })
assert('sql: bin',          c.bin === 'sql-formatter')
assert('sql: --fix',        c.args.includes('--fix'))

c = B.buildSqlFormatterCommand({ input: 'q.sql', write: false })
assert('sql --check: --output -', has(c, '--output -'))

// ---- Assembly (asmfmt) -----------------------------------------

c = B.buildAsmfmtCommand({ input: 'main.s' })
assert('asmfmt: bin',  c.bin === 'asmfmt')
assert('asmfmt: -w',   c.args.includes('-w'))

// ---- Prettier (parameterized by parser) ------------------------

c = B.buildPrettierCommand({ input: 'index.html', parser: 'html' })
assert('prettier html: bin',          c.bin === 'prettier')
assert('prettier html: --write',      c.args.includes('--write'))
assert('prettier html: --parser html',has(c, '--parser html'))

c = B.buildPrettierCommand({ input: 'styles.css', parser: 'css' })
assert('prettier css: --parser css',  has(c, '--parser css'))

c = B.buildPrettierCommand({ input: 'src/index.js', parser: 'babel' })
assert('prettier js: --parser babel', has(c, '--parser babel'))

c = B.buildPrettierCommand({ input: 'src/index.ts', parser: 'typescript' })
assert('prettier ts: --parser typescript', has(c, '--parser typescript'))

c = B.buildPrettierCommand({ input: 'ci.yml', parser: 'yaml' })
assert('prettier yaml: --parser yaml', has(c, '--parser yaml'))

c = B.buildPrettierCommand({ input: 'package.json', parser: 'json' })
assert('prettier json: --parser json', has(c, '--parser json'))

c = B.buildPrettierCommand({ input: 'README.md', parser: 'markdown' })
assert('prettier md: --parser markdown', has(c, '--parser markdown'))

c = B.buildPrettierCommand({ input: 'README.md', parser: 'markdown', write: false })
assert('prettier --check (no --write)', !c.args.includes('--write'))
assert('prettier --check has --check',   c.args.includes('--check'))

c = B.buildPrettierCommand({ input: 'src/x.ts', parser: 'typescript', configFile: '.prettierrc' })
assert('prettier --config <file>', has(c, '--config .prettierrc'))

// ---- Dart (dart format) ----------------------------------------

c = B.buildDartFormatCommand({ input: 'bin/main.dart' })
assert('dart: bin',           c.bin === 'dart')
assert('dart: format verb',   c.args[0] === 'format')
assert('dart: input present', has(c, 'bin/main.dart'))

c = B.buildDartFormatCommand({ input: 'bin/main.dart', write: false })
assert('dart --check: --output=show', c.args.includes('--output=show'))

// ---- Haskell (ormolu) ------------------------------------------

c = B.buildOrmoluCommand({ input: 'Main.hs' })
assert('ormolu: bin',           c.bin === 'ormolu')
assert('ormolu: --mode inplace', has(c, '--mode inplace'))

c = B.buildOrmoluCommand({ input: 'Main.hs', write: false })
assert('ormolu --check: no --mode inplace', !c.args.join(' ').includes('inplace'))

// ---- OCaml (ocamlformat) ---------------------------------------

c = B.buildOcamlformatCommand({ input: 'main.ml' })
assert('ocamlformat: bin',                c.bin === 'ocamlformat')
assert('ocamlformat: --inplace',          c.args.includes('--inplace'))
assert('ocamlformat: --enable-outside-detected-project',
  c.args.includes('--enable-outside-detected-project'))

// ---- Zig (zig fmt) ---------------------------------------------

c = B.buildZigFmtCommand({ input: 'main.zig' })
assert('zig fmt: bin',     c.bin === 'zig')
assert('zig fmt: subcmd',  c.args[0] === 'fmt')

c = B.buildZigFmtCommand({ input: 'main.zig', write: false })
assert('zig fmt --check',  c.args.includes('--check'))

// ---- clang-tidy ------------------------------------------------

c = B.buildClangTidyCommand({ input: 'main.cpp' })
assert('clang-tidy: bin',    c.bin === 'clang-tidy')
assert('clang-tidy: --fix',  c.args.includes('--fix'))

c = B.buildClangTidyCommand({ input: 'main.cpp', write: false })
assert('clang-tidy --check (no --fix)', !c.args.includes('--fix'))

// ---- Batch 2: Lua / BEAM / Nix / Terraform / JVM / PHP / Perl
//             / Elm / PureScript / Nim / Crystal / D / V / TOML

c = B.buildStyluaCommand({ input: 'main.lua' })
assert('stylua: bin', c.bin === 'stylua')
assert('stylua: write default (no --check)', !c.args.includes('--check'))
c = B.buildStyluaCommand({ input: 'main.lua', write: false })
assert('stylua --check', c.args.includes('--check'))

c = B.buildMixFormatCommand({ input: 'lib/app.ex' })
assert('mix format: bin', c.bin === 'mix')
assert('mix format: subcmd', c.args[0] === 'format')
c = B.buildMixFormatCommand({ input: 'lib/app.ex', write: false })
assert('mix --check-formatted', c.args.includes('--check-formatted'))

c = B.buildErlfmtCommand({ input: 'src/app.erl' })
assert('erlfmt: bin', c.bin === 'erlfmt')
assert('erlfmt: --write', c.args.includes('--write'))

c = B.buildGleamFormatCommand({ input: 'src/main.gleam' })
assert('gleam: bin', c.bin === 'gleam')
assert('gleam: format verb', c.args[0] === 'format')

c = B.buildNixFmtCommand({ input: 'flake.nix' })
assert('nix: bin', c.bin === 'nixpkgs-fmt')

c = B.buildTerraformFmtCommand({ input: 'main.tf' })
assert('terraform: bin', c.bin === 'terraform')
assert('terraform: fmt verb', c.args[0] === 'fmt')
c = B.buildTerraformFmtCommand({ input: 'main.tf', write: false })
assert('terraform: -check', c.args.includes('-check'))

c = B.buildScalafmtCommand({ input: 'Main.scala' })
assert('scalafmt: bin', c.bin === 'scalafmt')
c = B.buildScalafmtCommand({ input: 'Main.scala', write: false })
assert('scalafmt: --test', c.args.includes('--test'))

c = B.buildCljfmtCommand({ input: 'src/core.clj' })
assert('cljfmt: bin', c.bin === 'cljfmt')
assert('cljfmt: fix', c.args[0] === 'fix')
c = B.buildCljfmtCommand({ input: 'src/core.clj', write: false })
assert('cljfmt: check', c.args[0] === 'check')

c = B.buildPhpCsFixerCommand({ input: 'src/User.php' })
assert('php-cs-fixer: bin', c.bin === 'php-cs-fixer')
assert('php-cs-fixer: fix', c.args[0] === 'fix')
c = B.buildPhpCsFixerCommand({ input: 'src/User.php', write: false })
assert('php-cs-fixer: --dry-run', c.args.includes('--dry-run'))

c = B.buildPerltidyCommand({ input: 'script.pl' })
assert('perltidy: bin', c.bin === 'perltidy')
assert('perltidy: -b', c.args.includes('-b'))
c = B.buildPerltidyCommand({ input: 'script.pl', write: false })
assert('perltidy: no -b', !c.args.includes('-b'))

c = B.buildElmFormatCommand({ input: 'src/Main.elm' })
assert('elm-format: bin', c.bin === 'elm-format')
assert('elm-format: --yes', c.args.includes('--yes'))
c = B.buildElmFormatCommand({ input: 'src/Main.elm', write: false })
assert('elm-format: --validate', c.args.includes('--validate'))

c = B.buildPursTidyCommand({ input: 'src/Main.purs' })
assert('purs-tidy: bin', c.bin === 'purs-tidy')
assert('purs-tidy: format-in-place', c.args[0] === 'format-in-place')
c = B.buildPursTidyCommand({ input: 'src/Main.purs', write: false })
assert('purs-tidy: format stdout', c.args[0] === 'format')

c = B.buildNimprettyCommand({ input: 'main.nim' })
assert('nimpretty: bin', c.bin === 'nimpretty')
c = B.buildNimprettyCommand({ input: 'main.nim', write: false })
assert('nimpretty: -o:/dev/stdout', c.args.includes('-o:/dev/stdout'))

c = B.buildCrystalFormatCommand({ input: 'main.cr' })
assert('crystal: bin', c.bin === 'crystal')
assert('crystal: tool format', has(c, 'tool format'))

c = B.buildDfmtCommand({ input: 'main.d' })
assert('dfmt: bin', c.bin === 'dfmt')
assert('dfmt: --inplace', c.args.includes('--inplace'))

c = B.buildVFmtCommand({ input: 'main.v' })
assert('v fmt: bin', c.bin === 'v')
assert('v fmt: fmt verb', c.args[0] === 'fmt')
assert('v fmt: -w', c.args.includes('-w'))

c = B.buildTaploCommand({ input: 'Cargo.toml' })
assert('taplo: bin', c.bin === 'taplo')
assert('taplo: format verb', c.args[0] === 'format')
c = B.buildTaploCommand({ input: 'Cargo.toml', write: false })
assert('taplo: --check', c.args.includes('--check'))

// ---- extra args propagation -----------------------------------

c = B.buildPrettierCommand({
  input: 'src/x.ts',
  parser: 'typescript',
  extra: ['--print-width', '100'],
})
assert('extra args appended', has(c, '--print-width 100'))

// ---- exit ------------------------------------------------------

if (failures > 0) {
  process.stdout.write(`\n  ${failures} assertion(s) failed\n`)
  process.exit(1)
}
process.stdout.write('\n  all builder asserts passed\n')
