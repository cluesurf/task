/**
 * Yargs command group for `task format <language> [options]`.
 *
 * Each language's formatter lives at
 * `code/call/format/code/<language>/console.ts` (programming
 * languages) or `code/call/format/markup/<language>/console.ts`
 * (HTML/CSS/JS/TS/YAML/JSON/MD via prettier). The intermediate
 * `/code/` and `/markup/` segments are folder organization only —
 * from the CLI the command is flat (`task format python ...`).
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'

// existing
import { formatAssemblyConsole } from './code/assembly/console'
import { formatClangConsole } from './code/clang/console'
import { formatKotlinConsole } from './code/kotlin/console'
import { formatPythonConsole } from './code/python/console'
import { formatRubyConsole } from './code/ruby/console'
import { formatRustConsole } from './code/rust/console'
import { formatSwiftConsole } from './code/swift/console'

// new languages
import { formatGoConsole } from './code/go/console'
import { formatJavaConsole } from './code/java/console'
import { formatShellConsole } from './code/shell/console'
import { formatSqlConsole } from './code/sql/console'
import { formatDartConsole } from './code/dart/console'
import { formatHaskellConsole } from './code/haskell/console'
import { formatOcamlConsole } from './code/ocaml/console'
import { formatZigConsole } from './code/zig/console'
import { formatClangTidyConsole } from './code/clang-tidy/console'

// batch 2: Lua / BEAM / Nix / Terraform / JVM-scala-clojure /
// PHP / Perl / Elm / PureScript / Nim / Crystal / D / V / TOML
import { formatLuaConsole } from './code/lua/console'
import { formatElixirConsole } from './code/elixir/console'
import { formatErlangConsole } from './code/erlang/console'
import { formatGleamConsole } from './code/gleam/console'
import { formatNixConsole } from './code/nix/console'
import { formatTerraformConsole } from './code/terraform/console'
import { formatScalaConsole } from './code/scala/console'
import { formatClojureConsole } from './code/clojure/console'
import { formatPhpConsole } from './code/php/console'
import { formatPerlConsole } from './code/perl/console'
import { formatElmConsole } from './code/elm/console'
import { formatPurescriptConsole } from './code/purescript/console'
import { formatNimConsole } from './code/nimpretty/console'
import { formatCrystalConsole } from './code/crystal/console'
import { formatDConsole } from './code/d/console'
import { formatVConsole } from './code/v-fmt/console'
import { formatTomlConsole } from './code/toml/console'

// project-wide zero-config formatter
import { formatCodeConsole } from './code-runner/console'

// prettier-fronted markup formatters
import { formatHtmlConsole } from './markup/html/console'
import { formatCssConsole } from './markup/css/console'
import { formatJsConsole } from './markup/js/console'
import { formatTsConsole } from './markup/ts/console'
import { formatYamlConsole } from './markup/yaml/console'
import { formatJsonConsole } from './markup/json/console'
import { formatMarkdownConsole } from './markup/markdown/console'

registerGroupHelp({
  command: 'task format',
  describe: 'Format source code with a language-specific formatter',
  commands: [
    { name: 'code',       describe: 'Project mode — infer ecosystem and run its formatter' },
    { name: 'assembly',   describe: 'asmfmt' },
    { name: 'clang',      describe: 'C / C++ / Objective-C (clang-format)' },
    { name: 'clang-tidy', describe: 'Apply clang-tidy fixes' },
    { name: 'kotlin',     describe: 'Kotlin (ktlint)' },
    { name: 'python',     describe: 'Python (black / ruff)' },
    { name: 'ruby',       describe: 'Ruby (rubocop)' },
    { name: 'rust',       describe: 'Rust (rustfmt)' },
    { name: 'swift',      describe: 'Swift (swift-format)' },
    { name: 'go',         describe: 'Go (gofmt -s -w)' },
    { name: 'java',       describe: 'Java (google-java-format)' },
    { name: 'shell',      describe: 'Shell scripts (shfmt)' },
    { name: 'sql',        describe: 'SQL (sql-formatter)' },
    { name: 'dart',       describe: 'Dart (dart format)' },
    { name: 'haskell',    describe: 'Haskell (ormolu)' },
    { name: 'ocaml',      describe: 'OCaml (ocamlformat)' },
    { name: 'zig',        describe: 'Zig (zig fmt)' },
    { name: 'html',       describe: 'HTML (prettier)' },
    { name: 'css',        describe: 'CSS (prettier)' },
    { name: 'js',         describe: 'JavaScript (prettier --parser babel)' },
    { name: 'ts',         describe: 'TypeScript (prettier)' },
    { name: 'yaml',       describe: 'YAML (prettier)' },
    { name: 'json',       describe: 'JSON (prettier)' },
    { name: 'markdown',   describe: 'Markdown (prettier)' },
    { name: 'lua',        describe: 'Lua (stylua)' },
    { name: 'elixir',     describe: 'Elixir (mix format)' },
    { name: 'erlang',     describe: 'Erlang (erlfmt)' },
    { name: 'gleam',      describe: 'Gleam (gleam format)' },
    { name: 'nix',        describe: 'Nix (nixpkgs-fmt)' },
    { name: 'terraform',  describe: 'Terraform / HCL (terraform fmt)' },
    { name: 'scala',      describe: 'Scala (scalafmt)' },
    { name: 'clojure',    describe: 'Clojure (cljfmt)' },
    { name: 'php',        describe: 'PHP (php-cs-fixer)' },
    { name: 'perl',       describe: 'Perl (perltidy)' },
    { name: 'elm',        describe: 'Elm (elm-format)' },
    { name: 'purescript', describe: 'PureScript (purs-tidy)' },
    { name: 'nim',        describe: 'Nim (nimpretty)' },
    { name: 'crystal',    describe: 'Crystal (crystal tool format)' },
    { name: 'd',          describe: 'D (dfmt)' },
    { name: 'v',          describe: 'V (v fmt)' },
    { name: 'toml',       describe: 'TOML (taplo format)' },
  ],
})

export const formatConsole: CommandModule = {
  command: 'format <language>',
  describe: 'Format source code with a language-specific formatter',
  builder: y =>
    y
      .command(formatCodeConsole)
      .command(formatAssemblyConsole)
      .command(formatClangConsole)
      .command(formatClangTidyConsole)
      .command(formatKotlinConsole)
      .command(formatPythonConsole)
      .command(formatRubyConsole)
      .command(formatRustConsole)
      .command(formatSwiftConsole)
      .command(formatGoConsole)
      .command(formatJavaConsole)
      .command(formatShellConsole)
      .command(formatSqlConsole)
      .command(formatDartConsole)
      .command(formatHaskellConsole)
      .command(formatOcamlConsole)
      .command(formatZigConsole)
      .command(formatHtmlConsole)
      .command(formatCssConsole)
      .command(formatJsConsole)
      .command(formatTsConsole)
      .command(formatYamlConsole)
      .command(formatJsonConsole)
      .command(formatMarkdownConsole)
      .command(formatLuaConsole)
      .command(formatElixirConsole)
      .command(formatErlangConsole)
      .command(formatGleamConsole)
      .command(formatNixConsole)
      .command(formatTerraformConsole)
      .command(formatScalaConsole)
      .command(formatClojureConsole)
      .command(formatPhpConsole)
      .command(formatPerlConsole)
      .command(formatElmConsole)
      .command(formatPurescriptConsole)
      .command(formatNimConsole)
      .command(formatCrystalConsole)
      .command(formatDConsole)
      .command(formatVConsole)
      .command(formatTomlConsole)
      .demandCommand(1, 'Specify a language'),
  handler: () => {},
}
