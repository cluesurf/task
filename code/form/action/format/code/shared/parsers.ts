import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ClangFormat,
  FormatApi,
  FormatC,
  FormatCodeFormat,
  FormatCodeWithPrettier,
  FormatCpp,
  FormatCssWithPrettier,
  FormatGraphqlWithPrettier,
  FormatHtmlWithPrettier,
  FormatJava,
  FormatJavaWithPrettier,
  FormatMarkdownWithPrettier,
  FormatRuby,
  FormatRustWithPrettier,
  FormatShWithPrettier,
  FormatSqlWithContent,
  FormatTypescriptWithPrettier,
  FormatXmlWithPrettier,
  FormatYamlWithPrettier,
  PrettierArrowParensOption,
  PrettierEndOfLineOption,
  PrettierHtmlWhitespaceSensitivityOption,
  PrettierPlugin,
  PrettierProseWrapOption,
  PrettierTypescriptTrailingCommaOption,
  PrettierXmlQuoteAttributesOption,
  PrettierXmlWhitespaceSensitivityOption,
  ResolveInputForFormatLocalExternal,
  ResolveInputForFormatLocalInternal,
  ResolveInputForFormatRemote,
} from '~/code/form/action/format/code/shared/index'
import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/parsers'

let ClangFormatModel: z.ZodType<ClangFormat>

export const ClangFormatParser = () => {
  if (!ClangFormatModel) {
    ClangFormatModel = z.enum(
      LOAD('clang_format') as readonly [string, ...string[]],
    ) as z.ZodType<ClangFormat>
  }
  return ClangFormatModel!
}

let FormatApiModel: z.ZodType<FormatApi>

export const FormatApiParser = (): z.ZodType<FormatApi> => {
  if (!FormatApiModel) {
    FormatApiModel = z.object({
      format: z.string(),
    }) as z.ZodType<FormatApi>
  }
  return FormatApiModel!
}

let FormatCModel: z.ZodType<FormatC>

export const FormatCParser = (): z.ZodType<FormatC> => {
  if (!FormatCModel) {
    FormatCModel = z.object({
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
    }) as z.ZodType<FormatC>
  }
  return FormatCModel!
}

let FormatCodeFormatModel: z.ZodType<FormatCodeFormat>

export const FormatCodeFormatParser = () => {
  if (!FormatCodeFormatModel) {
    FormatCodeFormatModel = z.enum(
      LOAD('format_code_format') as readonly [string, ...string[]],
    ) as z.ZodType<FormatCodeFormat>
  }
  return FormatCodeFormatModel!
}

let FormatCodeWithPrettierModel: z.ZodType<FormatCodeWithPrettier>

export const FormatCodeWithPrettierParser =
  (): z.ZodType<FormatCodeWithPrettier> => {
    if (!FormatCodeWithPrettierModel) {
      FormatCodeWithPrettierModel = z.object({
        code: z.string(),
        format: z.lazy(() => PrettierPluginParser()),
      }) as z.ZodType<FormatCodeWithPrettier>
    }
    return FormatCodeWithPrettierModel!
  }

let FormatCppModel: z.ZodType<FormatCpp>

export const FormatCppParser = (): z.ZodType<FormatCpp> => {
  if (!FormatCppModel) {
    FormatCppModel = z.object({
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
    }) as z.ZodType<FormatCpp>
  }
  return FormatCppModel!
}

let FormatCssWithPrettierModel: z.ZodType<FormatCssWithPrettier>

export const FormatCssWithPrettierParser =
  (): z.ZodType<FormatCssWithPrettier> => {
    if (!FormatCssWithPrettierModel) {
      FormatCssWithPrettierModel = z.object({
        code: z.string(),
        singleQuote: z.optional(z.boolean()).default(false),
      }) as z.ZodType<FormatCssWithPrettier>
    }
    return FormatCssWithPrettierModel!
  }

let FormatGraphqlWithPrettierModel: z.ZodType<FormatGraphqlWithPrettier>

export const FormatGraphqlWithPrettierParser =
  (): z.ZodType<FormatGraphqlWithPrettier> => {
    if (!FormatGraphqlWithPrettierModel) {
      FormatGraphqlWithPrettierModel = z.object({
        code: z.string(),
        bracketSpacing: z.optional(z.boolean()).default(true),
      }) as z.ZodType<FormatGraphqlWithPrettier>
    }
    return FormatGraphqlWithPrettierModel!
  }

let FormatHtmlWithPrettierModel: z.ZodType<FormatHtmlWithPrettier>

export const FormatHtmlWithPrettierParser =
  (): z.ZodType<FormatHtmlWithPrettier> => {
    if (!FormatHtmlWithPrettierModel) {
      FormatHtmlWithPrettierModel = z.object({
        code: z.string(),
        bracketSameLine: z.optional(z.boolean()).default(false),
        htmlWhitespaceSensitivity: z
          .optional(
            z.lazy(() =>
              PrettierHtmlWhitespaceSensitivityOptionParser(),
            ),
          )
          .default('css'),
        singleAttributePerLine: z.optional(z.boolean()).default(false),
        vueIndentScriptAndStyle: z.optional(z.boolean()).default(false),
      }) as z.ZodType<FormatHtmlWithPrettier>
    }
    return FormatHtmlWithPrettierModel!
  }

let FormatJavaModel: z.ZodType<FormatJava>

export const FormatJavaParser = (): z.ZodType<FormatJava> => {
  if (!FormatJavaModel) {
    FormatJavaModel = z.object({
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
    }) as z.ZodType<FormatJava>
  }
  return FormatJavaModel!
}

let FormatJavaWithPrettierModel: z.ZodType<FormatJavaWithPrettier>

export const FormatJavaWithPrettierParser =
  (): z.ZodType<FormatJavaWithPrettier> => {
    if (!FormatJavaWithPrettierModel) {
      FormatJavaWithPrettierModel = z.object({
        code: z.string(),
        maxLineLength: z.optional(z.number().int().gte(0)),
        indentationSize: z.optional(z.number().int().gte(0)),
        useTabs: z.optional(z.boolean()),
        trailingComma: z.optional(z.boolean()),
      }) as z.ZodType<FormatJavaWithPrettier>
    }
    return FormatJavaWithPrettierModel!
  }

let FormatMarkdownWithPrettierModel: z.ZodType<FormatMarkdownWithPrettier>

export const FormatMarkdownWithPrettierParser =
  (): z.ZodType<FormatMarkdownWithPrettier> => {
    if (!FormatMarkdownWithPrettierModel) {
      FormatMarkdownWithPrettierModel = z.object({
        code: z.string(),
        proseWrap: z
          .optional(z.lazy(() => PrettierProseWrapOptionParser()))
          .default('preserve'),
        singleQuote: z.optional(z.boolean()).default(false),
      }) as z.ZodType<FormatMarkdownWithPrettier>
    }
    return FormatMarkdownWithPrettierModel!
  }

let FormatRubyModel: z.ZodType<FormatRuby>

export const FormatRubyParser = (): z.ZodType<FormatRuby> => {
  if (!FormatRubyModel) {
    FormatRubyModel = z.object({
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
    }) as z.ZodType<FormatRuby>
  }
  return FormatRubyModel!
}

let FormatRustWithPrettierModel: z.ZodType<FormatRustWithPrettier>

export const FormatRustWithPrettierParser =
  (): z.ZodType<FormatRustWithPrettier> => {
    if (!FormatRustWithPrettierModel) {
      FormatRustWithPrettierModel = z.object({
        code: z.string(),
        useTabs: z.optional(z.boolean()),
        indentationSize: z.optional(z.number().int().gte(0)),
        maxLineLength: z.optional(z.number().int().gte(0)),
        endOfLine: z.optional(
          z.lazy(() => PrettierEndOfLineOptionParser()),
        ),
      }) as z.ZodType<FormatRustWithPrettier>
    }
    return FormatRustWithPrettierModel!
  }

let FormatShWithPrettierModel: z.ZodType<FormatShWithPrettier>

export const FormatShWithPrettierParser =
  (): z.ZodType<FormatShWithPrettier> => {
    if (!FormatShWithPrettierModel) {
      FormatShWithPrettierModel = z.object({
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
      }) as z.ZodType<FormatShWithPrettier>
    }
    return FormatShWithPrettierModel!
  }

let FormatSqlWithContentModel: z.ZodType<FormatSqlWithContent>

export const FormatSqlWithContentParser =
  (): z.ZodType<FormatSqlWithContent> => {
    if (!FormatSqlWithContentModel) {
      FormatSqlWithContentModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.union([z.instanceof(ArrayBuffer), z.string()]),
          }),
        }),
      }) as z.ZodType<FormatSqlWithContent>
    }
    return FormatSqlWithContentModel!
  }

let FormatTypescriptWithPrettierModel: z.ZodType<FormatTypescriptWithPrettier>

export const FormatTypescriptWithPrettierParser =
  (): z.ZodType<FormatTypescriptWithPrettier> => {
    if (!FormatTypescriptWithPrettierModel) {
      FormatTypescriptWithPrettierModel = z.object({
        code: z.string(),
        jsxSingleQuote: z.optional(z.boolean()),
        singleQuote: z.optional(z.boolean()),
        semiColon: z.optional(z.boolean()),
        indentationSize: z.optional(z.number().int().gte(0)),
        maxLineLength: z.optional(z.number().int().gte(0)),
        trailingComma: z.optional(
          z.lazy(() => PrettierTypescriptTrailingCommaOptionParser()),
        ),
        bracketSpacing: z.optional(z.boolean()),
        bracketSameLine: z.optional(z.boolean()),
        arrowParentheses: z.optional(
          z.lazy(() => PrettierArrowParensOptionParser()),
        ),
        endOfLine: z.optional(
          z.lazy(() => PrettierEndOfLineOptionParser()),
        ),
        singleAttributePerLine: z.optional(z.boolean()),
      }) as z.ZodType<FormatTypescriptWithPrettier>
    }
    return FormatTypescriptWithPrettierModel!
  }

let FormatXmlWithPrettierModel: z.ZodType<FormatXmlWithPrettier>

export const FormatXmlWithPrettierParser =
  (): z.ZodType<FormatXmlWithPrettier> => {
    if (!FormatXmlWithPrettierModel) {
      FormatXmlWithPrettierModel = z.object({
        code: z.string(),
        xmlSelfClosingSpace: z.optional(z.boolean()).default(true),
        indentationSize: z.optional(z.number().int().gte(0)).default(2),
        xmlWhitespaceSensitivity: z
          .optional(
            z.lazy(() =>
              PrettierXmlWhitespaceSensitivityOptionParser(),
            ),
          )
          .default('strict'),
        maxLineLength: z.optional(z.number().int().gte(0)).default(80),
        xmlSortAttributesByKey: z.optional(z.boolean()).default(true),
        xmlQuoteAttributes: z
          .optional(
            z.lazy(() => PrettierXmlQuoteAttributesOptionParser()),
          )
          .default('preserve'),
      }) as z.ZodType<FormatXmlWithPrettier>
    }
    return FormatXmlWithPrettierModel!
  }

let FormatYamlWithPrettierModel: z.ZodType<FormatYamlWithPrettier>

export const FormatYamlWithPrettierParser =
  (): z.ZodType<FormatYamlWithPrettier> => {
    if (!FormatYamlWithPrettierModel) {
      FormatYamlWithPrettierModel = z.object({
        code: z.string(),
        bracketSpacing: z.optional(z.boolean()).default(true),
        singleQuote: z.optional(z.boolean()).default(false),
        proseWrap: z
          .optional(z.lazy(() => PrettierProseWrapOptionParser()))
          .default('preserve'),
      }) as z.ZodType<FormatYamlWithPrettier>
    }
    return FormatYamlWithPrettierModel!
  }

let PrettierArrowParensOptionModel: z.ZodType<PrettierArrowParensOption>

export const PrettierArrowParensOptionParser = () => {
  if (!PrettierArrowParensOptionModel) {
    PrettierArrowParensOptionModel = z.enum(
      LOAD('prettier_arrow_parens_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierArrowParensOption>
  }
  return PrettierArrowParensOptionModel!
}

let PrettierEndOfLineOptionModel: z.ZodType<PrettierEndOfLineOption>

export const PrettierEndOfLineOptionParser = () => {
  if (!PrettierEndOfLineOptionModel) {
    PrettierEndOfLineOptionModel = z.enum(
      LOAD('prettier_end_of_line_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierEndOfLineOption>
  }
  return PrettierEndOfLineOptionModel!
}

let PrettierHtmlWhitespaceSensitivityOptionModel: z.ZodType<PrettierHtmlWhitespaceSensitivityOption>

export const PrettierHtmlWhitespaceSensitivityOptionParser = () => {
  if (!PrettierHtmlWhitespaceSensitivityOptionModel) {
    PrettierHtmlWhitespaceSensitivityOptionModel = z.enum(
      LOAD('prettier_html_whitespace_sensitivity_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierHtmlWhitespaceSensitivityOption>
  }
  return PrettierHtmlWhitespaceSensitivityOptionModel!
}

let PrettierPluginModel: z.ZodType<PrettierPlugin>

export const PrettierPluginParser = () => {
  if (!PrettierPluginModel) {
    PrettierPluginModel = z.enum(
      LOAD('prettier_plugin') as readonly [string, ...string[]],
    ) as z.ZodType<PrettierPlugin>
  }
  return PrettierPluginModel!
}

let PrettierProseWrapOptionModel: z.ZodType<PrettierProseWrapOption>

export const PrettierProseWrapOptionParser = () => {
  if (!PrettierProseWrapOptionModel) {
    PrettierProseWrapOptionModel = z.enum(
      LOAD('prettier_prose_wrap_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierProseWrapOption>
  }
  return PrettierProseWrapOptionModel!
}

let PrettierTypescriptTrailingCommaOptionModel: z.ZodType<PrettierTypescriptTrailingCommaOption>

export const PrettierTypescriptTrailingCommaOptionParser = () => {
  if (!PrettierTypescriptTrailingCommaOptionModel) {
    PrettierTypescriptTrailingCommaOptionModel = z.enum(
      LOAD('prettier_typescript_trailing_comma_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierTypescriptTrailingCommaOption>
  }
  return PrettierTypescriptTrailingCommaOptionModel!
}

let PrettierXmlQuoteAttributesOptionModel: z.ZodType<PrettierXmlQuoteAttributesOption>

export const PrettierXmlQuoteAttributesOptionParser = () => {
  if (!PrettierXmlQuoteAttributesOptionModel) {
    PrettierXmlQuoteAttributesOptionModel = z.enum(
      LOAD('prettier_xml_quote_attributes_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierXmlQuoteAttributesOption>
  }
  return PrettierXmlQuoteAttributesOptionModel!
}

let PrettierXmlWhitespaceSensitivityOptionModel: z.ZodType<PrettierXmlWhitespaceSensitivityOption>

export const PrettierXmlWhitespaceSensitivityOptionParser = () => {
  if (!PrettierXmlWhitespaceSensitivityOptionModel) {
    PrettierXmlWhitespaceSensitivityOptionModel = z.enum(
      LOAD('prettier_xml_whitespace_sensitivity_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierXmlWhitespaceSensitivityOption>
  }
  return PrettierXmlWhitespaceSensitivityOptionModel!
}

let ResolveInputForFormatLocalExternalModel: z.ZodType<ResolveInputForFormatLocalExternal>

export const ResolveInputForFormatLocalExternalParser =
  (): z.ZodType<ResolveInputForFormatLocalExternal> => {
    if (!ResolveInputForFormatLocalExternalModel) {
      ResolveInputForFormatLocalExternalModel = z.object({
        pathScope: z.optional(z.string()),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForFormatLocalExternal>
    }
    return ResolveInputForFormatLocalExternalModel!
  }

let ResolveInputForFormatLocalInternalModel: z.ZodType<ResolveInputForFormatLocalInternal>

export const ResolveInputForFormatLocalInternalParser =
  (): z.ZodType<ResolveInputForFormatLocalInternal> => {
    if (!ResolveInputForFormatLocalInternalModel) {
      ResolveInputForFormatLocalInternalModel = z.object({
        pathScope: z.optional(z.string()),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForFormatLocalInternal>
    }
    return ResolveInputForFormatLocalInternalModel!
  }

let ResolveInputForFormatRemoteModel: z.ZodType<ResolveInputForFormatRemote>

export const ResolveInputForFormatRemoteParser =
  (): z.ZodType<ResolveInputForFormatRemote> => {
    if (!ResolveInputForFormatRemoteModel) {
      ResolveInputForFormatRemoteModel = z.object({
        pathScope: z.optional(z.string()),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForFormatRemote>
    }
    return ResolveInputForFormatRemoteModel!
  }
