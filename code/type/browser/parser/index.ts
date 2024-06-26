import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@termsurf/form'
import * as code from '~/code/type/code'

import {
  CompileCBrowserInput,
  CompileCBrowserLocalInput,
  CompileCBrowserOutput,
  CompileCBrowserRemoteInput,
  CompileCppBrowserInput,
  CompileCppBrowserLocalInput,
  CompileCppBrowserOutput,
  CompileCppBrowserRemoteInput,
  CompileRustBrowserInput,
  CompileRustBrowserLocalInput,
  CompileRustBrowserOutput,
  CompileRustBrowserRemoteInput,
  CompileSwiftBrowserInput,
  CompileSwiftBrowserLocalInput,
  CompileSwiftBrowserOutput,
  CompileSwiftBrowserRemoteInput,
  CompileWastBrowserInput,
  CompileWastBrowserLocalInput,
  CompileWastBrowserOutput,
  CompileWastBrowserRemoteInput,
  ConvertArchiveBrowserInput,
  ConvertArchiveBrowserLocalInput,
  ConvertArchiveBrowserOutput,
  ConvertArchiveBrowserRemoteInput,
  ConvertDocumentWithCalibreBrowserInput,
  ConvertDocumentWithCalibreBrowserLocalInput,
  ConvertDocumentWithCalibreBrowserOutput,
  ConvertDocumentWithCalibreBrowserRemoteInput,
  ConvertDocumentWithEnscriptBrowserInput,
  ConvertDocumentWithEnscriptBrowserLocalInput,
  ConvertDocumentWithEnscriptBrowserOutput,
  ConvertDocumentWithEnscriptBrowserRemoteInput,
  ConvertDocumentWithJupyterBrowserInput,
  ConvertDocumentWithJupyterBrowserLocalInput,
  ConvertDocumentWithJupyterBrowserOutput,
  ConvertDocumentWithJupyterBrowserRemoteInput,
  ConvertDocumentWithLibreOfficeBrowserInput,
  ConvertDocumentWithLibreOfficeBrowserLocalInput,
  ConvertDocumentWithLibreOfficeBrowserOutput,
  ConvertDocumentWithLibreOfficeBrowserRemoteInput,
  ConvertDocumentWithPandocBrowserInput,
  ConvertDocumentWithPandocBrowserLocalInput,
  ConvertDocumentWithPandocBrowserOutput,
  ConvertDocumentWithPandocBrowserRemoteInput,
  ConvertFontWithFontForgeBrowserInput,
  ConvertFontWithFontForgeBrowserLocalInput,
  ConvertFontWithFontForgeBrowserOutput,
  ConvertFontWithFontForgeBrowserRemoteInput,
  ConvertHtmlWithPuppeteerBrowserInput,
  ConvertHtmlWithPuppeteerBrowserLocalInput,
  ConvertHtmlWithPuppeteerBrowserOutput,
  ConvertHtmlWithPuppeteerBrowserRemoteInput,
  ConvertImageWithImageMagickBrowserInput,
  ConvertImageWithImageMagickBrowserLocalInput,
  ConvertImageWithImageMagickBrowserOutput,
  ConvertImageWithImageMagickBrowserRemoteInput,
  ConvertImageWithInkscapeBrowserInput,
  ConvertImageWithInkscapeBrowserLocalInput,
  ConvertImageWithInkscapeBrowserOutput,
  ConvertImageWithInkscapeBrowserRemoteInput,
  ConvertLatexToPngBrowserInput,
  ConvertLatexToPngBrowserLocalInput,
  ConvertLatexToPngBrowserOutput,
  ConvertLatexToPngBrowserRemoteInput,
  ConvertLatexWithPdfLatexBrowserInput,
  ConvertLatexWithPdfLatexBrowserLocalInput,
  ConvertLatexWithPdfLatexBrowserOutput,
  ConvertLatexWithPdfLatexBrowserRemoteInput,
  ConvertMarkdownWithPuppeteerBrowserInput,
  ConvertMarkdownWithPuppeteerBrowserLocalInput,
  ConvertMarkdownWithPuppeteerBrowserOutput,
  ConvertMarkdownWithPuppeteerBrowserRemoteInput,
  ConvertTxtWithPuppeteerBrowserInput,
  ConvertTxtWithPuppeteerBrowserLocalInput,
  ConvertTxtWithPuppeteerBrowserOutput,
  ConvertTxtWithPuppeteerBrowserRemoteInput,
  ConvertVideoWithFfmpegBrowserInput,
  ConvertVideoWithFfmpegBrowserLocalInput,
  ConvertVideoWithFfmpegBrowserOutput,
  ConvertVideoWithFfmpegBrowserRemoteInput,
  FormatAssemblyBrowserInput,
  FormatAssemblyBrowserLocalInput,
  FormatAssemblyBrowserOutput,
  FormatAssemblyBrowserRemoteInput,
  FormatCodeWithClangFormatBrowserInput,
  FormatCodeWithClangFormatBrowserLocalInput,
  FormatCodeWithClangFormatBrowserOutput,
  FormatCodeWithClangFormatBrowserRemoteInput,
  FormatKotlinBrowserInput,
  FormatKotlinBrowserLocalInput,
  FormatKotlinBrowserOutput,
  FormatKotlinBrowserRemoteInput,
  FormatPythonBrowserInput,
  FormatPythonBrowserLocalInput,
  FormatPythonBrowserOutput,
  FormatPythonBrowserRemoteInput,
  FormatRustBrowserInput,
  FormatRustBrowserLocalInput,
  FormatRustBrowserOutput,
  FormatRustBrowserRemoteInput,
  FormatSwiftBrowserInput,
  FormatSwiftBrowserLocalInput,
  FormatSwiftBrowserOutput,
  FormatSwiftBrowserRemoteInput,
  SanitizeHtmlBrowserInput,
  SanitizeHtmlBrowserLocalInput,
  SanitizeHtmlBrowserOutput,
  SanitizeHtmlBrowserRemoteInput,
} from '~/code/type/browser/index'
import {
  ArchiveFormatParser,
  AssemblySyntaxParser,
  BackendCompilationOutputParser,
  CInputFormatParser,
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
  ClangFormatParser,
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
  CppInputFormatParser,
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegFormatParser,
  FfmpegStrictOptionParser,
  FileContentParser,
  FileContentWithSha256Parser,
  FontFormatParser,
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
  ImageMagickInputFormatParser,
  ImageMagickOutputFormatParser,
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
  PandocInputFormatParser,
  PandocOutputFormatParser,
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerMarkdownInputFormatParser,
  PuppeteerOutputFormatParser,
  PuppeteerTxtInputFormatParser,
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
  SwiftInputFormatParser,
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/type/shared/parser/index'
import { ClangStyleAllParser } from '~/code/type/shared/parser/clang-format'

let CompileCBrowserInputModel: z.ZodType<CompileCBrowserInput>

export const CompileCBrowserInputParser =
  (): z.ZodType<CompileCBrowserInput> => {
    if (!CompileCBrowserInputModel) {
      CompileCBrowserInputModel = z.union([
        z.lazy(() => CompileCBrowserRemoteInputParser()),
        z.lazy(() => CompileCBrowserLocalInputParser()),
      ])
    }
    return CompileCBrowserInputModel!
  }

let CompileCBrowserLocalInputModel: z.ZodType<CompileCBrowserLocalInput>

export const CompileCBrowserLocalInputParser =
  (): z.ZodType<CompileCBrowserLocalInput> => {
    if (!CompileCBrowserLocalInputModel) {
      CompileCBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCBrowserLocalInput>
    }
    return CompileCBrowserLocalInputModel!
  }

let CompileCBrowserOutputModel: z.ZodType<CompileCBrowserOutput>

export const CompileCBrowserOutputParser =
  (): z.ZodType<CompileCBrowserOutput> => {
    if (!CompileCBrowserOutputModel) {
      CompileCBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileCBrowserOutput>
    }
    return CompileCBrowserOutputModel!
  }

let CompileCBrowserRemoteInputModel: z.ZodType<CompileCBrowserRemoteInput>

export const CompileCBrowserRemoteInputParser =
  (): z.ZodType<CompileCBrowserRemoteInput> => {
    if (!CompileCBrowserRemoteInputModel) {
      CompileCBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCBrowserRemoteInput>
    }
    return CompileCBrowserRemoteInputModel!
  }

let CompileCppBrowserInputModel: z.ZodType<CompileCppBrowserInput>

export const CompileCppBrowserInputParser =
  (): z.ZodType<CompileCppBrowserInput> => {
    if (!CompileCppBrowserInputModel) {
      CompileCppBrowserInputModel = z.union([
        z.lazy(() => CompileCppBrowserRemoteInputParser()),
        z.lazy(() => CompileCppBrowserLocalInputParser()),
      ])
    }
    return CompileCppBrowserInputModel!
  }

let CompileCppBrowserLocalInputModel: z.ZodType<CompileCppBrowserLocalInput>

export const CompileCppBrowserLocalInputParser =
  (): z.ZodType<CompileCppBrowserLocalInput> => {
    if (!CompileCppBrowserLocalInputModel) {
      CompileCppBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppBrowserLocalInput>
    }
    return CompileCppBrowserLocalInputModel!
  }

let CompileCppBrowserOutputModel: z.ZodType<CompileCppBrowserOutput>

export const CompileCppBrowserOutputParser =
  (): z.ZodType<CompileCppBrowserOutput> => {
    if (!CompileCppBrowserOutputModel) {
      CompileCppBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileCppBrowserOutput>
    }
    return CompileCppBrowserOutputModel!
  }

let CompileCppBrowserRemoteInputModel: z.ZodType<CompileCppBrowserRemoteInput>

export const CompileCppBrowserRemoteInputParser =
  (): z.ZodType<CompileCppBrowserRemoteInput> => {
    if (!CompileCppBrowserRemoteInputModel) {
      CompileCppBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppBrowserRemoteInput>
    }
    return CompileCppBrowserRemoteInputModel!
  }

let CompileRustBrowserInputModel: z.ZodType<CompileRustBrowserInput>

export const CompileRustBrowserInputParser =
  (): z.ZodType<CompileRustBrowserInput> => {
    if (!CompileRustBrowserInputModel) {
      CompileRustBrowserInputModel = z.union([
        z.lazy(() => CompileRustBrowserRemoteInputParser()),
        z.lazy(() => CompileRustBrowserLocalInputParser()),
      ])
    }
    return CompileRustBrowserInputModel!
  }

let CompileRustBrowserLocalInputModel: z.ZodType<CompileRustBrowserLocalInput>

export const CompileRustBrowserLocalInputParser =
  (): z.ZodType<CompileRustBrowserLocalInput> => {
    if (!CompileRustBrowserLocalInputModel) {
      CompileRustBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustBrowserLocalInput>
    }
    return CompileRustBrowserLocalInputModel!
  }

let CompileRustBrowserOutputModel: z.ZodType<CompileRustBrowserOutput>

export const CompileRustBrowserOutputParser =
  (): z.ZodType<CompileRustBrowserOutput> => {
    if (!CompileRustBrowserOutputModel) {
      CompileRustBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileRustBrowserOutput>
    }
    return CompileRustBrowserOutputModel!
  }

let CompileRustBrowserRemoteInputModel: z.ZodType<CompileRustBrowserRemoteInput>

export const CompileRustBrowserRemoteInputParser =
  (): z.ZodType<CompileRustBrowserRemoteInput> => {
    if (!CompileRustBrowserRemoteInputModel) {
      CompileRustBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustBrowserRemoteInput>
    }
    return CompileRustBrowserRemoteInputModel!
  }

let CompileSwiftBrowserInputModel: z.ZodType<CompileSwiftBrowserInput>

export const CompileSwiftBrowserInputParser =
  (): z.ZodType<CompileSwiftBrowserInput> => {
    if (!CompileSwiftBrowserInputModel) {
      CompileSwiftBrowserInputModel = z.union([
        z.lazy(() => CompileSwiftBrowserRemoteInputParser()),
        z.lazy(() => CompileSwiftBrowserLocalInputParser()),
      ])
    }
    return CompileSwiftBrowserInputModel!
  }

let CompileSwiftBrowserLocalInputModel: z.ZodType<CompileSwiftBrowserLocalInput>

export const CompileSwiftBrowserLocalInputParser =
  (): z.ZodType<CompileSwiftBrowserLocalInput> => {
    if (!CompileSwiftBrowserLocalInputModel) {
      CompileSwiftBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftBrowserLocalInput>
    }
    return CompileSwiftBrowserLocalInputModel!
  }

let CompileSwiftBrowserOutputModel: z.ZodType<CompileSwiftBrowserOutput>

export const CompileSwiftBrowserOutputParser =
  (): z.ZodType<CompileSwiftBrowserOutput> => {
    if (!CompileSwiftBrowserOutputModel) {
      CompileSwiftBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileSwiftBrowserOutput>
    }
    return CompileSwiftBrowserOutputModel!
  }

let CompileSwiftBrowserRemoteInputModel: z.ZodType<CompileSwiftBrowserRemoteInput>

export const CompileSwiftBrowserRemoteInputParser =
  (): z.ZodType<CompileSwiftBrowserRemoteInput> => {
    if (!CompileSwiftBrowserRemoteInputModel) {
      CompileSwiftBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftBrowserRemoteInput>
    }
    return CompileSwiftBrowserRemoteInputModel!
  }

let CompileWastBrowserInputModel: z.ZodType<CompileWastBrowserInput>

export const CompileWastBrowserInputParser =
  (): z.ZodType<CompileWastBrowserInput> => {
    if (!CompileWastBrowserInputModel) {
      CompileWastBrowserInputModel = z.union([
        z.lazy(() => CompileWastBrowserRemoteInputParser()),
        z.lazy(() => CompileWastBrowserLocalInputParser()),
      ])
    }
    return CompileWastBrowserInputModel!
  }

let CompileWastBrowserLocalInputModel: z.ZodType<CompileWastBrowserLocalInput>

export const CompileWastBrowserLocalInputParser =
  (): z.ZodType<CompileWastBrowserLocalInput> => {
    if (!CompileWastBrowserLocalInputModel) {
      CompileWastBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastBrowserLocalInput>
    }
    return CompileWastBrowserLocalInputModel!
  }

let CompileWastBrowserOutputModel: z.ZodType<CompileWastBrowserOutput>

export const CompileWastBrowserOutputParser =
  (): z.ZodType<CompileWastBrowserOutput> => {
    if (!CompileWastBrowserOutputModel) {
      CompileWastBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileWastBrowserOutput>
    }
    return CompileWastBrowserOutputModel!
  }

let CompileWastBrowserRemoteInputModel: z.ZodType<CompileWastBrowserRemoteInput>

export const CompileWastBrowserRemoteInputParser =
  (): z.ZodType<CompileWastBrowserRemoteInput> => {
    if (!CompileWastBrowserRemoteInputModel) {
      CompileWastBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastBrowserRemoteInput>
    }
    return CompileWastBrowserRemoteInputModel!
  }

let ConvertArchiveBrowserInputModel: z.ZodType<ConvertArchiveBrowserInput>

export const ConvertArchiveBrowserInputParser =
  (): z.ZodType<ConvertArchiveBrowserInput> => {
    if (!ConvertArchiveBrowserInputModel) {
      ConvertArchiveBrowserInputModel = z.union([
        z.lazy(() => ConvertArchiveBrowserRemoteInputParser()),
        z.lazy(() => ConvertArchiveBrowserLocalInputParser()),
      ])
    }
    return ConvertArchiveBrowserInputModel!
  }

let ConvertArchiveBrowserLocalInputModel: z.ZodType<ConvertArchiveBrowserLocalInput>

export const ConvertArchiveBrowserLocalInputParser =
  (): z.ZodType<ConvertArchiveBrowserLocalInput> => {
    if (!ConvertArchiveBrowserLocalInputModel) {
      ConvertArchiveBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveBrowserLocalInput>
    }
    return ConvertArchiveBrowserLocalInputModel!
  }

let ConvertArchiveBrowserOutputModel: z.ZodType<ConvertArchiveBrowserOutput>

export const ConvertArchiveBrowserOutputParser =
  (): z.ZodType<ConvertArchiveBrowserOutput> => {
    if (!ConvertArchiveBrowserOutputModel) {
      ConvertArchiveBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertArchiveBrowserOutput>
    }
    return ConvertArchiveBrowserOutputModel!
  }

let ConvertArchiveBrowserRemoteInputModel: z.ZodType<ConvertArchiveBrowserRemoteInput>

export const ConvertArchiveBrowserRemoteInputParser =
  (): z.ZodType<ConvertArchiveBrowserRemoteInput> => {
    if (!ConvertArchiveBrowserRemoteInputModel) {
      ConvertArchiveBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveBrowserRemoteInput>
    }
    return ConvertArchiveBrowserRemoteInputModel!
  }

let ConvertDocumentWithCalibreBrowserInputModel: z.ZodType<ConvertDocumentWithCalibreBrowserInput>

export const ConvertDocumentWithCalibreBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserInput> => {
    if (!ConvertDocumentWithCalibreBrowserInputModel) {
      ConvertDocumentWithCalibreBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithCalibreBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithCalibreBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithCalibreBrowserInputModel!
  }

let ConvertDocumentWithCalibreBrowserLocalInputModel: z.ZodType<ConvertDocumentWithCalibreBrowserLocalInput>

export const ConvertDocumentWithCalibreBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserLocalInput> => {
    if (!ConvertDocumentWithCalibreBrowserLocalInputModel) {
      ConvertDocumentWithCalibreBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreBrowserLocalInput>
    }
    return ConvertDocumentWithCalibreBrowserLocalInputModel!
  }

let ConvertDocumentWithCalibreBrowserOutputModel: z.ZodType<ConvertDocumentWithCalibreBrowserOutput>

export const ConvertDocumentWithCalibreBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserOutput> => {
    if (!ConvertDocumentWithCalibreBrowserOutputModel) {
      ConvertDocumentWithCalibreBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithCalibreBrowserOutput>
    }
    return ConvertDocumentWithCalibreBrowserOutputModel!
  }

let ConvertDocumentWithCalibreBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithCalibreBrowserRemoteInput>

export const ConvertDocumentWithCalibreBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserRemoteInput> => {
    if (!ConvertDocumentWithCalibreBrowserRemoteInputModel) {
      ConvertDocumentWithCalibreBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreBrowserRemoteInput>
    }
    return ConvertDocumentWithCalibreBrowserRemoteInputModel!
  }

let ConvertDocumentWithEnscriptBrowserInputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserInput>

export const ConvertDocumentWithEnscriptBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserInput> => {
    if (!ConvertDocumentWithEnscriptBrowserInputModel) {
      ConvertDocumentWithEnscriptBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithEnscriptBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithEnscriptBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithEnscriptBrowserInputModel!
  }

let ConvertDocumentWithEnscriptBrowserLocalInputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserLocalInput>

export const ConvertDocumentWithEnscriptBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserLocalInput> => {
    if (!ConvertDocumentWithEnscriptBrowserLocalInputModel) {
      ConvertDocumentWithEnscriptBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptBrowserLocalInput>
    }
    return ConvertDocumentWithEnscriptBrowserLocalInputModel!
  }

let ConvertDocumentWithEnscriptBrowserOutputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserOutput>

export const ConvertDocumentWithEnscriptBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserOutput> => {
    if (!ConvertDocumentWithEnscriptBrowserOutputModel) {
      ConvertDocumentWithEnscriptBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithEnscriptBrowserOutput>
    }
    return ConvertDocumentWithEnscriptBrowserOutputModel!
  }

let ConvertDocumentWithEnscriptBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserRemoteInput>

export const ConvertDocumentWithEnscriptBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserRemoteInput> => {
    if (!ConvertDocumentWithEnscriptBrowserRemoteInputModel) {
      ConvertDocumentWithEnscriptBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptBrowserRemoteInput>
    }
    return ConvertDocumentWithEnscriptBrowserRemoteInputModel!
  }

let ConvertDocumentWithJupyterBrowserInputModel: z.ZodType<ConvertDocumentWithJupyterBrowserInput>

export const ConvertDocumentWithJupyterBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserInput> => {
    if (!ConvertDocumentWithJupyterBrowserInputModel) {
      ConvertDocumentWithJupyterBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithJupyterBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithJupyterBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithJupyterBrowserInputModel!
  }

let ConvertDocumentWithJupyterBrowserLocalInputModel: z.ZodType<ConvertDocumentWithJupyterBrowserLocalInput>

export const ConvertDocumentWithJupyterBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserLocalInput> => {
    if (!ConvertDocumentWithJupyterBrowserLocalInputModel) {
      ConvertDocumentWithJupyterBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.string(),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterBrowserLocalInput>
    }
    return ConvertDocumentWithJupyterBrowserLocalInputModel!
  }

let ConvertDocumentWithJupyterBrowserOutputModel: z.ZodType<ConvertDocumentWithJupyterBrowserOutput>

export const ConvertDocumentWithJupyterBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserOutput> => {
    if (!ConvertDocumentWithJupyterBrowserOutputModel) {
      ConvertDocumentWithJupyterBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithJupyterBrowserOutput>
    }
    return ConvertDocumentWithJupyterBrowserOutputModel!
  }

let ConvertDocumentWithJupyterBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithJupyterBrowserRemoteInput>

export const ConvertDocumentWithJupyterBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserRemoteInput> => {
    if (!ConvertDocumentWithJupyterBrowserRemoteInputModel) {
      ConvertDocumentWithJupyterBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterBrowserRemoteInput>
    }
    return ConvertDocumentWithJupyterBrowserRemoteInputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserInputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserInput>

export const ConvertDocumentWithLibreOfficeBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserInput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserInputModel) {
      ConvertDocumentWithLibreOfficeBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithLibreOfficeBrowserInputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserLocalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserLocalInput>

export const ConvertDocumentWithLibreOfficeBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserLocalInput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserLocalInputModel) {
      ConvertDocumentWithLibreOfficeBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeBrowserLocalInput>
    }
    return ConvertDocumentWithLibreOfficeBrowserLocalInputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserOutputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserOutput>

export const ConvertDocumentWithLibreOfficeBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserOutput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserOutputModel) {
      ConvertDocumentWithLibreOfficeBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeBrowserOutput>
    }
    return ConvertDocumentWithLibreOfficeBrowserOutputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserRemoteInput>

export const ConvertDocumentWithLibreOfficeBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserRemoteInput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserRemoteInputModel) {
      ConvertDocumentWithLibreOfficeBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeBrowserRemoteInput>
    }
    return ConvertDocumentWithLibreOfficeBrowserRemoteInputModel!
  }

let ConvertDocumentWithPandocBrowserInputModel: z.ZodType<ConvertDocumentWithPandocBrowserInput>

export const ConvertDocumentWithPandocBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserInput> => {
    if (!ConvertDocumentWithPandocBrowserInputModel) {
      ConvertDocumentWithPandocBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithPandocBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithPandocBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithPandocBrowserInputModel!
  }

let ConvertDocumentWithPandocBrowserLocalInputModel: z.ZodType<ConvertDocumentWithPandocBrowserLocalInput>

export const ConvertDocumentWithPandocBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserLocalInput> => {
    if (!ConvertDocumentWithPandocBrowserLocalInputModel) {
      ConvertDocumentWithPandocBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocBrowserLocalInput>
    }
    return ConvertDocumentWithPandocBrowserLocalInputModel!
  }

let ConvertDocumentWithPandocBrowserOutputModel: z.ZodType<ConvertDocumentWithPandocBrowserOutput>

export const ConvertDocumentWithPandocBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserOutput> => {
    if (!ConvertDocumentWithPandocBrowserOutputModel) {
      ConvertDocumentWithPandocBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithPandocBrowserOutput>
    }
    return ConvertDocumentWithPandocBrowserOutputModel!
  }

let ConvertDocumentWithPandocBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithPandocBrowserRemoteInput>

export const ConvertDocumentWithPandocBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserRemoteInput> => {
    if (!ConvertDocumentWithPandocBrowserRemoteInputModel) {
      ConvertDocumentWithPandocBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocBrowserRemoteInput>
    }
    return ConvertDocumentWithPandocBrowserRemoteInputModel!
  }

let ConvertFontWithFontForgeBrowserInputModel: z.ZodType<ConvertFontWithFontForgeBrowserInput>

export const ConvertFontWithFontForgeBrowserInputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserInput> => {
    if (!ConvertFontWithFontForgeBrowserInputModel) {
      ConvertFontWithFontForgeBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertFontWithFontForgeBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertFontWithFontForgeBrowserLocalInputParser()),
      ])
    }
    return ConvertFontWithFontForgeBrowserInputModel!
  }

let ConvertFontWithFontForgeBrowserLocalInputModel: z.ZodType<ConvertFontWithFontForgeBrowserLocalInput>

export const ConvertFontWithFontForgeBrowserLocalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserLocalInput> => {
    if (!ConvertFontWithFontForgeBrowserLocalInputModel) {
      ConvertFontWithFontForgeBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeBrowserLocalInput>
    }
    return ConvertFontWithFontForgeBrowserLocalInputModel!
  }

let ConvertFontWithFontForgeBrowserOutputModel: z.ZodType<ConvertFontWithFontForgeBrowserOutput>

export const ConvertFontWithFontForgeBrowserOutputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserOutput> => {
    if (!ConvertFontWithFontForgeBrowserOutputModel) {
      ConvertFontWithFontForgeBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertFontWithFontForgeBrowserOutput>
    }
    return ConvertFontWithFontForgeBrowserOutputModel!
  }

let ConvertFontWithFontForgeBrowserRemoteInputModel: z.ZodType<ConvertFontWithFontForgeBrowserRemoteInput>

export const ConvertFontWithFontForgeBrowserRemoteInputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserRemoteInput> => {
    if (!ConvertFontWithFontForgeBrowserRemoteInputModel) {
      ConvertFontWithFontForgeBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeBrowserRemoteInput>
    }
    return ConvertFontWithFontForgeBrowserRemoteInputModel!
  }

let ConvertHtmlWithPuppeteerBrowserInputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserInput>

export const ConvertHtmlWithPuppeteerBrowserInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserInput> => {
    if (!ConvertHtmlWithPuppeteerBrowserInputModel) {
      ConvertHtmlWithPuppeteerBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertHtmlWithPuppeteerBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertHtmlWithPuppeteerBrowserLocalInputParser()),
      ])
    }
    return ConvertHtmlWithPuppeteerBrowserInputModel!
  }

let ConvertHtmlWithPuppeteerBrowserLocalInputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserLocalInput>

export const ConvertHtmlWithPuppeteerBrowserLocalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserLocalInput> => {
    if (!ConvertHtmlWithPuppeteerBrowserLocalInputModel) {
      ConvertHtmlWithPuppeteerBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerBrowserLocalInput>
    }
    return ConvertHtmlWithPuppeteerBrowserLocalInputModel!
  }

let ConvertHtmlWithPuppeteerBrowserOutputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserOutput>

export const ConvertHtmlWithPuppeteerBrowserOutputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserOutput> => {
    if (!ConvertHtmlWithPuppeteerBrowserOutputModel) {
      ConvertHtmlWithPuppeteerBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertHtmlWithPuppeteerBrowserOutput>
    }
    return ConvertHtmlWithPuppeteerBrowserOutputModel!
  }

let ConvertHtmlWithPuppeteerBrowserRemoteInputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserRemoteInput>

export const ConvertHtmlWithPuppeteerBrowserRemoteInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserRemoteInput> => {
    if (!ConvertHtmlWithPuppeteerBrowserRemoteInputModel) {
      ConvertHtmlWithPuppeteerBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerBrowserRemoteInput>
    }
    return ConvertHtmlWithPuppeteerBrowserRemoteInputModel!
  }

let ConvertImageWithImageMagickBrowserInputModel: z.ZodType<ConvertImageWithImageMagickBrowserInput>

export const ConvertImageWithImageMagickBrowserInputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserInput> => {
    if (!ConvertImageWithImageMagickBrowserInputModel) {
      ConvertImageWithImageMagickBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertImageWithImageMagickBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithImageMagickBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertImageWithImageMagickBrowserInputModel!
  }

let ConvertImageWithImageMagickBrowserLocalInputModel: z.ZodType<ConvertImageWithImageMagickBrowserLocalInput>

export const ConvertImageWithImageMagickBrowserLocalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserLocalInput> => {
    if (!ConvertImageWithImageMagickBrowserLocalInputModel) {
      ConvertImageWithImageMagickBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
        }),
        colorCount: z.optional(z.number().int().gte(0)),
        colorMatrix: z.optional(
          z
            .lazy(() => ImageMagicColorMatrixParser())
            .refine(
              TEST(
                'colorMatrix',
                code.test_image_magic_color_matrix.test,
              ),
            ),
        ),
        colorSpace: z.optional(
          z.lazy(() => ImageMagickColorSpaceParser()),
        ),
        compare: z.optional(z.boolean()),
        compression: z.optional(
          z.lazy(() => ImageMagickCompressionParser()),
        ),
        density: z.optional(z.number().int().gte(0)),
        quality: z.optional(z.number().int().gte(0)),
      }) as z.ZodType<ConvertImageWithImageMagickBrowserLocalInput>
    }
    return ConvertImageWithImageMagickBrowserLocalInputModel!
  }

let ConvertImageWithImageMagickBrowserOutputModel: z.ZodType<ConvertImageWithImageMagickBrowserOutput>

export const ConvertImageWithImageMagickBrowserOutputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserOutput> => {
    if (!ConvertImageWithImageMagickBrowserOutputModel) {
      ConvertImageWithImageMagickBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertImageWithImageMagickBrowserOutput>
    }
    return ConvertImageWithImageMagickBrowserOutputModel!
  }

let ConvertImageWithImageMagickBrowserRemoteInputModel: z.ZodType<ConvertImageWithImageMagickBrowserRemoteInput>

export const ConvertImageWithImageMagickBrowserRemoteInputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserRemoteInput> => {
    if (!ConvertImageWithImageMagickBrowserRemoteInputModel) {
      ConvertImageWithImageMagickBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
        }),
        colorCount: z.optional(z.number().int().gte(0)),
        colorMatrix: z.optional(
          z
            .lazy(() => ImageMagicColorMatrixParser())
            .refine(
              TEST(
                'colorMatrix',
                code.test_image_magic_color_matrix.test,
              ),
            ),
        ),
        colorSpace: z.optional(
          z.lazy(() => ImageMagickColorSpaceParser()),
        ),
        compare: z.optional(z.boolean()),
        compression: z.optional(
          z.lazy(() => ImageMagickCompressionParser()),
        ),
        density: z.optional(z.number().int().gte(0)),
        quality: z.optional(z.number().int().gte(0)),
      }) as z.ZodType<ConvertImageWithImageMagickBrowserRemoteInput>
    }
    return ConvertImageWithImageMagickBrowserRemoteInputModel!
  }

let ConvertImageWithInkscapeBrowserInputModel: z.ZodType<ConvertImageWithInkscapeBrowserInput>

export const ConvertImageWithInkscapeBrowserInputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserInput> => {
    if (!ConvertImageWithInkscapeBrowserInputModel) {
      ConvertImageWithInkscapeBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertImageWithInkscapeBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertImageWithInkscapeBrowserLocalInputParser()),
      ])
    }
    return ConvertImageWithInkscapeBrowserInputModel!
  }

let ConvertImageWithInkscapeBrowserLocalInputModel: z.ZodType<ConvertImageWithInkscapeBrowserLocalInput>

export const ConvertImageWithInkscapeBrowserLocalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserLocalInput> => {
    if (!ConvertImageWithInkscapeBrowserLocalInputModel) {
      ConvertImageWithInkscapeBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.string(),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeBrowserLocalInput>
    }
    return ConvertImageWithInkscapeBrowserLocalInputModel!
  }

let ConvertImageWithInkscapeBrowserOutputModel: z.ZodType<ConvertImageWithInkscapeBrowserOutput>

export const ConvertImageWithInkscapeBrowserOutputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserOutput> => {
    if (!ConvertImageWithInkscapeBrowserOutputModel) {
      ConvertImageWithInkscapeBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertImageWithInkscapeBrowserOutput>
    }
    return ConvertImageWithInkscapeBrowserOutputModel!
  }

let ConvertImageWithInkscapeBrowserRemoteInputModel: z.ZodType<ConvertImageWithInkscapeBrowserRemoteInput>

export const ConvertImageWithInkscapeBrowserRemoteInputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserRemoteInput> => {
    if (!ConvertImageWithInkscapeBrowserRemoteInputModel) {
      ConvertImageWithInkscapeBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeBrowserRemoteInput>
    }
    return ConvertImageWithInkscapeBrowserRemoteInputModel!
  }

let ConvertLatexToPngBrowserInputModel: z.ZodType<ConvertLatexToPngBrowserInput>

export const ConvertLatexToPngBrowserInputParser =
  (): z.ZodType<ConvertLatexToPngBrowserInput> => {
    if (!ConvertLatexToPngBrowserInputModel) {
      ConvertLatexToPngBrowserInputModel = z.union([
        z.lazy(() => ConvertLatexToPngBrowserRemoteInputParser()),
        z.lazy(() => ConvertLatexToPngBrowserLocalInputParser()),
      ])
    }
    return ConvertLatexToPngBrowserInputModel!
  }

let ConvertLatexToPngBrowserLocalInputModel: z.ZodType<ConvertLatexToPngBrowserLocalInput>

export const ConvertLatexToPngBrowserLocalInputParser =
  (): z.ZodType<ConvertLatexToPngBrowserLocalInput> => {
    if (!ConvertLatexToPngBrowserLocalInputModel) {
      ConvertLatexToPngBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngBrowserLocalInput>
    }
    return ConvertLatexToPngBrowserLocalInputModel!
  }

let ConvertLatexToPngBrowserOutputModel: z.ZodType<ConvertLatexToPngBrowserOutput>

export const ConvertLatexToPngBrowserOutputParser =
  (): z.ZodType<ConvertLatexToPngBrowserOutput> => {
    if (!ConvertLatexToPngBrowserOutputModel) {
      ConvertLatexToPngBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertLatexToPngBrowserOutput>
    }
    return ConvertLatexToPngBrowserOutputModel!
  }

let ConvertLatexToPngBrowserRemoteInputModel: z.ZodType<ConvertLatexToPngBrowserRemoteInput>

export const ConvertLatexToPngBrowserRemoteInputParser =
  (): z.ZodType<ConvertLatexToPngBrowserRemoteInput> => {
    if (!ConvertLatexToPngBrowserRemoteInputModel) {
      ConvertLatexToPngBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngBrowserRemoteInput>
    }
    return ConvertLatexToPngBrowserRemoteInputModel!
  }

let ConvertLatexWithPdfLatexBrowserInputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserInput>

export const ConvertLatexWithPdfLatexBrowserInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserInput> => {
    if (!ConvertLatexWithPdfLatexBrowserInputModel) {
      ConvertLatexWithPdfLatexBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertLatexWithPdfLatexBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertLatexWithPdfLatexBrowserLocalInputParser()),
      ])
    }
    return ConvertLatexWithPdfLatexBrowserInputModel!
  }

let ConvertLatexWithPdfLatexBrowserLocalInputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserLocalInput>

export const ConvertLatexWithPdfLatexBrowserLocalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserLocalInput> => {
    if (!ConvertLatexWithPdfLatexBrowserLocalInputModel) {
      ConvertLatexWithPdfLatexBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexBrowserLocalInput>
    }
    return ConvertLatexWithPdfLatexBrowserLocalInputModel!
  }

let ConvertLatexWithPdfLatexBrowserOutputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserOutput>

export const ConvertLatexWithPdfLatexBrowserOutputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserOutput> => {
    if (!ConvertLatexWithPdfLatexBrowserOutputModel) {
      ConvertLatexWithPdfLatexBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertLatexWithPdfLatexBrowserOutput>
    }
    return ConvertLatexWithPdfLatexBrowserOutputModel!
  }

let ConvertLatexWithPdfLatexBrowserRemoteInputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserRemoteInput>

export const ConvertLatexWithPdfLatexBrowserRemoteInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserRemoteInput> => {
    if (!ConvertLatexWithPdfLatexBrowserRemoteInputModel) {
      ConvertLatexWithPdfLatexBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexBrowserRemoteInput>
    }
    return ConvertLatexWithPdfLatexBrowserRemoteInputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserInputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserInput>

export const ConvertMarkdownWithPuppeteerBrowserInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserInput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserInputModel) {
      ConvertMarkdownWithPuppeteerBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertMarkdownWithPuppeteerBrowserInputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserLocalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserLocalInput>

export const ConvertMarkdownWithPuppeteerBrowserLocalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserLocalInput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserLocalInputModel) {
      ConvertMarkdownWithPuppeteerBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerBrowserLocalInput>
    }
    return ConvertMarkdownWithPuppeteerBrowserLocalInputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserOutputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserOutput>

export const ConvertMarkdownWithPuppeteerBrowserOutputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserOutput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserOutputModel) {
      ConvertMarkdownWithPuppeteerBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerBrowserOutput>
    }
    return ConvertMarkdownWithPuppeteerBrowserOutputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserRemoteInputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserRemoteInput>

export const ConvertMarkdownWithPuppeteerBrowserRemoteInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserRemoteInput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserRemoteInputModel) {
      ConvertMarkdownWithPuppeteerBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerBrowserRemoteInput>
    }
    return ConvertMarkdownWithPuppeteerBrowserRemoteInputModel!
  }

let ConvertTxtWithPuppeteerBrowserInputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserInput>

export const ConvertTxtWithPuppeteerBrowserInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserInput> => {
    if (!ConvertTxtWithPuppeteerBrowserInputModel) {
      ConvertTxtWithPuppeteerBrowserInputModel = z.union([
        z.lazy(() => ConvertTxtWithPuppeteerBrowserRemoteInputParser()),
        z.lazy(() => ConvertTxtWithPuppeteerBrowserLocalInputParser()),
      ])
    }
    return ConvertTxtWithPuppeteerBrowserInputModel!
  }

let ConvertTxtWithPuppeteerBrowserLocalInputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserLocalInput>

export const ConvertTxtWithPuppeteerBrowserLocalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserLocalInput> => {
    if (!ConvertTxtWithPuppeteerBrowserLocalInputModel) {
      ConvertTxtWithPuppeteerBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertTxtWithPuppeteerBrowserLocalInput>
    }
    return ConvertTxtWithPuppeteerBrowserLocalInputModel!
  }

let ConvertTxtWithPuppeteerBrowserOutputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserOutput>

export const ConvertTxtWithPuppeteerBrowserOutputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserOutput> => {
    if (!ConvertTxtWithPuppeteerBrowserOutputModel) {
      ConvertTxtWithPuppeteerBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertTxtWithPuppeteerBrowserOutput>
    }
    return ConvertTxtWithPuppeteerBrowserOutputModel!
  }

let ConvertTxtWithPuppeteerBrowserRemoteInputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserRemoteInput>

export const ConvertTxtWithPuppeteerBrowserRemoteInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserRemoteInput> => {
    if (!ConvertTxtWithPuppeteerBrowserRemoteInputModel) {
      ConvertTxtWithPuppeteerBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertTxtWithPuppeteerBrowserRemoteInput>
    }
    return ConvertTxtWithPuppeteerBrowserRemoteInputModel!
  }

let ConvertVideoWithFfmpegBrowserInputModel: z.ZodType<ConvertVideoWithFfmpegBrowserInput>

export const ConvertVideoWithFfmpegBrowserInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserInput> => {
    if (!ConvertVideoWithFfmpegBrowserInputModel) {
      ConvertVideoWithFfmpegBrowserInputModel = z.union([
        z.lazy(() => ConvertVideoWithFfmpegBrowserRemoteInputParser()),
        z.lazy(() => ConvertVideoWithFfmpegBrowserLocalInputParser()),
      ])
    }
    return ConvertVideoWithFfmpegBrowserInputModel!
  }

let ConvertVideoWithFfmpegBrowserLocalInputModel: z.ZodType<ConvertVideoWithFfmpegBrowserLocalInput>

export const ConvertVideoWithFfmpegBrowserLocalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserLocalInput> => {
    if (!ConvertVideoWithFfmpegBrowserLocalInputModel) {
      ConvertVideoWithFfmpegBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
        }),
        audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser())),
        videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser())),
        audioBitRate: z.optional(z.number().int()),
        videoBitRate: z.optional(z.number().int()),
        frameRate: z.optional(z.number().int()),
        startTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('startTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('startTime', code.test_time_string.test)),
          ]),
        ),
        endTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('endTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('endTime', code.test_time_string.test)),
          ]),
        ),
        strict: z
          .optional(z.lazy(() => FfmpegStrictOptionParser()))
          .default('strict'),
        overwrite: z.optional(z.boolean()).default(false),
        progress: z.optional(z.boolean()).default(false),
        scaleWidth: z.optional(z.number().int()),
        scaleHeight: z.optional(z.number().int()),
        audioChannels: z.optional(z.number().int()),
        audioSamplingFrequency: z.optional(z.number().int()),
        subtitleCodec: z.optional(
          z.lazy(() => FfmpegCodecSubtitleParser()),
        ),
        duration: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('duration', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('duration', code.test_time_string.test)),
          ]),
        ),
        rotation: z.optional(z.number()),
      }) as z.ZodType<ConvertVideoWithFfmpegBrowserLocalInput>
    }
    return ConvertVideoWithFfmpegBrowserLocalInputModel!
  }

let ConvertVideoWithFfmpegBrowserOutputModel: z.ZodType<ConvertVideoWithFfmpegBrowserOutput>

export const ConvertVideoWithFfmpegBrowserOutputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserOutput> => {
    if (!ConvertVideoWithFfmpegBrowserOutputModel) {
      ConvertVideoWithFfmpegBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertVideoWithFfmpegBrowserOutput>
    }
    return ConvertVideoWithFfmpegBrowserOutputModel!
  }

let ConvertVideoWithFfmpegBrowserRemoteInputModel: z.ZodType<ConvertVideoWithFfmpegBrowserRemoteInput>

export const ConvertVideoWithFfmpegBrowserRemoteInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserRemoteInput> => {
    if (!ConvertVideoWithFfmpegBrowserRemoteInputModel) {
      ConvertVideoWithFfmpegBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
        }),
        audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser())),
        videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser())),
        audioBitRate: z.optional(z.number().int()),
        videoBitRate: z.optional(z.number().int()),
        frameRate: z.optional(z.number().int()),
        startTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('startTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('startTime', code.test_time_string.test)),
          ]),
        ),
        endTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('endTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('endTime', code.test_time_string.test)),
          ]),
        ),
        strict: z
          .optional(z.lazy(() => FfmpegStrictOptionParser()))
          .default('strict'),
        overwrite: z.optional(z.boolean()).default(false),
        progress: z.optional(z.boolean()).default(false),
        scaleWidth: z.optional(z.number().int()),
        scaleHeight: z.optional(z.number().int()),
        audioChannels: z.optional(z.number().int()),
        audioSamplingFrequency: z.optional(z.number().int()),
        subtitleCodec: z.optional(
          z.lazy(() => FfmpegCodecSubtitleParser()),
        ),
        duration: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('duration', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('duration', code.test_time_string.test)),
          ]),
        ),
        rotation: z.optional(z.number()),
      }) as z.ZodType<ConvertVideoWithFfmpegBrowserRemoteInput>
    }
    return ConvertVideoWithFfmpegBrowserRemoteInputModel!
  }

let FormatAssemblyBrowserInputModel: z.ZodType<FormatAssemblyBrowserInput>

export const FormatAssemblyBrowserInputParser =
  (): z.ZodType<FormatAssemblyBrowserInput> => {
    if (!FormatAssemblyBrowserInputModel) {
      FormatAssemblyBrowserInputModel = z.union([
        z.lazy(() => FormatAssemblyBrowserRemoteInputParser()),
        z.lazy(() => FormatAssemblyBrowserLocalInputParser()),
      ])
    }
    return FormatAssemblyBrowserInputModel!
  }

let FormatAssemblyBrowserLocalInputModel: z.ZodType<FormatAssemblyBrowserLocalInput>

export const FormatAssemblyBrowserLocalInputParser =
  (): z.ZodType<FormatAssemblyBrowserLocalInput> => {
    if (!FormatAssemblyBrowserLocalInputModel) {
      FormatAssemblyBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatAssemblyBrowserLocalInput>
    }
    return FormatAssemblyBrowserLocalInputModel!
  }

let FormatAssemblyBrowserOutputModel: z.ZodType<FormatAssemblyBrowserOutput>

export const FormatAssemblyBrowserOutputParser =
  (): z.ZodType<FormatAssemblyBrowserOutput> => {
    if (!FormatAssemblyBrowserOutputModel) {
      FormatAssemblyBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatAssemblyBrowserOutput>
    }
    return FormatAssemblyBrowserOutputModel!
  }

let FormatAssemblyBrowserRemoteInputModel: z.ZodType<FormatAssemblyBrowserRemoteInput>

export const FormatAssemblyBrowserRemoteInputParser =
  (): z.ZodType<FormatAssemblyBrowserRemoteInput> => {
    if (!FormatAssemblyBrowserRemoteInputModel) {
      FormatAssemblyBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatAssemblyBrowserRemoteInput>
    }
    return FormatAssemblyBrowserRemoteInputModel!
  }

let FormatCodeWithClangFormatBrowserInputModel: z.ZodType<FormatCodeWithClangFormatBrowserInput>

export const FormatCodeWithClangFormatBrowserInputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserInput> => {
    if (!FormatCodeWithClangFormatBrowserInputModel) {
      FormatCodeWithClangFormatBrowserInputModel = z.union([
        z.lazy(() =>
          FormatCodeWithClangFormatBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          FormatCodeWithClangFormatBrowserLocalInputParser(),
        ),
      ])
    }
    return FormatCodeWithClangFormatBrowserInputModel!
  }

let FormatCodeWithClangFormatBrowserLocalInputModel: z.ZodType<FormatCodeWithClangFormatBrowserLocalInput>

export const FormatCodeWithClangFormatBrowserLocalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserLocalInput> => {
    if (!FormatCodeWithClangFormatBrowserLocalInputModel) {
      FormatCodeWithClangFormatBrowserLocalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.optional(z.literal('local')),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatCodeWithClangFormatBrowserLocalInput>
    }
    return FormatCodeWithClangFormatBrowserLocalInputModel!
  }

let FormatCodeWithClangFormatBrowserOutputModel: z.ZodType<FormatCodeWithClangFormatBrowserOutput>

export const FormatCodeWithClangFormatBrowserOutputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserOutput> => {
    if (!FormatCodeWithClangFormatBrowserOutputModel) {
      FormatCodeWithClangFormatBrowserOutputModel = (
        ClangStyleAllParser() as any
      ).extend({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatCodeWithClangFormatBrowserOutput>
    }
    return FormatCodeWithClangFormatBrowserOutputModel!
  }

let FormatCodeWithClangFormatBrowserRemoteInputModel: z.ZodType<FormatCodeWithClangFormatBrowserRemoteInput>

export const FormatCodeWithClangFormatBrowserRemoteInputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserRemoteInput> => {
    if (!FormatCodeWithClangFormatBrowserRemoteInputModel) {
      FormatCodeWithClangFormatBrowserRemoteInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('remote'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatCodeWithClangFormatBrowserRemoteInput>
    }
    return FormatCodeWithClangFormatBrowserRemoteInputModel!
  }

let FormatKotlinBrowserInputModel: z.ZodType<FormatKotlinBrowserInput>

export const FormatKotlinBrowserInputParser =
  (): z.ZodType<FormatKotlinBrowserInput> => {
    if (!FormatKotlinBrowserInputModel) {
      FormatKotlinBrowserInputModel = z.union([
        z.lazy(() => FormatKotlinBrowserRemoteInputParser()),
        z.lazy(() => FormatKotlinBrowserLocalInputParser()),
      ])
    }
    return FormatKotlinBrowserInputModel!
  }

let FormatKotlinBrowserLocalInputModel: z.ZodType<FormatKotlinBrowserLocalInput>

export const FormatKotlinBrowserLocalInputParser =
  (): z.ZodType<FormatKotlinBrowserLocalInput> => {
    if (!FormatKotlinBrowserLocalInputModel) {
      FormatKotlinBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatKotlinBrowserLocalInput>
    }
    return FormatKotlinBrowserLocalInputModel!
  }

let FormatKotlinBrowserOutputModel: z.ZodType<FormatKotlinBrowserOutput>

export const FormatKotlinBrowserOutputParser =
  (): z.ZodType<FormatKotlinBrowserOutput> => {
    if (!FormatKotlinBrowserOutputModel) {
      FormatKotlinBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatKotlinBrowserOutput>
    }
    return FormatKotlinBrowserOutputModel!
  }

let FormatKotlinBrowserRemoteInputModel: z.ZodType<FormatKotlinBrowserRemoteInput>

export const FormatKotlinBrowserRemoteInputParser =
  (): z.ZodType<FormatKotlinBrowserRemoteInput> => {
    if (!FormatKotlinBrowserRemoteInputModel) {
      FormatKotlinBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatKotlinBrowserRemoteInput>
    }
    return FormatKotlinBrowserRemoteInputModel!
  }

let FormatPythonBrowserInputModel: z.ZodType<FormatPythonBrowserInput>

export const FormatPythonBrowserInputParser =
  (): z.ZodType<FormatPythonBrowserInput> => {
    if (!FormatPythonBrowserInputModel) {
      FormatPythonBrowserInputModel = z.union([
        z.lazy(() => FormatPythonBrowserRemoteInputParser()),
        z.lazy(() => FormatPythonBrowserLocalInputParser()),
      ])
    }
    return FormatPythonBrowserInputModel!
  }

let FormatPythonBrowserLocalInputModel: z.ZodType<FormatPythonBrowserLocalInput>

export const FormatPythonBrowserLocalInputParser =
  (): z.ZodType<FormatPythonBrowserLocalInput> => {
    if (!FormatPythonBrowserLocalInputModel) {
      FormatPythonBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatPythonBrowserLocalInput>
    }
    return FormatPythonBrowserLocalInputModel!
  }

let FormatPythonBrowserOutputModel: z.ZodType<FormatPythonBrowserOutput>

export const FormatPythonBrowserOutputParser =
  (): z.ZodType<FormatPythonBrowserOutput> => {
    if (!FormatPythonBrowserOutputModel) {
      FormatPythonBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatPythonBrowserOutput>
    }
    return FormatPythonBrowserOutputModel!
  }

let FormatPythonBrowserRemoteInputModel: z.ZodType<FormatPythonBrowserRemoteInput>

export const FormatPythonBrowserRemoteInputParser =
  (): z.ZodType<FormatPythonBrowserRemoteInput> => {
    if (!FormatPythonBrowserRemoteInputModel) {
      FormatPythonBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatPythonBrowserRemoteInput>
    }
    return FormatPythonBrowserRemoteInputModel!
  }

let FormatRustBrowserInputModel: z.ZodType<FormatRustBrowserInput>

export const FormatRustBrowserInputParser =
  (): z.ZodType<FormatRustBrowserInput> => {
    if (!FormatRustBrowserInputModel) {
      FormatRustBrowserInputModel = z.union([
        z.lazy(() => FormatRustBrowserRemoteInputParser()),
        z.lazy(() => FormatRustBrowserLocalInputParser()),
      ])
    }
    return FormatRustBrowserInputModel!
  }

let FormatRustBrowserLocalInputModel: z.ZodType<FormatRustBrowserLocalInput>

export const FormatRustBrowserLocalInputParser =
  (): z.ZodType<FormatRustBrowserLocalInput> => {
    if (!FormatRustBrowserLocalInputModel) {
      FormatRustBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatRustBrowserLocalInput>
    }
    return FormatRustBrowserLocalInputModel!
  }

let FormatRustBrowserOutputModel: z.ZodType<FormatRustBrowserOutput>

export const FormatRustBrowserOutputParser =
  (): z.ZodType<FormatRustBrowserOutput> => {
    if (!FormatRustBrowserOutputModel) {
      FormatRustBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatRustBrowserOutput>
    }
    return FormatRustBrowserOutputModel!
  }

let FormatRustBrowserRemoteInputModel: z.ZodType<FormatRustBrowserRemoteInput>

export const FormatRustBrowserRemoteInputParser =
  (): z.ZodType<FormatRustBrowserRemoteInput> => {
    if (!FormatRustBrowserRemoteInputModel) {
      FormatRustBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatRustBrowserRemoteInput>
    }
    return FormatRustBrowserRemoteInputModel!
  }

let FormatSwiftBrowserInputModel: z.ZodType<FormatSwiftBrowserInput>

export const FormatSwiftBrowserInputParser =
  (): z.ZodType<FormatSwiftBrowserInput> => {
    if (!FormatSwiftBrowserInputModel) {
      FormatSwiftBrowserInputModel = z.union([
        z.lazy(() => FormatSwiftBrowserRemoteInputParser()),
        z.lazy(() => FormatSwiftBrowserLocalInputParser()),
      ])
    }
    return FormatSwiftBrowserInputModel!
  }

let FormatSwiftBrowserLocalInputModel: z.ZodType<FormatSwiftBrowserLocalInput>

export const FormatSwiftBrowserLocalInputParser =
  (): z.ZodType<FormatSwiftBrowserLocalInput> => {
    if (!FormatSwiftBrowserLocalInputModel) {
      FormatSwiftBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatSwiftBrowserLocalInput>
    }
    return FormatSwiftBrowserLocalInputModel!
  }

let FormatSwiftBrowserOutputModel: z.ZodType<FormatSwiftBrowserOutput>

export const FormatSwiftBrowserOutputParser =
  (): z.ZodType<FormatSwiftBrowserOutput> => {
    if (!FormatSwiftBrowserOutputModel) {
      FormatSwiftBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatSwiftBrowserOutput>
    }
    return FormatSwiftBrowserOutputModel!
  }

let FormatSwiftBrowserRemoteInputModel: z.ZodType<FormatSwiftBrowserRemoteInput>

export const FormatSwiftBrowserRemoteInputParser =
  (): z.ZodType<FormatSwiftBrowserRemoteInput> => {
    if (!FormatSwiftBrowserRemoteInputModel) {
      FormatSwiftBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatSwiftBrowserRemoteInput>
    }
    return FormatSwiftBrowserRemoteInputModel!
  }

let SanitizeHtmlBrowserInputModel: z.ZodType<SanitizeHtmlBrowserInput>

export const SanitizeHtmlBrowserInputParser =
  (): z.ZodType<SanitizeHtmlBrowserInput> => {
    if (!SanitizeHtmlBrowserInputModel) {
      SanitizeHtmlBrowserInputModel = z.union([
        z.lazy(() => SanitizeHtmlBrowserRemoteInputParser()),
        z.lazy(() => SanitizeHtmlBrowserLocalInputParser()),
      ])
    }
    return SanitizeHtmlBrowserInputModel!
  }

let SanitizeHtmlBrowserLocalInputModel: z.ZodType<SanitizeHtmlBrowserLocalInput>

export const SanitizeHtmlBrowserLocalInputParser =
  (): z.ZodType<SanitizeHtmlBrowserLocalInput> => {
    if (!SanitizeHtmlBrowserLocalInputModel) {
      SanitizeHtmlBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.string(),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<SanitizeHtmlBrowserLocalInput>
    }
    return SanitizeHtmlBrowserLocalInputModel!
  }

let SanitizeHtmlBrowserOutputModel: z.ZodType<SanitizeHtmlBrowserOutput>

export const SanitizeHtmlBrowserOutputParser =
  (): z.ZodType<SanitizeHtmlBrowserOutput> => {
    if (!SanitizeHtmlBrowserOutputModel) {
      SanitizeHtmlBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<SanitizeHtmlBrowserOutput>
    }
    return SanitizeHtmlBrowserOutputModel!
  }

let SanitizeHtmlBrowserRemoteInputModel: z.ZodType<SanitizeHtmlBrowserRemoteInput>

export const SanitizeHtmlBrowserRemoteInputParser =
  (): z.ZodType<SanitizeHtmlBrowserRemoteInput> => {
    if (!SanitizeHtmlBrowserRemoteInputModel) {
      SanitizeHtmlBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<SanitizeHtmlBrowserRemoteInput>
    }
    return SanitizeHtmlBrowserRemoteInputModel!
  }
