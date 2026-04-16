// bash format
// shfmt -l -w script.sh
import { format as _formatSql } from 'sql-formatter'
import decodeUtf8 from 'decode-utf8'
import {
  FormatAssemblyCommandInput,
  FormatCodeWithClangFormatCommandInput,
  FormatKotlinCommandInput,
  FormatPythonCommandInput,
  FormatRustCommandInput,
  FormatSwiftCommandInput,
} from '~/code/form/action/format/code/cli'
import {
  FormatRuby,
  FormatSqlWithContent,
} from '~/code/form/action/format/code/shared'
export function buildCommandToFormatCodeWithClangFormat(
  input: FormatCodeWithClangFormatCommandInput,
): { bin: string; args: string[] } {
  const bin = 'clang-format'
  const args: string[] = [
    `--style=${input.style.path}`,
    input.input.file.path,
  ]
  return { bin, args }
}

// https://github.com/sql-formatter-org/sql-formatter?tab=readme-ov-file
export function formatSqlWithContent(input: FormatSqlWithContent) {
  const text =
    input.input.file.content instanceof ArrayBuffer
      ? decodeUtf8(input.input.file.content)
      : input.input.file.content
  return _formatSql(text)
}

// objdump disassembly
export function buildCommandToFormatKotlin(
  input: FormatKotlinCommandInput,
): { bin: string; args: string[] } {
  const bin = 'ktfmt'
  const args: string[] = [input.input.file.path]
  return { bin, args }
}

export function buildCommandToFormatSwift(
  input: FormatSwiftCommandInput,
): { bin: string; args: string[] } {
  const bin = 'swift-format'
  const args: string[] = [input.input.file.path]
  return { bin, args }
}

export function buildCommandToFormatRust(
  input: FormatRustCommandInput,
): { bin: string; args: string[] } {
  const bin = 'rustfmt'
  const args: string[] = [input.input.file.path]
  return { bin, args }
}

export function buildCommandToFormatPython(
  input: FormatPythonCommandInput,
): { bin: string; args: string[] } {
  const bin = 'black'
  const args: string[] = [input.input.file.path]
  return { bin, args }
}

export function buildCommandToFormatRuby(input: FormatRuby): { bin: string; args: string[] } {
  const bin = 'rubocop'
  const args: string[] = [input.input.file.path]
  return { bin, args }
}

export function buildCommandToFormatAssembly(
  input: FormatAssemblyCommandInput,
): { bin: string; args: string[] } {
  const bin = 'asmfmt'
  const args: string[] = [input.input.file.path]
  return { bin, args }
}

// rubocop --autocorrect file.rb

// antlr4-parse Expr.g4 prog -tree

// perltidy somefile.pl
// latexindent.pl.
// https://github.com/Koihik/LuaFormatter
// https://github.com/pseewald/fprettify
// https://github.com/thomasrussellmurphy/istyle-verilog-formatter
