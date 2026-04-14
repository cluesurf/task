import { z } from 'zod'

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
import {
  CLANG_FORMAT,
  FORMAT_CODE_FORMAT,
  PRETTIER_ARROW_PARENS_OPTION,
  PRETTIER_END_OF_LINE_OPTION,
  PRETTIER_HTML_WHITESPACE_SENSITIVITY_OPTION,
  PRETTIER_PLUGIN,
  PRETTIER_PROSE_WRAP_OPTION,
  PRETTIER_TYPESCRIPT_TRAILING_COMMA_OPTION,
  PRETTIER_XML_QUOTE_ATTRIBUTES_OPTION,
  PRETTIER_XML_WHITESPACE_SENSITIVITY_OPTION,
} from '~/code/form/action/format/code/shared/base'
import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/take'

export const ClangFormatParser = z.enum(
  CLANG_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ClangFormat>

export const FormatApiParser = z.object({
  format: z.string(),
})

export type FormatApiRecord = z.infer<typeof FormatApiParser>

export const FormatCParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type FormatCRecord = z.infer<typeof FormatCParser>

export const FormatCodeFormatParser = z.enum(
  FORMAT_CODE_FORMAT as readonly [string, ...string[]],
) as z.ZodType<FormatCodeFormat>

export const FormatCodeWithPrettierParser = z.object({
  code: z.string(),
  format: z.lazy(() => PrettierPluginParser),
})

export type FormatCodeWithPrettierRecord = z.infer<
  typeof FormatCodeWithPrettierParser
>

export const FormatCppParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type FormatCppRecord = z.infer<typeof FormatCppParser>

export const FormatCssWithPrettierParser = z.object({
  code: z.string(),
  singleQuote: z.optional(z.boolean()).default(false),
})

export type FormatCssWithPrettierRecord = z.infer<
  typeof FormatCssWithPrettierParser
>

export const FormatGraphqlWithPrettierParser = z.object({
  code: z.string(),
  bracketSpacing: z.optional(z.boolean()).default(true),
})

export type FormatGraphqlWithPrettierRecord = z.infer<
  typeof FormatGraphqlWithPrettierParser
>

export const FormatHtmlWithPrettierParser = z.object({
  code: z.string(),
  bracketSameLine: z.optional(z.boolean()).default(false),
  htmlWhitespaceSensitivity: z
    .optional(
      z.lazy(() => PrettierHtmlWhitespaceSensitivityOptionParser),
    )
    .default('css'),
  singleAttributePerLine: z.optional(z.boolean()).default(false),
  vueIndentScriptAndStyle: z.optional(z.boolean()).default(false),
})

export type FormatHtmlWithPrettierRecord = z.infer<
  typeof FormatHtmlWithPrettierParser
>

export const FormatJavaParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type FormatJavaRecord = z.infer<typeof FormatJavaParser>

export const FormatJavaWithPrettierParser = z.object({
  code: z.string(),
  maxLineLength: z.optional(z.number().int().gte(0)),
  indentationSize: z.optional(z.number().int().gte(0)),
  useTabs: z.optional(z.boolean()),
  trailingComma: z.optional(z.boolean()),
})

export type FormatJavaWithPrettierRecord = z.infer<
  typeof FormatJavaWithPrettierParser
>

export const FormatMarkdownWithPrettierParser = z.object({
  code: z.string(),
  proseWrap: z
    .optional(z.lazy(() => PrettierProseWrapOptionParser))
    .default('preserve'),
  singleQuote: z.optional(z.boolean()).default(false),
})

export type FormatMarkdownWithPrettierRecord = z.infer<
  typeof FormatMarkdownWithPrettierParser
>

export const FormatRubyParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type FormatRubyRecord = z.infer<typeof FormatRubyParser>

export const FormatRustWithPrettierParser = z.object({
  code: z.string(),
  useTabs: z.optional(z.boolean()),
  indentationSize: z.optional(z.number().int().gte(0)),
  maxLineLength: z.optional(z.number().int().gte(0)),
  endOfLine: z.optional(z.lazy(() => PrettierEndOfLineOptionParser)),
})

export type FormatRustWithPrettierRecord = z.infer<
  typeof FormatRustWithPrettierParser
>

export const FormatShWithPrettierParser = z.object({
  code: z.string(),
  keepComments: z.optional(z.boolean()),
  stopAt: z.optional(z.string()),
  variant: z.optional(z.string()),
  indent: z.optional(z.number().int().gte(0)),
  binaryNextLine: z.optional(z.boolean()),
  switchCaseIndent: z.optional(z.boolean()),
  spaceRedirects: z.optional(z.boolean()),
  keepPadding: z.optional(z.boolean()),
  minify: z.optional(z.boolean()),
  functionNextLine: z.optional(z.boolean()),
})

export type FormatShWithPrettierRecord = z.infer<
  typeof FormatShWithPrettierParser
>

export const FormatSqlWithContentParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.object({
      content: z.union([z.instanceof(ArrayBuffer), z.string()]),
    }),
  }),
})

export type FormatSqlWithContentRecord = z.infer<
  typeof FormatSqlWithContentParser
>

export const FormatTypescriptWithPrettierParser = z.object({
  code: z.string(),
  jsxSingleQuote: z.optional(z.boolean()),
  singleQuote: z.optional(z.boolean()),
  semiColon: z.optional(z.boolean()),
  indentationSize: z.optional(z.number().int().gte(0)),
  maxLineLength: z.optional(z.number().int().gte(0)),
  trailingComma: z.optional(
    z.lazy(() => PrettierTypescriptTrailingCommaOptionParser),
  ),
  bracketSpacing: z.optional(z.boolean()),
  bracketSameLine: z.optional(z.boolean()),
  arrowParentheses: z.optional(
    z.lazy(() => PrettierArrowParensOptionParser),
  ),
  endOfLine: z.optional(z.lazy(() => PrettierEndOfLineOptionParser)),
  singleAttributePerLine: z.optional(z.boolean()),
})

export type FormatTypescriptWithPrettierRecord = z.infer<
  typeof FormatTypescriptWithPrettierParser
>

export const FormatXmlWithPrettierParser = z.object({
  code: z.string(),
  xmlSelfClosingSpace: z.optional(z.boolean()).default(true),
  indentationSize: z.optional(z.number().int().gte(0)).default(2),
  xmlWhitespaceSensitivity: z
    .optional(
      z.lazy(() => PrettierXmlWhitespaceSensitivityOptionParser),
    )
    .default('strict'),
  maxLineLength: z.optional(z.number().int().gte(0)).default(80),
  xmlSortAttributesByKey: z.optional(z.boolean()).default(true),
  xmlQuoteAttributes: z
    .optional(z.lazy(() => PrettierXmlQuoteAttributesOptionParser))
    .default('preserve'),
})

export type FormatXmlWithPrettierRecord = z.infer<
  typeof FormatXmlWithPrettierParser
>

export const FormatYamlWithPrettierParser = z.object({
  code: z.string(),
  bracketSpacing: z.optional(z.boolean()).default(true),
  singleQuote: z.optional(z.boolean()).default(false),
  proseWrap: z
    .optional(z.lazy(() => PrettierProseWrapOptionParser))
    .default('preserve'),
})

export type FormatYamlWithPrettierRecord = z.infer<
  typeof FormatYamlWithPrettierParser
>

export const PrettierArrowParensOptionParser = z.enum(
  PRETTIER_ARROW_PARENS_OPTION as readonly [string, ...string[]],
) as z.ZodType<PrettierArrowParensOption>

export const PrettierEndOfLineOptionParser = z.enum(
  PRETTIER_END_OF_LINE_OPTION as readonly [string, ...string[]],
) as z.ZodType<PrettierEndOfLineOption>

export const PrettierHtmlWhitespaceSensitivityOptionParser = z.enum(
  PRETTIER_HTML_WHITESPACE_SENSITIVITY_OPTION as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<PrettierHtmlWhitespaceSensitivityOption>

export const PrettierPluginParser = z.enum(
  PRETTIER_PLUGIN as readonly [string, ...string[]],
) as z.ZodType<PrettierPlugin>

export const PrettierProseWrapOptionParser = z.enum(
  PRETTIER_PROSE_WRAP_OPTION as readonly [string, ...string[]],
) as z.ZodType<PrettierProseWrapOption>

export const PrettierTypescriptTrailingCommaOptionParser = z.enum(
  PRETTIER_TYPESCRIPT_TRAILING_COMMA_OPTION as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<PrettierTypescriptTrailingCommaOption>

export const PrettierXmlQuoteAttributesOptionParser = z.enum(
  PRETTIER_XML_QUOTE_ATTRIBUTES_OPTION as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<PrettierXmlQuoteAttributesOption>

export const PrettierXmlWhitespaceSensitivityOptionParser = z.enum(
  PRETTIER_XML_WHITESPACE_SENSITIVITY_OPTION as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<PrettierXmlWhitespaceSensitivityOption>

export const ResolveInputForFormatLocalExternalParser = z.object({
  pathScope: z.optional(z.string()),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
})

export type ResolveInputForFormatLocalExternalRecord = z.infer<
  typeof ResolveInputForFormatLocalExternalParser
>

export const ResolveInputForFormatLocalInternalParser = z.object({
  pathScope: z.optional(z.string()),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
})

export type ResolveInputForFormatLocalInternalRecord = z.infer<
  typeof ResolveInputForFormatLocalInternalParser
>

export const ResolveInputForFormatRemoteParser = z.object({
  pathScope: z.optional(z.string()),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
})

export type ResolveInputForFormatRemoteRecord = z.infer<
  typeof ResolveInputForFormatRemoteParser
>
