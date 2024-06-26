// bash format
// shfmt -l -w script.sh
import { format as _formatSql } from 'sql-formatter'
import decodeUtf8 from 'decode-utf8'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command.js'
import {
  FormatAssemblyCommandInput,
  FormatCodeWithClangFormatCommandInput,
  FormatKotlinCommandInput,
  FormatPythonCommandInput,
  FormatRuby,
  FormatRustCommandInput,
  FormatSqlWithContent,
  FormatSwiftCommandInput,
} from '~/code/type/shared/index.js'

export function buildCommandToFormatCodeWithClangFormat(
  input: FormatCodeWithClangFormatCommandInput,
) {
  const cmd = getCommand(`clang-format`)
  cmd.link.push(
    `--style="${input.style.path}"`,
    `"${input.input.file.path}"`,
  )
  return buildCommandSequence(cmd)
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
) {
  const cmd = getCommand('ktfmt')
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToFormatSwift(
  input: FormatSwiftCommandInput,
) {
  const cmd = getCommand('swift-format')
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToFormatRust(
  input: FormatRustCommandInput,
) {
  const cmd = getCommand('rustfmt')
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToFormatPython(
  input: FormatPythonCommandInput,
) {
  const cmd = getCommand('black')
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToFormatRuby(input: FormatRuby) {
  const cmd = getCommand('rubocop')
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToFormatAssembly(
  input: FormatAssemblyCommandInput,
) {
  const cmd = getCommand('asmfmt')
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

// rubocop --autocorrect file.rb

// antlr4-parse Expr.g4 prog -tree

// perltidy somefile.pl
// latexindent.pl.
// https://github.com/Koihik/LuaFormatter
// https://github.com/pseewald/fprettify
// https://github.com/thomasrussellmurphy/istyle-verilog-formatter
