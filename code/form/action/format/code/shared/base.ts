import {
  ClangFormat,
  FormatCodeFormat,
  PrettierArrowParensOption,
  PrettierEndOfLineOption,
  PrettierHtmlWhitespaceSensitivityOption,
  PrettierPlugin,
  PrettierProseWrapOption,
  PrettierTypescriptTrailingCommaOption,
  PrettierXmlQuoteAttributesOption,
  PrettierXmlWhitespaceSensitivityOption,
} from '~/code/form/action/format/code/shared'

export const CLANG_FORMAT: ReadonlyArray<ClangFormat> = ['c', 'cpp']
export const FORMAT_CODE_FORMAT: ReadonlyArray<FormatCodeFormat> = [
  'angular',
  'flow',
  'glimmer',
  'graphql',
  'html',
  'markdown',
  'meriyah',
  'postcss',
  'typescript',
  'yaml',
  'python',
  'swift',
  'c',
  'assembly',
  'cpp',
  'sql',
]
export const PRETTIER_ARROW_PARENS_OPTION: ReadonlyArray<PrettierArrowParensOption> =
  ['always', 'avoid']
export const PRETTIER_END_OF_LINE_OPTION: ReadonlyArray<PrettierEndOfLineOption> =
  ['lf', 'crlf', 'cr', 'auto']
export const PRETTIER_HTML_WHITESPACE_SENSITIVITY_OPTION: ReadonlyArray<PrettierHtmlWhitespaceSensitivityOption> =
  ['css', 'strict', 'ignore']
export const PRETTIER_PLUGIN: ReadonlyArray<PrettierPlugin> = [
  'angular',
  'flow',
  'glimmer',
  'graphql',
  'html',
  'markdown',
  'meriyah',
  'postcss',
  'typescript',
  'yaml',
]
export const PRETTIER_PROSE_WRAP_OPTION: ReadonlyArray<PrettierProseWrapOption> =
  ['always', 'never', 'preserve']
export const PRETTIER_TYPESCRIPT_TRAILING_COMMA_OPTION: ReadonlyArray<PrettierTypescriptTrailingCommaOption> =
  ['all', 'es5', 'none']
export const PRETTIER_XML_QUOTE_ATTRIBUTES_OPTION: ReadonlyArray<PrettierXmlQuoteAttributesOption> =
  ['preserve', 'single', 'double']
export const PRETTIER_XML_WHITESPACE_SENSITIVITY_OPTION: ReadonlyArray<PrettierXmlWhitespaceSensitivityOption> =
  ['strict', 'preserve', 'ignore']
