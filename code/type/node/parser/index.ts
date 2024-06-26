import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@termsurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileCNodeClientInput,
  CompileCNodeExternalInput,
  CompileCNodeInput,
  CompileCNodeLocalExternalInput,
  CompileCNodeLocalInput,
  CompileCNodeLocalInternalInput,
  CompileCNodeOutput,
  CompileCNodeRemoteInput,
  CompileCppNodeClientInput,
  CompileCppNodeExternalInput,
  CompileCppNodeInput,
  CompileCppNodeLocalExternalInput,
  CompileCppNodeLocalInput,
  CompileCppNodeLocalInternalInput,
  CompileCppNodeOutput,
  CompileCppNodeRemoteInput,
  CompileRustNodeClientInput,
  CompileRustNodeExternalInput,
  CompileRustNodeInput,
  CompileRustNodeLocalExternalInput,
  CompileRustNodeLocalInput,
  CompileRustNodeLocalInternalInput,
  CompileRustNodeOutput,
  CompileRustNodeRemoteInput,
  CompileSwiftNodeClientInput,
  CompileSwiftNodeExternalInput,
  CompileSwiftNodeInput,
  CompileSwiftNodeLocalExternalInput,
  CompileSwiftNodeLocalInput,
  CompileSwiftNodeLocalInternalInput,
  CompileSwiftNodeOutput,
  CompileSwiftNodeRemoteInput,
  CompileWastNodeClientInput,
  CompileWastNodeExternalInput,
  CompileWastNodeInput,
  CompileWastNodeLocalExternalInput,
  CompileWastNodeLocalInput,
  CompileWastNodeLocalInternalInput,
  CompileWastNodeOutput,
  CompileWastNodeRemoteInput,
  ConvertArchiveNodeClientInput,
  ConvertArchiveNodeExternalInput,
  ConvertArchiveNodeInput,
  ConvertArchiveNodeLocalExternalInput,
  ConvertArchiveNodeLocalInput,
  ConvertArchiveNodeLocalInternalInput,
  ConvertArchiveNodeOutput,
  ConvertArchiveNodeRemoteInput,
  ConvertDocumentWithCalibreNodeClientInput,
  ConvertDocumentWithCalibreNodeExternalInput,
  ConvertDocumentWithCalibreNodeInput,
  ConvertDocumentWithCalibreNodeLocalExternalInput,
  ConvertDocumentWithCalibreNodeLocalInput,
  ConvertDocumentWithCalibreNodeLocalInternalInput,
  ConvertDocumentWithCalibreNodeOutput,
  ConvertDocumentWithCalibreNodeRemoteInput,
  ConvertDocumentWithEnscriptNodeClientInput,
  ConvertDocumentWithEnscriptNodeExternalInput,
  ConvertDocumentWithEnscriptNodeInput,
  ConvertDocumentWithEnscriptNodeLocalExternalInput,
  ConvertDocumentWithEnscriptNodeLocalInput,
  ConvertDocumentWithEnscriptNodeLocalInternalInput,
  ConvertDocumentWithEnscriptNodeOutput,
  ConvertDocumentWithEnscriptNodeRemoteInput,
  ConvertDocumentWithJupyterNodeClientInput,
  ConvertDocumentWithJupyterNodeExternalInput,
  ConvertDocumentWithJupyterNodeInput,
  ConvertDocumentWithJupyterNodeLocalExternalInput,
  ConvertDocumentWithJupyterNodeLocalInput,
  ConvertDocumentWithJupyterNodeLocalInternalInput,
  ConvertDocumentWithJupyterNodeOutput,
  ConvertDocumentWithJupyterNodeRemoteInput,
  ConvertDocumentWithLibreOfficeNodeClientInput,
  ConvertDocumentWithLibreOfficeNodeExternalInput,
  ConvertDocumentWithLibreOfficeNodeInput,
  ConvertDocumentWithLibreOfficeNodeLocalExternalInput,
  ConvertDocumentWithLibreOfficeNodeLocalInput,
  ConvertDocumentWithLibreOfficeNodeLocalInternalInput,
  ConvertDocumentWithLibreOfficeNodeOutput,
  ConvertDocumentWithLibreOfficeNodeRemoteInput,
  ConvertDocumentWithPandocNodeClientInput,
  ConvertDocumentWithPandocNodeExternalInput,
  ConvertDocumentWithPandocNodeInput,
  ConvertDocumentWithPandocNodeLocalExternalInput,
  ConvertDocumentWithPandocNodeLocalInput,
  ConvertDocumentWithPandocNodeLocalInternalInput,
  ConvertDocumentWithPandocNodeOutput,
  ConvertDocumentWithPandocNodeRemoteInput,
  ConvertFontWithFontForgeNodeClientInput,
  ConvertFontWithFontForgeNodeExternalInput,
  ConvertFontWithFontForgeNodeInput,
  ConvertFontWithFontForgeNodeLocalExternalInput,
  ConvertFontWithFontForgeNodeLocalInput,
  ConvertFontWithFontForgeNodeLocalInternalInput,
  ConvertFontWithFontForgeNodeOutput,
  ConvertFontWithFontForgeNodeRemoteInput,
  ConvertHtmlWithPuppeteerNodeClientInput,
  ConvertHtmlWithPuppeteerNodeExternalInput,
  ConvertHtmlWithPuppeteerNodeInput,
  ConvertHtmlWithPuppeteerNodeLocalExternalInput,
  ConvertHtmlWithPuppeteerNodeLocalInput,
  ConvertHtmlWithPuppeteerNodeLocalInternalInput,
  ConvertHtmlWithPuppeteerNodeOutput,
  ConvertHtmlWithPuppeteerNodeRemoteInput,
  ConvertImageWithImageMagickNodeClientInput,
  ConvertImageWithImageMagickNodeExternalInput,
  ConvertImageWithImageMagickNodeInput,
  ConvertImageWithImageMagickNodeLocalExternalInput,
  ConvertImageWithImageMagickNodeLocalInput,
  ConvertImageWithImageMagickNodeLocalInternalInput,
  ConvertImageWithImageMagickNodeOutput,
  ConvertImageWithImageMagickNodeRemoteInput,
  ConvertImageWithInkscapeNodeClientInput,
  ConvertImageWithInkscapeNodeExternalInput,
  ConvertImageWithInkscapeNodeInput,
  ConvertImageWithInkscapeNodeLocalExternalInput,
  ConvertImageWithInkscapeNodeLocalInput,
  ConvertImageWithInkscapeNodeLocalInternalInput,
  ConvertImageWithInkscapeNodeOutput,
  ConvertImageWithInkscapeNodeRemoteInput,
  ConvertLatexToPngNodeClientInput,
  ConvertLatexToPngNodeExternalInput,
  ConvertLatexToPngNodeInput,
  ConvertLatexToPngNodeLocalExternalInput,
  ConvertLatexToPngNodeLocalInput,
  ConvertLatexToPngNodeLocalInternalInput,
  ConvertLatexToPngNodeOutput,
  ConvertLatexToPngNodeRemoteInput,
  ConvertLatexWithPdfLatexNodeClientInput,
  ConvertLatexWithPdfLatexNodeExternalInput,
  ConvertLatexWithPdfLatexNodeInput,
  ConvertLatexWithPdfLatexNodeLocalExternalInput,
  ConvertLatexWithPdfLatexNodeLocalInput,
  ConvertLatexWithPdfLatexNodeLocalInternalInput,
  ConvertLatexWithPdfLatexNodeOutput,
  ConvertLatexWithPdfLatexNodeRemoteInput,
  ConvertMarkdownWithPuppeteerNodeClientInput,
  ConvertMarkdownWithPuppeteerNodeExternalInput,
  ConvertMarkdownWithPuppeteerNodeInput,
  ConvertMarkdownWithPuppeteerNodeLocalExternalInput,
  ConvertMarkdownWithPuppeteerNodeLocalInput,
  ConvertMarkdownWithPuppeteerNodeLocalInternalInput,
  ConvertMarkdownWithPuppeteerNodeOutput,
  ConvertMarkdownWithPuppeteerNodeRemoteInput,
  ConvertTxtWithPuppeteerNodeClientInput,
  ConvertTxtWithPuppeteerNodeExternalInput,
  ConvertTxtWithPuppeteerNodeInput,
  ConvertTxtWithPuppeteerNodeLocalExternalInput,
  ConvertTxtWithPuppeteerNodeLocalInput,
  ConvertTxtWithPuppeteerNodeLocalInternalInput,
  ConvertTxtWithPuppeteerNodeOutput,
  ConvertTxtWithPuppeteerNodeRemoteInput,
  ConvertVideoWithFfmpegNodeClientInput,
  ConvertVideoWithFfmpegNodeExternalInput,
  ConvertVideoWithFfmpegNodeInput,
  ConvertVideoWithFfmpegNodeLocalExternalInput,
  ConvertVideoWithFfmpegNodeLocalInput,
  ConvertVideoWithFfmpegNodeLocalInternalInput,
  ConvertVideoWithFfmpegNodeOutput,
  ConvertVideoWithFfmpegNodeRemoteInput,
  FormatAssemblyNodeClientInput,
  FormatAssemblyNodeExternalInput,
  FormatAssemblyNodeInput,
  FormatAssemblyNodeLocalExternalInput,
  FormatAssemblyNodeLocalInput,
  FormatAssemblyNodeLocalInternalInput,
  FormatAssemblyNodeOutput,
  FormatAssemblyNodeRemoteInput,
  FormatCodeWithClangFormatNodeClientInput,
  FormatCodeWithClangFormatNodeExternalInput,
  FormatCodeWithClangFormatNodeInput,
  FormatCodeWithClangFormatNodeLocalExternalInput,
  FormatCodeWithClangFormatNodeLocalInput,
  FormatCodeWithClangFormatNodeLocalInternalInput,
  FormatCodeWithClangFormatNodeOutput,
  FormatCodeWithClangFormatNodeRemoteInput,
  FormatKotlinNodeClientInput,
  FormatKotlinNodeExternalInput,
  FormatKotlinNodeInput,
  FormatKotlinNodeLocalExternalInput,
  FormatKotlinNodeLocalInput,
  FormatKotlinNodeLocalInternalInput,
  FormatKotlinNodeOutput,
  FormatKotlinNodeRemoteInput,
  FormatPythonNodeClientInput,
  FormatPythonNodeExternalInput,
  FormatPythonNodeInput,
  FormatPythonNodeLocalExternalInput,
  FormatPythonNodeLocalInput,
  FormatPythonNodeLocalInternalInput,
  FormatPythonNodeOutput,
  FormatPythonNodeRemoteInput,
  FormatRustNodeClientInput,
  FormatRustNodeExternalInput,
  FormatRustNodeInput,
  FormatRustNodeLocalExternalInput,
  FormatRustNodeLocalInput,
  FormatRustNodeLocalInternalInput,
  FormatRustNodeOutput,
  FormatRustNodeRemoteInput,
  FormatSwiftNodeClientInput,
  FormatSwiftNodeExternalInput,
  FormatSwiftNodeInput,
  FormatSwiftNodeLocalExternalInput,
  FormatSwiftNodeLocalInput,
  FormatSwiftNodeLocalInternalInput,
  FormatSwiftNodeOutput,
  FormatSwiftNodeRemoteInput,
  SanitizeHtmlNodeClientInput,
  SanitizeHtmlNodeExternalInput,
  SanitizeHtmlNodeInput,
  SanitizeHtmlNodeLocalExternalInput,
  SanitizeHtmlNodeLocalInput,
  SanitizeHtmlNodeLocalInternalInput,
  SanitizeHtmlNodeOutput,
  SanitizeHtmlNodeRemoteInput,
} from '~/code/type/node/index.js'
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
  FileInputPathParser,
  FilePathParser,
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
  LocalOutputPathParser,
  LocalPathParser,
  PandocInputFormatParser,
  PandocOutputFormatParser,
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerMarkdownInputFormatParser,
  PuppeteerOutputFormatParser,
  PuppeteerTxtInputFormatParser,
  RemoteInputPathParser,
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
  SwiftInputFormatParser,
  TextStyleParser,
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/type/shared/parser/index.js'
import { ClangStyleAllParser } from '~/code/type/shared/parser/clang-format.js'

let CompileCNodeClientInputModel: z.ZodType<CompileCNodeClientInput>

export const CompileCNodeClientInputParser =
  (): z.ZodType<CompileCNodeClientInput> => {
    if (!CompileCNodeClientInputModel) {
      CompileCNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<CompileCNodeClientInput>
    }
    return CompileCNodeClientInputModel!
  }

let CompileCNodeExternalInputModel: z.ZodType<CompileCNodeExternalInput>

export const CompileCNodeExternalInputParser =
  (): z.ZodType<CompileCNodeExternalInput> => {
    if (!CompileCNodeExternalInputModel) {
      CompileCNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<CompileCNodeExternalInput>
    }
    return CompileCNodeExternalInputModel!
  }

let CompileCNodeInputModel: z.ZodType<CompileCNodeInput>

export const CompileCNodeInputParser =
  (): z.ZodType<CompileCNodeInput> => {
    if (!CompileCNodeInputModel) {
      CompileCNodeInputModel = z.union([
        z.lazy(() => CompileCNodeRemoteInputParser()),
        z.lazy(() => CompileCNodeLocalExternalInputParser()),
        z.lazy(() => CompileCNodeLocalInternalInputParser()),
      ])
    }
    return CompileCNodeInputModel!
  }

let CompileCNodeLocalExternalInputModel: z.ZodType<CompileCNodeLocalExternalInput>

export const CompileCNodeLocalExternalInputParser =
  (): z.ZodType<CompileCNodeLocalExternalInput> => {
    if (!CompileCNodeLocalExternalInputModel) {
      CompileCNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeLocalExternalInput>
    }
    return CompileCNodeLocalExternalInputModel!
  }

let CompileCNodeLocalInputModel: z.ZodType<CompileCNodeLocalInput>

export const CompileCNodeLocalInputParser =
  (): z.ZodType<CompileCNodeLocalInput> => {
    if (!CompileCNodeLocalInputModel) {
      CompileCNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeLocalInput>
    }
    return CompileCNodeLocalInputModel!
  }

let CompileCNodeLocalInternalInputModel: z.ZodType<CompileCNodeLocalInternalInput>

export const CompileCNodeLocalInternalInputParser =
  (): z.ZodType<CompileCNodeLocalInternalInput> => {
    if (!CompileCNodeLocalInternalInputModel) {
      CompileCNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeLocalInternalInput>
    }
    return CompileCNodeLocalInternalInputModel!
  }

let CompileCNodeOutputModel: z.ZodType<CompileCNodeOutput>

export const CompileCNodeOutputParser =
  (): z.ZodType<CompileCNodeOutput> => {
    if (!CompileCNodeOutputModel) {
      CompileCNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileCNodeOutput>
    }
    return CompileCNodeOutputModel!
  }

let CompileCNodeRemoteInputModel: z.ZodType<CompileCNodeRemoteInput>

export const CompileCNodeRemoteInputParser =
  (): z.ZodType<CompileCNodeRemoteInput> => {
    if (!CompileCNodeRemoteInputModel) {
      CompileCNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeRemoteInput>
    }
    return CompileCNodeRemoteInputModel!
  }

let CompileCppNodeClientInputModel: z.ZodType<CompileCppNodeClientInput>

export const CompileCppNodeClientInputParser =
  (): z.ZodType<CompileCppNodeClientInput> => {
    if (!CompileCppNodeClientInputModel) {
      CompileCppNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<CompileCppNodeClientInput>
    }
    return CompileCppNodeClientInputModel!
  }

let CompileCppNodeExternalInputModel: z.ZodType<CompileCppNodeExternalInput>

export const CompileCppNodeExternalInputParser =
  (): z.ZodType<CompileCppNodeExternalInput> => {
    if (!CompileCppNodeExternalInputModel) {
      CompileCppNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<CompileCppNodeExternalInput>
    }
    return CompileCppNodeExternalInputModel!
  }

let CompileCppNodeInputModel: z.ZodType<CompileCppNodeInput>

export const CompileCppNodeInputParser =
  (): z.ZodType<CompileCppNodeInput> => {
    if (!CompileCppNodeInputModel) {
      CompileCppNodeInputModel = z.union([
        z.lazy(() => CompileCppNodeRemoteInputParser()),
        z.lazy(() => CompileCppNodeLocalExternalInputParser()),
        z.lazy(() => CompileCppNodeLocalInternalInputParser()),
      ])
    }
    return CompileCppNodeInputModel!
  }

let CompileCppNodeLocalExternalInputModel: z.ZodType<CompileCppNodeLocalExternalInput>

export const CompileCppNodeLocalExternalInputParser =
  (): z.ZodType<CompileCppNodeLocalExternalInput> => {
    if (!CompileCppNodeLocalExternalInputModel) {
      CompileCppNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeLocalExternalInput>
    }
    return CompileCppNodeLocalExternalInputModel!
  }

let CompileCppNodeLocalInputModel: z.ZodType<CompileCppNodeLocalInput>

export const CompileCppNodeLocalInputParser =
  (): z.ZodType<CompileCppNodeLocalInput> => {
    if (!CompileCppNodeLocalInputModel) {
      CompileCppNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeLocalInput>
    }
    return CompileCppNodeLocalInputModel!
  }

let CompileCppNodeLocalInternalInputModel: z.ZodType<CompileCppNodeLocalInternalInput>

export const CompileCppNodeLocalInternalInputParser =
  (): z.ZodType<CompileCppNodeLocalInternalInput> => {
    if (!CompileCppNodeLocalInternalInputModel) {
      CompileCppNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeLocalInternalInput>
    }
    return CompileCppNodeLocalInternalInputModel!
  }

let CompileCppNodeOutputModel: z.ZodType<CompileCppNodeOutput>

export const CompileCppNodeOutputParser =
  (): z.ZodType<CompileCppNodeOutput> => {
    if (!CompileCppNodeOutputModel) {
      CompileCppNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileCppNodeOutput>
    }
    return CompileCppNodeOutputModel!
  }

let CompileCppNodeRemoteInputModel: z.ZodType<CompileCppNodeRemoteInput>

export const CompileCppNodeRemoteInputParser =
  (): z.ZodType<CompileCppNodeRemoteInput> => {
    if (!CompileCppNodeRemoteInputModel) {
      CompileCppNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeRemoteInput>
    }
    return CompileCppNodeRemoteInputModel!
  }

let CompileRustNodeClientInputModel: z.ZodType<CompileRustNodeClientInput>

export const CompileRustNodeClientInputParser =
  (): z.ZodType<CompileRustNodeClientInput> => {
    if (!CompileRustNodeClientInputModel) {
      CompileRustNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeClientInput>
    }
    return CompileRustNodeClientInputModel!
  }

let CompileRustNodeExternalInputModel: z.ZodType<CompileRustNodeExternalInput>

export const CompileRustNodeExternalInputParser =
  (): z.ZodType<CompileRustNodeExternalInput> => {
    if (!CompileRustNodeExternalInputModel) {
      CompileRustNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeExternalInput>
    }
    return CompileRustNodeExternalInputModel!
  }

let CompileRustNodeInputModel: z.ZodType<CompileRustNodeInput>

export const CompileRustNodeInputParser =
  (): z.ZodType<CompileRustNodeInput> => {
    if (!CompileRustNodeInputModel) {
      CompileRustNodeInputModel = z.union([
        z.lazy(() => CompileRustNodeRemoteInputParser()),
        z.lazy(() => CompileRustNodeLocalExternalInputParser()),
        z.lazy(() => CompileRustNodeLocalInternalInputParser()),
      ])
    }
    return CompileRustNodeInputModel!
  }

let CompileRustNodeLocalExternalInputModel: z.ZodType<CompileRustNodeLocalExternalInput>

export const CompileRustNodeLocalExternalInputParser =
  (): z.ZodType<CompileRustNodeLocalExternalInput> => {
    if (!CompileRustNodeLocalExternalInputModel) {
      CompileRustNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeLocalExternalInput>
    }
    return CompileRustNodeLocalExternalInputModel!
  }

let CompileRustNodeLocalInputModel: z.ZodType<CompileRustNodeLocalInput>

export const CompileRustNodeLocalInputParser =
  (): z.ZodType<CompileRustNodeLocalInput> => {
    if (!CompileRustNodeLocalInputModel) {
      CompileRustNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeLocalInput>
    }
    return CompileRustNodeLocalInputModel!
  }

let CompileRustNodeLocalInternalInputModel: z.ZodType<CompileRustNodeLocalInternalInput>

export const CompileRustNodeLocalInternalInputParser =
  (): z.ZodType<CompileRustNodeLocalInternalInput> => {
    if (!CompileRustNodeLocalInternalInputModel) {
      CompileRustNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeLocalInternalInput>
    }
    return CompileRustNodeLocalInternalInputModel!
  }

let CompileRustNodeOutputModel: z.ZodType<CompileRustNodeOutput>

export const CompileRustNodeOutputParser =
  (): z.ZodType<CompileRustNodeOutput> => {
    if (!CompileRustNodeOutputModel) {
      CompileRustNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileRustNodeOutput>
    }
    return CompileRustNodeOutputModel!
  }

let CompileRustNodeRemoteInputModel: z.ZodType<CompileRustNodeRemoteInput>

export const CompileRustNodeRemoteInputParser =
  (): z.ZodType<CompileRustNodeRemoteInput> => {
    if (!CompileRustNodeRemoteInputModel) {
      CompileRustNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeRemoteInput>
    }
    return CompileRustNodeRemoteInputModel!
  }

let CompileSwiftNodeClientInputModel: z.ZodType<CompileSwiftNodeClientInput>

export const CompileSwiftNodeClientInputParser =
  (): z.ZodType<CompileSwiftNodeClientInput> => {
    if (!CompileSwiftNodeClientInputModel) {
      CompileSwiftNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftNodeClientInput>
    }
    return CompileSwiftNodeClientInputModel!
  }

let CompileSwiftNodeExternalInputModel: z.ZodType<CompileSwiftNodeExternalInput>

export const CompileSwiftNodeExternalInputParser =
  (): z.ZodType<CompileSwiftNodeExternalInput> => {
    if (!CompileSwiftNodeExternalInputModel) {
      CompileSwiftNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftNodeExternalInput>
    }
    return CompileSwiftNodeExternalInputModel!
  }

let CompileSwiftNodeInputModel: z.ZodType<CompileSwiftNodeInput>

export const CompileSwiftNodeInputParser =
  (): z.ZodType<CompileSwiftNodeInput> => {
    if (!CompileSwiftNodeInputModel) {
      CompileSwiftNodeInputModel = z.union([
        z.lazy(() => CompileSwiftNodeRemoteInputParser()),
        z.lazy(() => CompileSwiftNodeLocalExternalInputParser()),
        z.lazy(() => CompileSwiftNodeLocalInternalInputParser()),
      ])
    }
    return CompileSwiftNodeInputModel!
  }

let CompileSwiftNodeLocalExternalInputModel: z.ZodType<CompileSwiftNodeLocalExternalInput>

export const CompileSwiftNodeLocalExternalInputParser =
  (): z.ZodType<CompileSwiftNodeLocalExternalInput> => {
    if (!CompileSwiftNodeLocalExternalInputModel) {
      CompileSwiftNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeLocalExternalInput>
    }
    return CompileSwiftNodeLocalExternalInputModel!
  }

let CompileSwiftNodeLocalInputModel: z.ZodType<CompileSwiftNodeLocalInput>

export const CompileSwiftNodeLocalInputParser =
  (): z.ZodType<CompileSwiftNodeLocalInput> => {
    if (!CompileSwiftNodeLocalInputModel) {
      CompileSwiftNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeLocalInput>
    }
    return CompileSwiftNodeLocalInputModel!
  }

let CompileSwiftNodeLocalInternalInputModel: z.ZodType<CompileSwiftNodeLocalInternalInput>

export const CompileSwiftNodeLocalInternalInputParser =
  (): z.ZodType<CompileSwiftNodeLocalInternalInput> => {
    if (!CompileSwiftNodeLocalInternalInputModel) {
      CompileSwiftNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeLocalInternalInput>
    }
    return CompileSwiftNodeLocalInternalInputModel!
  }

let CompileSwiftNodeOutputModel: z.ZodType<CompileSwiftNodeOutput>

export const CompileSwiftNodeOutputParser =
  (): z.ZodType<CompileSwiftNodeOutput> => {
    if (!CompileSwiftNodeOutputModel) {
      CompileSwiftNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileSwiftNodeOutput>
    }
    return CompileSwiftNodeOutputModel!
  }

let CompileSwiftNodeRemoteInputModel: z.ZodType<CompileSwiftNodeRemoteInput>

export const CompileSwiftNodeRemoteInputParser =
  (): z.ZodType<CompileSwiftNodeRemoteInput> => {
    if (!CompileSwiftNodeRemoteInputModel) {
      CompileSwiftNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeRemoteInput>
    }
    return CompileSwiftNodeRemoteInputModel!
  }

let CompileWastNodeClientInputModel: z.ZodType<CompileWastNodeClientInput>

export const CompileWastNodeClientInputParser =
  (): z.ZodType<CompileWastNodeClientInput> => {
    if (!CompileWastNodeClientInputModel) {
      CompileWastNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastNodeClientInput>
    }
    return CompileWastNodeClientInputModel!
  }

let CompileWastNodeExternalInputModel: z.ZodType<CompileWastNodeExternalInput>

export const CompileWastNodeExternalInputParser =
  (): z.ZodType<CompileWastNodeExternalInput> => {
    if (!CompileWastNodeExternalInputModel) {
      CompileWastNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastNodeExternalInput>
    }
    return CompileWastNodeExternalInputModel!
  }

let CompileWastNodeInputModel: z.ZodType<CompileWastNodeInput>

export const CompileWastNodeInputParser =
  (): z.ZodType<CompileWastNodeInput> => {
    if (!CompileWastNodeInputModel) {
      CompileWastNodeInputModel = z.union([
        z.lazy(() => CompileWastNodeRemoteInputParser()),
        z.lazy(() => CompileWastNodeLocalExternalInputParser()),
        z.lazy(() => CompileWastNodeLocalInternalInputParser()),
      ])
    }
    return CompileWastNodeInputModel!
  }

let CompileWastNodeLocalExternalInputModel: z.ZodType<CompileWastNodeLocalExternalInput>

export const CompileWastNodeLocalExternalInputParser =
  (): z.ZodType<CompileWastNodeLocalExternalInput> => {
    if (!CompileWastNodeLocalExternalInputModel) {
      CompileWastNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeLocalExternalInput>
    }
    return CompileWastNodeLocalExternalInputModel!
  }

let CompileWastNodeLocalInputModel: z.ZodType<CompileWastNodeLocalInput>

export const CompileWastNodeLocalInputParser =
  (): z.ZodType<CompileWastNodeLocalInput> => {
    if (!CompileWastNodeLocalInputModel) {
      CompileWastNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeLocalInput>
    }
    return CompileWastNodeLocalInputModel!
  }

let CompileWastNodeLocalInternalInputModel: z.ZodType<CompileWastNodeLocalInternalInput>

export const CompileWastNodeLocalInternalInputParser =
  (): z.ZodType<CompileWastNodeLocalInternalInput> => {
    if (!CompileWastNodeLocalInternalInputModel) {
      CompileWastNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeLocalInternalInput>
    }
    return CompileWastNodeLocalInternalInputModel!
  }

let CompileWastNodeOutputModel: z.ZodType<CompileWastNodeOutput>

export const CompileWastNodeOutputParser =
  (): z.ZodType<CompileWastNodeOutput> => {
    if (!CompileWastNodeOutputModel) {
      CompileWastNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileWastNodeOutput>
    }
    return CompileWastNodeOutputModel!
  }

let CompileWastNodeRemoteInputModel: z.ZodType<CompileWastNodeRemoteInput>

export const CompileWastNodeRemoteInputParser =
  (): z.ZodType<CompileWastNodeRemoteInput> => {
    if (!CompileWastNodeRemoteInputModel) {
      CompileWastNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeRemoteInput>
    }
    return CompileWastNodeRemoteInputModel!
  }

let ConvertArchiveNodeClientInputModel: z.ZodType<ConvertArchiveNodeClientInput>

export const ConvertArchiveNodeClientInputParser =
  (): z.ZodType<ConvertArchiveNodeClientInput> => {
    if (!ConvertArchiveNodeClientInputModel) {
      ConvertArchiveNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveNodeClientInput>
    }
    return ConvertArchiveNodeClientInputModel!
  }

let ConvertArchiveNodeExternalInputModel: z.ZodType<ConvertArchiveNodeExternalInput>

export const ConvertArchiveNodeExternalInputParser =
  (): z.ZodType<ConvertArchiveNodeExternalInput> => {
    if (!ConvertArchiveNodeExternalInputModel) {
      ConvertArchiveNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveNodeExternalInput>
    }
    return ConvertArchiveNodeExternalInputModel!
  }

let ConvertArchiveNodeInputModel: z.ZodType<ConvertArchiveNodeInput>

export const ConvertArchiveNodeInputParser =
  (): z.ZodType<ConvertArchiveNodeInput> => {
    if (!ConvertArchiveNodeInputModel) {
      ConvertArchiveNodeInputModel = z.union([
        z.lazy(() => ConvertArchiveNodeRemoteInputParser()),
        z.lazy(() => ConvertArchiveNodeLocalExternalInputParser()),
        z.lazy(() => ConvertArchiveNodeLocalInternalInputParser()),
      ])
    }
    return ConvertArchiveNodeInputModel!
  }

let ConvertArchiveNodeLocalExternalInputModel: z.ZodType<ConvertArchiveNodeLocalExternalInput>

export const ConvertArchiveNodeLocalExternalInputParser =
  (): z.ZodType<ConvertArchiveNodeLocalExternalInput> => {
    if (!ConvertArchiveNodeLocalExternalInputModel) {
      ConvertArchiveNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeLocalExternalInput>
    }
    return ConvertArchiveNodeLocalExternalInputModel!
  }

let ConvertArchiveNodeLocalInputModel: z.ZodType<ConvertArchiveNodeLocalInput>

export const ConvertArchiveNodeLocalInputParser =
  (): z.ZodType<ConvertArchiveNodeLocalInput> => {
    if (!ConvertArchiveNodeLocalInputModel) {
      ConvertArchiveNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeLocalInput>
    }
    return ConvertArchiveNodeLocalInputModel!
  }

let ConvertArchiveNodeLocalInternalInputModel: z.ZodType<ConvertArchiveNodeLocalInternalInput>

export const ConvertArchiveNodeLocalInternalInputParser =
  (): z.ZodType<ConvertArchiveNodeLocalInternalInput> => {
    if (!ConvertArchiveNodeLocalInternalInputModel) {
      ConvertArchiveNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeLocalInternalInput>
    }
    return ConvertArchiveNodeLocalInternalInputModel!
  }

let ConvertArchiveNodeOutputModel: z.ZodType<ConvertArchiveNodeOutput>

export const ConvertArchiveNodeOutputParser =
  (): z.ZodType<ConvertArchiveNodeOutput> => {
    if (!ConvertArchiveNodeOutputModel) {
      ConvertArchiveNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertArchiveNodeOutput>
    }
    return ConvertArchiveNodeOutputModel!
  }

let ConvertArchiveNodeRemoteInputModel: z.ZodType<ConvertArchiveNodeRemoteInput>

export const ConvertArchiveNodeRemoteInputParser =
  (): z.ZodType<ConvertArchiveNodeRemoteInput> => {
    if (!ConvertArchiveNodeRemoteInputModel) {
      ConvertArchiveNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeRemoteInput>
    }
    return ConvertArchiveNodeRemoteInputModel!
  }

let ConvertDocumentWithCalibreNodeClientInputModel: z.ZodType<ConvertDocumentWithCalibreNodeClientInput>

export const ConvertDocumentWithCalibreNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeClientInput> => {
    if (!ConvertDocumentWithCalibreNodeClientInputModel) {
      ConvertDocumentWithCalibreNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeClientInput>
    }
    return ConvertDocumentWithCalibreNodeClientInputModel!
  }

let ConvertDocumentWithCalibreNodeExternalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeExternalInput>

export const ConvertDocumentWithCalibreNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeExternalInput> => {
    if (!ConvertDocumentWithCalibreNodeExternalInputModel) {
      ConvertDocumentWithCalibreNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeExternalInput>
    }
    return ConvertDocumentWithCalibreNodeExternalInputModel!
  }

let ConvertDocumentWithCalibreNodeInputModel: z.ZodType<ConvertDocumentWithCalibreNodeInput>

export const ConvertDocumentWithCalibreNodeInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeInput> => {
    if (!ConvertDocumentWithCalibreNodeInputModel) {
      ConvertDocumentWithCalibreNodeInputModel = z.union([
        z.lazy(() => ConvertDocumentWithCalibreNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertDocumentWithCalibreNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithCalibreNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithCalibreNodeInputModel!
  }

let ConvertDocumentWithCalibreNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeLocalExternalInput>

export const ConvertDocumentWithCalibreNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeLocalExternalInput> => {
    if (!ConvertDocumentWithCalibreNodeLocalExternalInputModel) {
      ConvertDocumentWithCalibreNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeLocalExternalInput>
    }
    return ConvertDocumentWithCalibreNodeLocalExternalInputModel!
  }

let ConvertDocumentWithCalibreNodeLocalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeLocalInput>

export const ConvertDocumentWithCalibreNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeLocalInput> => {
    if (!ConvertDocumentWithCalibreNodeLocalInputModel) {
      ConvertDocumentWithCalibreNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeLocalInput>
    }
    return ConvertDocumentWithCalibreNodeLocalInputModel!
  }

let ConvertDocumentWithCalibreNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeLocalInternalInput>

export const ConvertDocumentWithCalibreNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeLocalInternalInput> => {
    if (!ConvertDocumentWithCalibreNodeLocalInternalInputModel) {
      ConvertDocumentWithCalibreNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeLocalInternalInput>
    }
    return ConvertDocumentWithCalibreNodeLocalInternalInputModel!
  }

let ConvertDocumentWithCalibreNodeOutputModel: z.ZodType<ConvertDocumentWithCalibreNodeOutput>

export const ConvertDocumentWithCalibreNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeOutput> => {
    if (!ConvertDocumentWithCalibreNodeOutputModel) {
      ConvertDocumentWithCalibreNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeOutput>
    }
    return ConvertDocumentWithCalibreNodeOutputModel!
  }

let ConvertDocumentWithCalibreNodeRemoteInputModel: z.ZodType<ConvertDocumentWithCalibreNodeRemoteInput>

export const ConvertDocumentWithCalibreNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeRemoteInput> => {
    if (!ConvertDocumentWithCalibreNodeRemoteInputModel) {
      ConvertDocumentWithCalibreNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeRemoteInput>
    }
    return ConvertDocumentWithCalibreNodeRemoteInputModel!
  }

let ConvertDocumentWithEnscriptNodeClientInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeClientInput>

export const ConvertDocumentWithEnscriptNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeClientInput> => {
    if (!ConvertDocumentWithEnscriptNodeClientInputModel) {
      ConvertDocumentWithEnscriptNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeClientInput>
    }
    return ConvertDocumentWithEnscriptNodeClientInputModel!
  }

let ConvertDocumentWithEnscriptNodeExternalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeExternalInput>

export const ConvertDocumentWithEnscriptNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeExternalInput> => {
    if (!ConvertDocumentWithEnscriptNodeExternalInputModel) {
      ConvertDocumentWithEnscriptNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeExternalInput>
    }
    return ConvertDocumentWithEnscriptNodeExternalInputModel!
  }

let ConvertDocumentWithEnscriptNodeInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeInput>

export const ConvertDocumentWithEnscriptNodeInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeInput> => {
    if (!ConvertDocumentWithEnscriptNodeInputModel) {
      ConvertDocumentWithEnscriptNodeInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithEnscriptNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithEnscriptNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithEnscriptNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithEnscriptNodeInputModel!
  }

let ConvertDocumentWithEnscriptNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeLocalExternalInput>

export const ConvertDocumentWithEnscriptNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeLocalExternalInput> => {
    if (!ConvertDocumentWithEnscriptNodeLocalExternalInputModel) {
      ConvertDocumentWithEnscriptNodeLocalExternalInputModel = z.object(
        {
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => EnscriptInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => EnscriptOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
        },
      ) as z.ZodType<ConvertDocumentWithEnscriptNodeLocalExternalInput>
    }
    return ConvertDocumentWithEnscriptNodeLocalExternalInputModel!
  }

let ConvertDocumentWithEnscriptNodeLocalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeLocalInput>

export const ConvertDocumentWithEnscriptNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeLocalInput> => {
    if (!ConvertDocumentWithEnscriptNodeLocalInputModel) {
      ConvertDocumentWithEnscriptNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeLocalInput>
    }
    return ConvertDocumentWithEnscriptNodeLocalInputModel!
  }

let ConvertDocumentWithEnscriptNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeLocalInternalInput>

export const ConvertDocumentWithEnscriptNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeLocalInternalInput> => {
    if (!ConvertDocumentWithEnscriptNodeLocalInternalInputModel) {
      ConvertDocumentWithEnscriptNodeLocalInternalInputModel = z.object(
        {
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => EnscriptInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => EnscriptOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
        },
      ) as z.ZodType<ConvertDocumentWithEnscriptNodeLocalInternalInput>
    }
    return ConvertDocumentWithEnscriptNodeLocalInternalInputModel!
  }

let ConvertDocumentWithEnscriptNodeOutputModel: z.ZodType<ConvertDocumentWithEnscriptNodeOutput>

export const ConvertDocumentWithEnscriptNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeOutput> => {
    if (!ConvertDocumentWithEnscriptNodeOutputModel) {
      ConvertDocumentWithEnscriptNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeOutput>
    }
    return ConvertDocumentWithEnscriptNodeOutputModel!
  }

let ConvertDocumentWithEnscriptNodeRemoteInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeRemoteInput>

export const ConvertDocumentWithEnscriptNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeRemoteInput> => {
    if (!ConvertDocumentWithEnscriptNodeRemoteInputModel) {
      ConvertDocumentWithEnscriptNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeRemoteInput>
    }
    return ConvertDocumentWithEnscriptNodeRemoteInputModel!
  }

let ConvertDocumentWithJupyterNodeClientInputModel: z.ZodType<ConvertDocumentWithJupyterNodeClientInput>

export const ConvertDocumentWithJupyterNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeClientInput> => {
    if (!ConvertDocumentWithJupyterNodeClientInputModel) {
      ConvertDocumentWithJupyterNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeClientInput>
    }
    return ConvertDocumentWithJupyterNodeClientInputModel!
  }

let ConvertDocumentWithJupyterNodeExternalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeExternalInput>

export const ConvertDocumentWithJupyterNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeExternalInput> => {
    if (!ConvertDocumentWithJupyterNodeExternalInputModel) {
      ConvertDocumentWithJupyterNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeExternalInput>
    }
    return ConvertDocumentWithJupyterNodeExternalInputModel!
  }

let ConvertDocumentWithJupyterNodeInputModel: z.ZodType<ConvertDocumentWithJupyterNodeInput>

export const ConvertDocumentWithJupyterNodeInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeInput> => {
    if (!ConvertDocumentWithJupyterNodeInputModel) {
      ConvertDocumentWithJupyterNodeInputModel = z.union([
        z.lazy(() => ConvertDocumentWithJupyterNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertDocumentWithJupyterNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithJupyterNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithJupyterNodeInputModel!
  }

let ConvertDocumentWithJupyterNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeLocalExternalInput>

export const ConvertDocumentWithJupyterNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeLocalExternalInput> => {
    if (!ConvertDocumentWithJupyterNodeLocalExternalInputModel) {
      ConvertDocumentWithJupyterNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeLocalExternalInput>
    }
    return ConvertDocumentWithJupyterNodeLocalExternalInputModel!
  }

let ConvertDocumentWithJupyterNodeLocalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeLocalInput>

export const ConvertDocumentWithJupyterNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeLocalInput> => {
    if (!ConvertDocumentWithJupyterNodeLocalInputModel) {
      ConvertDocumentWithJupyterNodeLocalInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeLocalInput>
    }
    return ConvertDocumentWithJupyterNodeLocalInputModel!
  }

let ConvertDocumentWithJupyterNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeLocalInternalInput>

export const ConvertDocumentWithJupyterNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeLocalInternalInput> => {
    if (!ConvertDocumentWithJupyterNodeLocalInternalInputModel) {
      ConvertDocumentWithJupyterNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeLocalInternalInput>
    }
    return ConvertDocumentWithJupyterNodeLocalInternalInputModel!
  }

let ConvertDocumentWithJupyterNodeOutputModel: z.ZodType<ConvertDocumentWithJupyterNodeOutput>

export const ConvertDocumentWithJupyterNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeOutput> => {
    if (!ConvertDocumentWithJupyterNodeOutputModel) {
      ConvertDocumentWithJupyterNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeOutput>
    }
    return ConvertDocumentWithJupyterNodeOutputModel!
  }

let ConvertDocumentWithJupyterNodeRemoteInputModel: z.ZodType<ConvertDocumentWithJupyterNodeRemoteInput>

export const ConvertDocumentWithJupyterNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeRemoteInput> => {
    if (!ConvertDocumentWithJupyterNodeRemoteInputModel) {
      ConvertDocumentWithJupyterNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeRemoteInput>
    }
    return ConvertDocumentWithJupyterNodeRemoteInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeClientInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeClientInput>

export const ConvertDocumentWithLibreOfficeNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeClientInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeClientInputModel) {
      ConvertDocumentWithLibreOfficeNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeClientInput>
    }
    return ConvertDocumentWithLibreOfficeNodeClientInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeExternalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeExternalInput>

export const ConvertDocumentWithLibreOfficeNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeExternalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeExternalInputModel) {
      ConvertDocumentWithLibreOfficeNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeExternalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeExternalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeInput>

export const ConvertDocumentWithLibreOfficeNodeInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeInputModel) {
      ConvertDocumentWithLibreOfficeNodeInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithLibreOfficeNodeInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalExternalInput>

export const ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalExternalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel) {
      ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel =
        z.object({
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => LibreOfficeInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => LibreOfficeOutputFormatParser()),
          }),
          pathScope: z.optional(z.string()),
        }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalExternalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeLocalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInput>

export const ConvertDocumentWithLibreOfficeNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeLocalInputModel) {
      ConvertDocumentWithLibreOfficeNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeLocalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInternalInput>

export const ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInternalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel) {
      ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel =
        z.object({
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => LibreOfficeInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentParser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => LibreOfficeOutputFormatParser()),
            directory: z.optional(
              z.lazy(() => LocalOutputPathParser()),
            ),
          }),
          pathScope: z.optional(z.string()),
        }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInternalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeOutputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeOutput>

export const ConvertDocumentWithLibreOfficeNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeOutput> => {
    if (!ConvertDocumentWithLibreOfficeNodeOutputModel) {
      ConvertDocumentWithLibreOfficeNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeOutput>
    }
    return ConvertDocumentWithLibreOfficeNodeOutputModel!
  }

let ConvertDocumentWithLibreOfficeNodeRemoteInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeRemoteInput>

export const ConvertDocumentWithLibreOfficeNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeRemoteInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeRemoteInputModel) {
      ConvertDocumentWithLibreOfficeNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
          directory: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeRemoteInput>
    }
    return ConvertDocumentWithLibreOfficeNodeRemoteInputModel!
  }

let ConvertDocumentWithPandocNodeClientInputModel: z.ZodType<ConvertDocumentWithPandocNodeClientInput>

export const ConvertDocumentWithPandocNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeClientInput> => {
    if (!ConvertDocumentWithPandocNodeClientInputModel) {
      ConvertDocumentWithPandocNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocNodeClientInput>
    }
    return ConvertDocumentWithPandocNodeClientInputModel!
  }

let ConvertDocumentWithPandocNodeExternalInputModel: z.ZodType<ConvertDocumentWithPandocNodeExternalInput>

export const ConvertDocumentWithPandocNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeExternalInput> => {
    if (!ConvertDocumentWithPandocNodeExternalInputModel) {
      ConvertDocumentWithPandocNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocNodeExternalInput>
    }
    return ConvertDocumentWithPandocNodeExternalInputModel!
  }

let ConvertDocumentWithPandocNodeInputModel: z.ZodType<ConvertDocumentWithPandocNodeInput>

export const ConvertDocumentWithPandocNodeInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeInput> => {
    if (!ConvertDocumentWithPandocNodeInputModel) {
      ConvertDocumentWithPandocNodeInputModel = z.union([
        z.lazy(() => ConvertDocumentWithPandocNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertDocumentWithPandocNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithPandocNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithPandocNodeInputModel!
  }

let ConvertDocumentWithPandocNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithPandocNodeLocalExternalInput>

export const ConvertDocumentWithPandocNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeLocalExternalInput> => {
    if (!ConvertDocumentWithPandocNodeLocalExternalInputModel) {
      ConvertDocumentWithPandocNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeLocalExternalInput>
    }
    return ConvertDocumentWithPandocNodeLocalExternalInputModel!
  }

let ConvertDocumentWithPandocNodeLocalInputModel: z.ZodType<ConvertDocumentWithPandocNodeLocalInput>

export const ConvertDocumentWithPandocNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeLocalInput> => {
    if (!ConvertDocumentWithPandocNodeLocalInputModel) {
      ConvertDocumentWithPandocNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeLocalInput>
    }
    return ConvertDocumentWithPandocNodeLocalInputModel!
  }

let ConvertDocumentWithPandocNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithPandocNodeLocalInternalInput>

export const ConvertDocumentWithPandocNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeLocalInternalInput> => {
    if (!ConvertDocumentWithPandocNodeLocalInternalInputModel) {
      ConvertDocumentWithPandocNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeLocalInternalInput>
    }
    return ConvertDocumentWithPandocNodeLocalInternalInputModel!
  }

let ConvertDocumentWithPandocNodeOutputModel: z.ZodType<ConvertDocumentWithPandocNodeOutput>

export const ConvertDocumentWithPandocNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeOutput> => {
    if (!ConvertDocumentWithPandocNodeOutputModel) {
      ConvertDocumentWithPandocNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeOutput>
    }
    return ConvertDocumentWithPandocNodeOutputModel!
  }

let ConvertDocumentWithPandocNodeRemoteInputModel: z.ZodType<ConvertDocumentWithPandocNodeRemoteInput>

export const ConvertDocumentWithPandocNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeRemoteInput> => {
    if (!ConvertDocumentWithPandocNodeRemoteInputModel) {
      ConvertDocumentWithPandocNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeRemoteInput>
    }
    return ConvertDocumentWithPandocNodeRemoteInputModel!
  }

let ConvertFontWithFontForgeNodeClientInputModel: z.ZodType<ConvertFontWithFontForgeNodeClientInput>

export const ConvertFontWithFontForgeNodeClientInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeClientInput> => {
    if (!ConvertFontWithFontForgeNodeClientInputModel) {
      ConvertFontWithFontForgeNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeNodeClientInput>
    }
    return ConvertFontWithFontForgeNodeClientInputModel!
  }

let ConvertFontWithFontForgeNodeExternalInputModel: z.ZodType<ConvertFontWithFontForgeNodeExternalInput>

export const ConvertFontWithFontForgeNodeExternalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeExternalInput> => {
    if (!ConvertFontWithFontForgeNodeExternalInputModel) {
      ConvertFontWithFontForgeNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeNodeExternalInput>
    }
    return ConvertFontWithFontForgeNodeExternalInputModel!
  }

let ConvertFontWithFontForgeNodeInputModel: z.ZodType<ConvertFontWithFontForgeNodeInput>

export const ConvertFontWithFontForgeNodeInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeInput> => {
    if (!ConvertFontWithFontForgeNodeInputModel) {
      ConvertFontWithFontForgeNodeInputModel = z.union([
        z.lazy(() => ConvertFontWithFontForgeNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertFontWithFontForgeNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertFontWithFontForgeNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertFontWithFontForgeNodeInputModel!
  }

let ConvertFontWithFontForgeNodeLocalExternalInputModel: z.ZodType<ConvertFontWithFontForgeNodeLocalExternalInput>

export const ConvertFontWithFontForgeNodeLocalExternalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeLocalExternalInput> => {
    if (!ConvertFontWithFontForgeNodeLocalExternalInputModel) {
      ConvertFontWithFontForgeNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeLocalExternalInput>
    }
    return ConvertFontWithFontForgeNodeLocalExternalInputModel!
  }

let ConvertFontWithFontForgeNodeLocalInputModel: z.ZodType<ConvertFontWithFontForgeNodeLocalInput>

export const ConvertFontWithFontForgeNodeLocalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeLocalInput> => {
    if (!ConvertFontWithFontForgeNodeLocalInputModel) {
      ConvertFontWithFontForgeNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeLocalInput>
    }
    return ConvertFontWithFontForgeNodeLocalInputModel!
  }

let ConvertFontWithFontForgeNodeLocalInternalInputModel: z.ZodType<ConvertFontWithFontForgeNodeLocalInternalInput>

export const ConvertFontWithFontForgeNodeLocalInternalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeLocalInternalInput> => {
    if (!ConvertFontWithFontForgeNodeLocalInternalInputModel) {
      ConvertFontWithFontForgeNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeLocalInternalInput>
    }
    return ConvertFontWithFontForgeNodeLocalInternalInputModel!
  }

let ConvertFontWithFontForgeNodeOutputModel: z.ZodType<ConvertFontWithFontForgeNodeOutput>

export const ConvertFontWithFontForgeNodeOutputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeOutput> => {
    if (!ConvertFontWithFontForgeNodeOutputModel) {
      ConvertFontWithFontForgeNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeOutput>
    }
    return ConvertFontWithFontForgeNodeOutputModel!
  }

let ConvertFontWithFontForgeNodeRemoteInputModel: z.ZodType<ConvertFontWithFontForgeNodeRemoteInput>

export const ConvertFontWithFontForgeNodeRemoteInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeRemoteInput> => {
    if (!ConvertFontWithFontForgeNodeRemoteInputModel) {
      ConvertFontWithFontForgeNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeRemoteInput>
    }
    return ConvertFontWithFontForgeNodeRemoteInputModel!
  }

let ConvertHtmlWithPuppeteerNodeClientInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeClientInput>

export const ConvertHtmlWithPuppeteerNodeClientInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeClientInput> => {
    if (!ConvertHtmlWithPuppeteerNodeClientInputModel) {
      ConvertHtmlWithPuppeteerNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeClientInput>
    }
    return ConvertHtmlWithPuppeteerNodeClientInputModel!
  }

let ConvertHtmlWithPuppeteerNodeExternalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeExternalInput>

export const ConvertHtmlWithPuppeteerNodeExternalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeExternalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeExternalInputModel) {
      ConvertHtmlWithPuppeteerNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeExternalInput>
    }
    return ConvertHtmlWithPuppeteerNodeExternalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeInput>

export const ConvertHtmlWithPuppeteerNodeInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeInput> => {
    if (!ConvertHtmlWithPuppeteerNodeInputModel) {
      ConvertHtmlWithPuppeteerNodeInputModel = z.union([
        z.lazy(() => ConvertHtmlWithPuppeteerNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertHtmlWithPuppeteerNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertHtmlWithPuppeteerNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertHtmlWithPuppeteerNodeInputModel!
  }

let ConvertHtmlWithPuppeteerNodeLocalExternalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeLocalExternalInput>

export const ConvertHtmlWithPuppeteerNodeLocalExternalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeLocalExternalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeLocalExternalInputModel) {
      ConvertHtmlWithPuppeteerNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeLocalExternalInput>
    }
    return ConvertHtmlWithPuppeteerNodeLocalExternalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeLocalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInput>

export const ConvertHtmlWithPuppeteerNodeLocalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeLocalInputModel) {
      ConvertHtmlWithPuppeteerNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInput>
    }
    return ConvertHtmlWithPuppeteerNodeLocalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeLocalInternalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInternalInput>

export const ConvertHtmlWithPuppeteerNodeLocalInternalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInternalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeLocalInternalInputModel) {
      ConvertHtmlWithPuppeteerNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInternalInput>
    }
    return ConvertHtmlWithPuppeteerNodeLocalInternalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeOutputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeOutput>

export const ConvertHtmlWithPuppeteerNodeOutputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeOutput> => {
    if (!ConvertHtmlWithPuppeteerNodeOutputModel) {
      ConvertHtmlWithPuppeteerNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeOutput>
    }
    return ConvertHtmlWithPuppeteerNodeOutputModel!
  }

let ConvertHtmlWithPuppeteerNodeRemoteInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeRemoteInput>

export const ConvertHtmlWithPuppeteerNodeRemoteInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeRemoteInput> => {
    if (!ConvertHtmlWithPuppeteerNodeRemoteInputModel) {
      ConvertHtmlWithPuppeteerNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeRemoteInput>
    }
    return ConvertHtmlWithPuppeteerNodeRemoteInputModel!
  }

let ConvertImageWithImageMagickNodeClientInputModel: z.ZodType<ConvertImageWithImageMagickNodeClientInput>

export const ConvertImageWithImageMagickNodeClientInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeClientInput> => {
    if (!ConvertImageWithImageMagickNodeClientInputModel) {
      ConvertImageWithImageMagickNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeClientInput>
    }
    return ConvertImageWithImageMagickNodeClientInputModel!
  }

let ConvertImageWithImageMagickNodeExternalInputModel: z.ZodType<ConvertImageWithImageMagickNodeExternalInput>

export const ConvertImageWithImageMagickNodeExternalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeExternalInput> => {
    if (!ConvertImageWithImageMagickNodeExternalInputModel) {
      ConvertImageWithImageMagickNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeExternalInput>
    }
    return ConvertImageWithImageMagickNodeExternalInputModel!
  }

let ConvertImageWithImageMagickNodeInputModel: z.ZodType<ConvertImageWithImageMagickNodeInput>

export const ConvertImageWithImageMagickNodeInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeInput> => {
    if (!ConvertImageWithImageMagickNodeInputModel) {
      ConvertImageWithImageMagickNodeInputModel = z.union([
        z.lazy(() =>
          ConvertImageWithImageMagickNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithImageMagickNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithImageMagickNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertImageWithImageMagickNodeInputModel!
  }

let ConvertImageWithImageMagickNodeLocalExternalInputModel: z.ZodType<ConvertImageWithImageMagickNodeLocalExternalInput>

export const ConvertImageWithImageMagickNodeLocalExternalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeLocalExternalInput> => {
    if (!ConvertImageWithImageMagickNodeLocalExternalInputModel) {
      ConvertImageWithImageMagickNodeLocalExternalInputModel = z.object(
        {
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => ImageMagickInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => ImageMagickOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
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
        },
      ) as z.ZodType<ConvertImageWithImageMagickNodeLocalExternalInput>
    }
    return ConvertImageWithImageMagickNodeLocalExternalInputModel!
  }

let ConvertImageWithImageMagickNodeLocalInputModel: z.ZodType<ConvertImageWithImageMagickNodeLocalInput>

export const ConvertImageWithImageMagickNodeLocalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeLocalInput> => {
    if (!ConvertImageWithImageMagickNodeLocalInputModel) {
      ConvertImageWithImageMagickNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeLocalInput>
    }
    return ConvertImageWithImageMagickNodeLocalInputModel!
  }

let ConvertImageWithImageMagickNodeLocalInternalInputModel: z.ZodType<ConvertImageWithImageMagickNodeLocalInternalInput>

export const ConvertImageWithImageMagickNodeLocalInternalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeLocalInternalInput> => {
    if (!ConvertImageWithImageMagickNodeLocalInternalInputModel) {
      ConvertImageWithImageMagickNodeLocalInternalInputModel = z.object(
        {
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => ImageMagickInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => ImageMagickOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
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
        },
      ) as z.ZodType<ConvertImageWithImageMagickNodeLocalInternalInput>
    }
    return ConvertImageWithImageMagickNodeLocalInternalInputModel!
  }

let ConvertImageWithImageMagickNodeOutputModel: z.ZodType<ConvertImageWithImageMagickNodeOutput>

export const ConvertImageWithImageMagickNodeOutputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeOutput> => {
    if (!ConvertImageWithImageMagickNodeOutputModel) {
      ConvertImageWithImageMagickNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertImageWithImageMagickNodeOutput>
    }
    return ConvertImageWithImageMagickNodeOutputModel!
  }

let ConvertImageWithImageMagickNodeRemoteInputModel: z.ZodType<ConvertImageWithImageMagickNodeRemoteInput>

export const ConvertImageWithImageMagickNodeRemoteInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeRemoteInput> => {
    if (!ConvertImageWithImageMagickNodeRemoteInputModel) {
      ConvertImageWithImageMagickNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeRemoteInput>
    }
    return ConvertImageWithImageMagickNodeRemoteInputModel!
  }

let ConvertImageWithInkscapeNodeClientInputModel: z.ZodType<ConvertImageWithInkscapeNodeClientInput>

export const ConvertImageWithInkscapeNodeClientInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeClientInput> => {
    if (!ConvertImageWithInkscapeNodeClientInputModel) {
      ConvertImageWithInkscapeNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeNodeClientInput>
    }
    return ConvertImageWithInkscapeNodeClientInputModel!
  }

let ConvertImageWithInkscapeNodeExternalInputModel: z.ZodType<ConvertImageWithInkscapeNodeExternalInput>

export const ConvertImageWithInkscapeNodeExternalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeExternalInput> => {
    if (!ConvertImageWithInkscapeNodeExternalInputModel) {
      ConvertImageWithInkscapeNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeNodeExternalInput>
    }
    return ConvertImageWithInkscapeNodeExternalInputModel!
  }

let ConvertImageWithInkscapeNodeInputModel: z.ZodType<ConvertImageWithInkscapeNodeInput>

export const ConvertImageWithInkscapeNodeInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeInput> => {
    if (!ConvertImageWithInkscapeNodeInputModel) {
      ConvertImageWithInkscapeNodeInputModel = z.union([
        z.lazy(() => ConvertImageWithInkscapeNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertImageWithInkscapeNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithInkscapeNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertImageWithInkscapeNodeInputModel!
  }

let ConvertImageWithInkscapeNodeLocalExternalInputModel: z.ZodType<ConvertImageWithInkscapeNodeLocalExternalInput>

export const ConvertImageWithInkscapeNodeLocalExternalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeLocalExternalInput> => {
    if (!ConvertImageWithInkscapeNodeLocalExternalInputModel) {
      ConvertImageWithInkscapeNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeLocalExternalInput>
    }
    return ConvertImageWithInkscapeNodeLocalExternalInputModel!
  }

let ConvertImageWithInkscapeNodeLocalInputModel: z.ZodType<ConvertImageWithInkscapeNodeLocalInput>

export const ConvertImageWithInkscapeNodeLocalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeLocalInput> => {
    if (!ConvertImageWithInkscapeNodeLocalInputModel) {
      ConvertImageWithInkscapeNodeLocalInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeLocalInput>
    }
    return ConvertImageWithInkscapeNodeLocalInputModel!
  }

let ConvertImageWithInkscapeNodeLocalInternalInputModel: z.ZodType<ConvertImageWithInkscapeNodeLocalInternalInput>

export const ConvertImageWithInkscapeNodeLocalInternalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeLocalInternalInput> => {
    if (!ConvertImageWithInkscapeNodeLocalInternalInputModel) {
      ConvertImageWithInkscapeNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeLocalInternalInput>
    }
    return ConvertImageWithInkscapeNodeLocalInternalInputModel!
  }

let ConvertImageWithInkscapeNodeOutputModel: z.ZodType<ConvertImageWithInkscapeNodeOutput>

export const ConvertImageWithInkscapeNodeOutputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeOutput> => {
    if (!ConvertImageWithInkscapeNodeOutputModel) {
      ConvertImageWithInkscapeNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeOutput>
    }
    return ConvertImageWithInkscapeNodeOutputModel!
  }

let ConvertImageWithInkscapeNodeRemoteInputModel: z.ZodType<ConvertImageWithInkscapeNodeRemoteInput>

export const ConvertImageWithInkscapeNodeRemoteInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeRemoteInput> => {
    if (!ConvertImageWithInkscapeNodeRemoteInputModel) {
      ConvertImageWithInkscapeNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeRemoteInput>
    }
    return ConvertImageWithInkscapeNodeRemoteInputModel!
  }

let ConvertLatexToPngNodeClientInputModel: z.ZodType<ConvertLatexToPngNodeClientInput>

export const ConvertLatexToPngNodeClientInputParser =
  (): z.ZodType<ConvertLatexToPngNodeClientInput> => {
    if (!ConvertLatexToPngNodeClientInputModel) {
      ConvertLatexToPngNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngNodeClientInput>
    }
    return ConvertLatexToPngNodeClientInputModel!
  }

let ConvertLatexToPngNodeExternalInputModel: z.ZodType<ConvertLatexToPngNodeExternalInput>

export const ConvertLatexToPngNodeExternalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeExternalInput> => {
    if (!ConvertLatexToPngNodeExternalInputModel) {
      ConvertLatexToPngNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngNodeExternalInput>
    }
    return ConvertLatexToPngNodeExternalInputModel!
  }

let ConvertLatexToPngNodeInputModel: z.ZodType<ConvertLatexToPngNodeInput>

export const ConvertLatexToPngNodeInputParser =
  (): z.ZodType<ConvertLatexToPngNodeInput> => {
    if (!ConvertLatexToPngNodeInputModel) {
      ConvertLatexToPngNodeInputModel = z.union([
        z.lazy(() => ConvertLatexToPngNodeRemoteInputParser()),
        z.lazy(() => ConvertLatexToPngNodeLocalExternalInputParser()),
        z.lazy(() => ConvertLatexToPngNodeLocalInternalInputParser()),
      ])
    }
    return ConvertLatexToPngNodeInputModel!
  }

let ConvertLatexToPngNodeLocalExternalInputModel: z.ZodType<ConvertLatexToPngNodeLocalExternalInput>

export const ConvertLatexToPngNodeLocalExternalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeLocalExternalInput> => {
    if (!ConvertLatexToPngNodeLocalExternalInputModel) {
      ConvertLatexToPngNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeLocalExternalInput>
    }
    return ConvertLatexToPngNodeLocalExternalInputModel!
  }

let ConvertLatexToPngNodeLocalInputModel: z.ZodType<ConvertLatexToPngNodeLocalInput>

export const ConvertLatexToPngNodeLocalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeLocalInput> => {
    if (!ConvertLatexToPngNodeLocalInputModel) {
      ConvertLatexToPngNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeLocalInput>
    }
    return ConvertLatexToPngNodeLocalInputModel!
  }

let ConvertLatexToPngNodeLocalInternalInputModel: z.ZodType<ConvertLatexToPngNodeLocalInternalInput>

export const ConvertLatexToPngNodeLocalInternalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeLocalInternalInput> => {
    if (!ConvertLatexToPngNodeLocalInternalInputModel) {
      ConvertLatexToPngNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeLocalInternalInput>
    }
    return ConvertLatexToPngNodeLocalInternalInputModel!
  }

let ConvertLatexToPngNodeOutputModel: z.ZodType<ConvertLatexToPngNodeOutput>

export const ConvertLatexToPngNodeOutputParser =
  (): z.ZodType<ConvertLatexToPngNodeOutput> => {
    if (!ConvertLatexToPngNodeOutputModel) {
      ConvertLatexToPngNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertLatexToPngNodeOutput>
    }
    return ConvertLatexToPngNodeOutputModel!
  }

let ConvertLatexToPngNodeRemoteInputModel: z.ZodType<ConvertLatexToPngNodeRemoteInput>

export const ConvertLatexToPngNodeRemoteInputParser =
  (): z.ZodType<ConvertLatexToPngNodeRemoteInput> => {
    if (!ConvertLatexToPngNodeRemoteInputModel) {
      ConvertLatexToPngNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeRemoteInput>
    }
    return ConvertLatexToPngNodeRemoteInputModel!
  }

let ConvertLatexWithPdfLatexNodeClientInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeClientInput>

export const ConvertLatexWithPdfLatexNodeClientInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeClientInput> => {
    if (!ConvertLatexWithPdfLatexNodeClientInputModel) {
      ConvertLatexWithPdfLatexNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeClientInput>
    }
    return ConvertLatexWithPdfLatexNodeClientInputModel!
  }

let ConvertLatexWithPdfLatexNodeExternalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeExternalInput>

export const ConvertLatexWithPdfLatexNodeExternalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeExternalInput> => {
    if (!ConvertLatexWithPdfLatexNodeExternalInputModel) {
      ConvertLatexWithPdfLatexNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeExternalInput>
    }
    return ConvertLatexWithPdfLatexNodeExternalInputModel!
  }

let ConvertLatexWithPdfLatexNodeInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeInput>

export const ConvertLatexWithPdfLatexNodeInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeInput> => {
    if (!ConvertLatexWithPdfLatexNodeInputModel) {
      ConvertLatexWithPdfLatexNodeInputModel = z.union([
        z.lazy(() => ConvertLatexWithPdfLatexNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertLatexWithPdfLatexNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertLatexWithPdfLatexNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertLatexWithPdfLatexNodeInputModel!
  }

let ConvertLatexWithPdfLatexNodeLocalExternalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeLocalExternalInput>

export const ConvertLatexWithPdfLatexNodeLocalExternalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeLocalExternalInput> => {
    if (!ConvertLatexWithPdfLatexNodeLocalExternalInputModel) {
      ConvertLatexWithPdfLatexNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeLocalExternalInput>
    }
    return ConvertLatexWithPdfLatexNodeLocalExternalInputModel!
  }

let ConvertLatexWithPdfLatexNodeLocalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeLocalInput>

export const ConvertLatexWithPdfLatexNodeLocalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeLocalInput> => {
    if (!ConvertLatexWithPdfLatexNodeLocalInputModel) {
      ConvertLatexWithPdfLatexNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeLocalInput>
    }
    return ConvertLatexWithPdfLatexNodeLocalInputModel!
  }

let ConvertLatexWithPdfLatexNodeLocalInternalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeLocalInternalInput>

export const ConvertLatexWithPdfLatexNodeLocalInternalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeLocalInternalInput> => {
    if (!ConvertLatexWithPdfLatexNodeLocalInternalInputModel) {
      ConvertLatexWithPdfLatexNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeLocalInternalInput>
    }
    return ConvertLatexWithPdfLatexNodeLocalInternalInputModel!
  }

let ConvertLatexWithPdfLatexNodeOutputModel: z.ZodType<ConvertLatexWithPdfLatexNodeOutput>

export const ConvertLatexWithPdfLatexNodeOutputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeOutput> => {
    if (!ConvertLatexWithPdfLatexNodeOutputModel) {
      ConvertLatexWithPdfLatexNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeOutput>
    }
    return ConvertLatexWithPdfLatexNodeOutputModel!
  }

let ConvertLatexWithPdfLatexNodeRemoteInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeRemoteInput>

export const ConvertLatexWithPdfLatexNodeRemoteInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeRemoteInput> => {
    if (!ConvertLatexWithPdfLatexNodeRemoteInputModel) {
      ConvertLatexWithPdfLatexNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeRemoteInput>
    }
    return ConvertLatexWithPdfLatexNodeRemoteInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeClientInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeClientInput>

export const ConvertMarkdownWithPuppeteerNodeClientInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeClientInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeClientInputModel) {
      ConvertMarkdownWithPuppeteerNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeClientInput>
    }
    return ConvertMarkdownWithPuppeteerNodeClientInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeExternalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeExternalInput>

export const ConvertMarkdownWithPuppeteerNodeExternalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeExternalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeExternalInputModel) {
      ConvertMarkdownWithPuppeteerNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeExternalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeExternalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeInput>

export const ConvertMarkdownWithPuppeteerNodeInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeInputModel) {
      ConvertMarkdownWithPuppeteerNodeInputModel = z.union([
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertMarkdownWithPuppeteerNodeInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalExternalInput>

export const ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalExternalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel) {
      ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel =
        z.object({
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => PuppeteerOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
          viewport: z.optional(
            z.object({
              width: z.optional(z.number().int().gte(0)),
              height: z.optional(z.number().int().gte(0)),
            }),
          ),
          proxy: z.optional(z.string()),
          waitUntil: z.optional(
            z.lazy(() => PuppeteerLifeCycleEventParser()),
          ),
          style: z.optional(
            z.object({
              margin: z.optional(
                z.object({
                  x: z.optional(z.number().int().gte(0)),
                  y: z.optional(z.number().int().gte(0)),
                }),
              ),
              h1: z.optional(z.lazy(() => TextStyleParser())),
              h2: z.optional(z.lazy(() => TextStyleParser())),
              h3: z.optional(z.lazy(() => TextStyleParser())),
              h4: z.optional(z.lazy(() => TextStyleParser())),
              h5: z.optional(z.lazy(() => TextStyleParser())),
              h6: z.optional(z.lazy(() => TextStyleParser())),
              text: z.optional(z.lazy(() => TextStyleParser())),
              link: z.optional(z.lazy(() => TextStyleParser())),
            }),
          ),
        }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalExternalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeLocalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInput>

export const ConvertMarkdownWithPuppeteerNodeLocalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeLocalInputModel) {
      ConvertMarkdownWithPuppeteerNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.object({
            content: z.instanceof(ArrayBuffer),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeLocalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInternalInput>

export const ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInternalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel) {
      ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel =
        z.object({
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => PuppeteerOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
          viewport: z.optional(
            z.object({
              width: z.optional(z.number().int().gte(0)),
              height: z.optional(z.number().int().gte(0)),
            }),
          ),
          proxy: z.optional(z.string()),
          waitUntil: z.optional(
            z.lazy(() => PuppeteerLifeCycleEventParser()),
          ),
          style: z.optional(
            z.object({
              margin: z.optional(
                z.object({
                  x: z.optional(z.number().int().gte(0)),
                  y: z.optional(z.number().int().gte(0)),
                }),
              ),
              h1: z.optional(z.lazy(() => TextStyleParser())),
              h2: z.optional(z.lazy(() => TextStyleParser())),
              h3: z.optional(z.lazy(() => TextStyleParser())),
              h4: z.optional(z.lazy(() => TextStyleParser())),
              h5: z.optional(z.lazy(() => TextStyleParser())),
              h6: z.optional(z.lazy(() => TextStyleParser())),
              text: z.optional(z.lazy(() => TextStyleParser())),
              link: z.optional(z.lazy(() => TextStyleParser())),
            }),
          ),
        }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInternalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeOutputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeOutput>

export const ConvertMarkdownWithPuppeteerNodeOutputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeOutput> => {
    if (!ConvertMarkdownWithPuppeteerNodeOutputModel) {
      ConvertMarkdownWithPuppeteerNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeOutput>
    }
    return ConvertMarkdownWithPuppeteerNodeOutputModel!
  }

let ConvertMarkdownWithPuppeteerNodeRemoteInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeRemoteInput>

export const ConvertMarkdownWithPuppeteerNodeRemoteInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeRemoteInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeRemoteInputModel) {
      ConvertMarkdownWithPuppeteerNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeRemoteInput>
    }
    return ConvertMarkdownWithPuppeteerNodeRemoteInputModel!
  }

let ConvertTxtWithPuppeteerNodeClientInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeClientInput>

export const ConvertTxtWithPuppeteerNodeClientInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeClientInput> => {
    if (!ConvertTxtWithPuppeteerNodeClientInputModel) {
      ConvertTxtWithPuppeteerNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeClientInput>
    }
    return ConvertTxtWithPuppeteerNodeClientInputModel!
  }

let ConvertTxtWithPuppeteerNodeExternalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeExternalInput>

export const ConvertTxtWithPuppeteerNodeExternalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeExternalInput> => {
    if (!ConvertTxtWithPuppeteerNodeExternalInputModel) {
      ConvertTxtWithPuppeteerNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeExternalInput>
    }
    return ConvertTxtWithPuppeteerNodeExternalInputModel!
  }

let ConvertTxtWithPuppeteerNodeInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeInput>

export const ConvertTxtWithPuppeteerNodeInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeInput> => {
    if (!ConvertTxtWithPuppeteerNodeInputModel) {
      ConvertTxtWithPuppeteerNodeInputModel = z.union([
        z.lazy(() => ConvertTxtWithPuppeteerNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertTxtWithPuppeteerNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertTxtWithPuppeteerNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertTxtWithPuppeteerNodeInputModel!
  }

let ConvertTxtWithPuppeteerNodeLocalExternalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeLocalExternalInput>

export const ConvertTxtWithPuppeteerNodeLocalExternalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeLocalExternalInput> => {
    if (!ConvertTxtWithPuppeteerNodeLocalExternalInputModel) {
      ConvertTxtWithPuppeteerNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeLocalExternalInput>
    }
    return ConvertTxtWithPuppeteerNodeLocalExternalInputModel!
  }

let ConvertTxtWithPuppeteerNodeLocalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeLocalInput>

export const ConvertTxtWithPuppeteerNodeLocalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeLocalInput> => {
    if (!ConvertTxtWithPuppeteerNodeLocalInputModel) {
      ConvertTxtWithPuppeteerNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.object({
            content: z.instanceof(ArrayBuffer),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeLocalInput>
    }
    return ConvertTxtWithPuppeteerNodeLocalInputModel!
  }

let ConvertTxtWithPuppeteerNodeLocalInternalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeLocalInternalInput>

export const ConvertTxtWithPuppeteerNodeLocalInternalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeLocalInternalInput> => {
    if (!ConvertTxtWithPuppeteerNodeLocalInternalInputModel) {
      ConvertTxtWithPuppeteerNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeLocalInternalInput>
    }
    return ConvertTxtWithPuppeteerNodeLocalInternalInputModel!
  }

let ConvertTxtWithPuppeteerNodeOutputModel: z.ZodType<ConvertTxtWithPuppeteerNodeOutput>

export const ConvertTxtWithPuppeteerNodeOutputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeOutput> => {
    if (!ConvertTxtWithPuppeteerNodeOutputModel) {
      ConvertTxtWithPuppeteerNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeOutput>
    }
    return ConvertTxtWithPuppeteerNodeOutputModel!
  }

let ConvertTxtWithPuppeteerNodeRemoteInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeRemoteInput>

export const ConvertTxtWithPuppeteerNodeRemoteInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeRemoteInput> => {
    if (!ConvertTxtWithPuppeteerNodeRemoteInputModel) {
      ConvertTxtWithPuppeteerNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeRemoteInput>
    }
    return ConvertTxtWithPuppeteerNodeRemoteInputModel!
  }

let ConvertVideoWithFfmpegNodeClientInputModel: z.ZodType<ConvertVideoWithFfmpegNodeClientInput>

export const ConvertVideoWithFfmpegNodeClientInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeClientInput> => {
    if (!ConvertVideoWithFfmpegNodeClientInputModel) {
      ConvertVideoWithFfmpegNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeClientInput>
    }
    return ConvertVideoWithFfmpegNodeClientInputModel!
  }

let ConvertVideoWithFfmpegNodeExternalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeExternalInput>

export const ConvertVideoWithFfmpegNodeExternalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeExternalInput> => {
    if (!ConvertVideoWithFfmpegNodeExternalInputModel) {
      ConvertVideoWithFfmpegNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeExternalInput>
    }
    return ConvertVideoWithFfmpegNodeExternalInputModel!
  }

let ConvertVideoWithFfmpegNodeInputModel: z.ZodType<ConvertVideoWithFfmpegNodeInput>

export const ConvertVideoWithFfmpegNodeInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeInput> => {
    if (!ConvertVideoWithFfmpegNodeInputModel) {
      ConvertVideoWithFfmpegNodeInputModel = z.union([
        z.lazy(() => ConvertVideoWithFfmpegNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertVideoWithFfmpegNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertVideoWithFfmpegNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertVideoWithFfmpegNodeInputModel!
  }

let ConvertVideoWithFfmpegNodeLocalExternalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeLocalExternalInput>

export const ConvertVideoWithFfmpegNodeLocalExternalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeLocalExternalInput> => {
    if (!ConvertVideoWithFfmpegNodeLocalExternalInputModel) {
      ConvertVideoWithFfmpegNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeLocalExternalInput>
    }
    return ConvertVideoWithFfmpegNodeLocalExternalInputModel!
  }

let ConvertVideoWithFfmpegNodeLocalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeLocalInput>

export const ConvertVideoWithFfmpegNodeLocalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeLocalInput> => {
    if (!ConvertVideoWithFfmpegNodeLocalInputModel) {
      ConvertVideoWithFfmpegNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeLocalInput>
    }
    return ConvertVideoWithFfmpegNodeLocalInputModel!
  }

let ConvertVideoWithFfmpegNodeLocalInternalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeLocalInternalInput>

export const ConvertVideoWithFfmpegNodeLocalInternalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeLocalInternalInput> => {
    if (!ConvertVideoWithFfmpegNodeLocalInternalInputModel) {
      ConvertVideoWithFfmpegNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeLocalInternalInput>
    }
    return ConvertVideoWithFfmpegNodeLocalInternalInputModel!
  }

let ConvertVideoWithFfmpegNodeOutputModel: z.ZodType<ConvertVideoWithFfmpegNodeOutput>

export const ConvertVideoWithFfmpegNodeOutputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeOutput> => {
    if (!ConvertVideoWithFfmpegNodeOutputModel) {
      ConvertVideoWithFfmpegNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertVideoWithFfmpegNodeOutput>
    }
    return ConvertVideoWithFfmpegNodeOutputModel!
  }

let ConvertVideoWithFfmpegNodeRemoteInputModel: z.ZodType<ConvertVideoWithFfmpegNodeRemoteInput>

export const ConvertVideoWithFfmpegNodeRemoteInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeRemoteInput> => {
    if (!ConvertVideoWithFfmpegNodeRemoteInputModel) {
      ConvertVideoWithFfmpegNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeRemoteInput>
    }
    return ConvertVideoWithFfmpegNodeRemoteInputModel!
  }

let FormatAssemblyNodeClientInputModel: z.ZodType<FormatAssemblyNodeClientInput>

export const FormatAssemblyNodeClientInputParser =
  (): z.ZodType<FormatAssemblyNodeClientInput> => {
    if (!FormatAssemblyNodeClientInputModel) {
      FormatAssemblyNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatAssemblyNodeClientInput>
    }
    return FormatAssemblyNodeClientInputModel!
  }

let FormatAssemblyNodeExternalInputModel: z.ZodType<FormatAssemblyNodeExternalInput>

export const FormatAssemblyNodeExternalInputParser =
  (): z.ZodType<FormatAssemblyNodeExternalInput> => {
    if (!FormatAssemblyNodeExternalInputModel) {
      FormatAssemblyNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatAssemblyNodeExternalInput>
    }
    return FormatAssemblyNodeExternalInputModel!
  }

let FormatAssemblyNodeInputModel: z.ZodType<FormatAssemblyNodeInput>

export const FormatAssemblyNodeInputParser =
  (): z.ZodType<FormatAssemblyNodeInput> => {
    if (!FormatAssemblyNodeInputModel) {
      FormatAssemblyNodeInputModel = z.union([
        z.lazy(() => FormatAssemblyNodeRemoteInputParser()),
        z.lazy(() => FormatAssemblyNodeLocalExternalInputParser()),
        z.lazy(() => FormatAssemblyNodeLocalInternalInputParser()),
      ])
    }
    return FormatAssemblyNodeInputModel!
  }

let FormatAssemblyNodeLocalExternalInputModel: z.ZodType<FormatAssemblyNodeLocalExternalInput>

export const FormatAssemblyNodeLocalExternalInputParser =
  (): z.ZodType<FormatAssemblyNodeLocalExternalInput> => {
    if (!FormatAssemblyNodeLocalExternalInputModel) {
      FormatAssemblyNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeLocalExternalInput>
    }
    return FormatAssemblyNodeLocalExternalInputModel!
  }

let FormatAssemblyNodeLocalInputModel: z.ZodType<FormatAssemblyNodeLocalInput>

export const FormatAssemblyNodeLocalInputParser =
  (): z.ZodType<FormatAssemblyNodeLocalInput> => {
    if (!FormatAssemblyNodeLocalInputModel) {
      FormatAssemblyNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeLocalInput>
    }
    return FormatAssemblyNodeLocalInputModel!
  }

let FormatAssemblyNodeLocalInternalInputModel: z.ZodType<FormatAssemblyNodeLocalInternalInput>

export const FormatAssemblyNodeLocalInternalInputParser =
  (): z.ZodType<FormatAssemblyNodeLocalInternalInput> => {
    if (!FormatAssemblyNodeLocalInternalInputModel) {
      FormatAssemblyNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeLocalInternalInput>
    }
    return FormatAssemblyNodeLocalInternalInputModel!
  }

let FormatAssemblyNodeOutputModel: z.ZodType<FormatAssemblyNodeOutput>

export const FormatAssemblyNodeOutputParser =
  (): z.ZodType<FormatAssemblyNodeOutput> => {
    if (!FormatAssemblyNodeOutputModel) {
      FormatAssemblyNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatAssemblyNodeOutput>
    }
    return FormatAssemblyNodeOutputModel!
  }

let FormatAssemblyNodeRemoteInputModel: z.ZodType<FormatAssemblyNodeRemoteInput>

export const FormatAssemblyNodeRemoteInputParser =
  (): z.ZodType<FormatAssemblyNodeRemoteInput> => {
    if (!FormatAssemblyNodeRemoteInputModel) {
      FormatAssemblyNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeRemoteInput>
    }
    return FormatAssemblyNodeRemoteInputModel!
  }

let FormatCodeWithClangFormatNodeClientInputModel: z.ZodType<FormatCodeWithClangFormatNodeClientInput>

export const FormatCodeWithClangFormatNodeClientInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeClientInput> => {
    if (!FormatCodeWithClangFormatNodeClientInputModel) {
      FormatCodeWithClangFormatNodeClientInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('client'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatCodeWithClangFormatNodeClientInput>
    }
    return FormatCodeWithClangFormatNodeClientInputModel!
  }

let FormatCodeWithClangFormatNodeExternalInputModel: z.ZodType<FormatCodeWithClangFormatNodeExternalInput>

export const FormatCodeWithClangFormatNodeExternalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeExternalInput> => {
    if (!FormatCodeWithClangFormatNodeExternalInputModel) {
      FormatCodeWithClangFormatNodeExternalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('external'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatCodeWithClangFormatNodeExternalInput>
    }
    return FormatCodeWithClangFormatNodeExternalInputModel!
  }

let FormatCodeWithClangFormatNodeInputModel: z.ZodType<FormatCodeWithClangFormatNodeInput>

export const FormatCodeWithClangFormatNodeInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeInput> => {
    if (!FormatCodeWithClangFormatNodeInputModel) {
      FormatCodeWithClangFormatNodeInputModel = z.union([
        z.lazy(() => FormatCodeWithClangFormatNodeRemoteInputParser()),
        z.lazy(() =>
          FormatCodeWithClangFormatNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          FormatCodeWithClangFormatNodeLocalInternalInputParser(),
        ),
      ])
    }
    return FormatCodeWithClangFormatNodeInputModel!
  }

let FormatCodeWithClangFormatNodeLocalExternalInputModel: z.ZodType<FormatCodeWithClangFormatNodeLocalExternalInput>

export const FormatCodeWithClangFormatNodeLocalExternalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeLocalExternalInput> => {
    if (!FormatCodeWithClangFormatNodeLocalExternalInputModel) {
      FormatCodeWithClangFormatNodeLocalExternalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('external'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeLocalExternalInput>
    }
    return FormatCodeWithClangFormatNodeLocalExternalInputModel!
  }

let FormatCodeWithClangFormatNodeLocalInputModel: z.ZodType<FormatCodeWithClangFormatNodeLocalInput>

export const FormatCodeWithClangFormatNodeLocalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeLocalInput> => {
    if (!FormatCodeWithClangFormatNodeLocalInputModel) {
      FormatCodeWithClangFormatNodeLocalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeLocalInput>
    }
    return FormatCodeWithClangFormatNodeLocalInputModel!
  }

let FormatCodeWithClangFormatNodeLocalInternalInputModel: z.ZodType<FormatCodeWithClangFormatNodeLocalInternalInput>

export const FormatCodeWithClangFormatNodeLocalInternalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeLocalInternalInput> => {
    if (!FormatCodeWithClangFormatNodeLocalInternalInputModel) {
      FormatCodeWithClangFormatNodeLocalInternalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.optional(z.literal('internal')),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeLocalInternalInput>
    }
    return FormatCodeWithClangFormatNodeLocalInternalInputModel!
  }

let FormatCodeWithClangFormatNodeOutputModel: z.ZodType<FormatCodeWithClangFormatNodeOutput>

export const FormatCodeWithClangFormatNodeOutputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeOutput> => {
    if (!FormatCodeWithClangFormatNodeOutputModel) {
      FormatCodeWithClangFormatNodeOutputModel = (
        ClangStyleAllParser() as any
      ).extend({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeOutput>
    }
    return FormatCodeWithClangFormatNodeOutputModel!
  }

let FormatCodeWithClangFormatNodeRemoteInputModel: z.ZodType<FormatCodeWithClangFormatNodeRemoteInput>

export const FormatCodeWithClangFormatNodeRemoteInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeRemoteInput> => {
    if (!FormatCodeWithClangFormatNodeRemoteInputModel) {
      FormatCodeWithClangFormatNodeRemoteInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('remote'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeRemoteInput>
    }
    return FormatCodeWithClangFormatNodeRemoteInputModel!
  }

let FormatKotlinNodeClientInputModel: z.ZodType<FormatKotlinNodeClientInput>

export const FormatKotlinNodeClientInputParser =
  (): z.ZodType<FormatKotlinNodeClientInput> => {
    if (!FormatKotlinNodeClientInputModel) {
      FormatKotlinNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatKotlinNodeClientInput>
    }
    return FormatKotlinNodeClientInputModel!
  }

let FormatKotlinNodeExternalInputModel: z.ZodType<FormatKotlinNodeExternalInput>

export const FormatKotlinNodeExternalInputParser =
  (): z.ZodType<FormatKotlinNodeExternalInput> => {
    if (!FormatKotlinNodeExternalInputModel) {
      FormatKotlinNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatKotlinNodeExternalInput>
    }
    return FormatKotlinNodeExternalInputModel!
  }

let FormatKotlinNodeInputModel: z.ZodType<FormatKotlinNodeInput>

export const FormatKotlinNodeInputParser =
  (): z.ZodType<FormatKotlinNodeInput> => {
    if (!FormatKotlinNodeInputModel) {
      FormatKotlinNodeInputModel = z.union([
        z.lazy(() => FormatKotlinNodeRemoteInputParser()),
        z.lazy(() => FormatKotlinNodeLocalExternalInputParser()),
        z.lazy(() => FormatKotlinNodeLocalInternalInputParser()),
      ])
    }
    return FormatKotlinNodeInputModel!
  }

let FormatKotlinNodeLocalExternalInputModel: z.ZodType<FormatKotlinNodeLocalExternalInput>

export const FormatKotlinNodeLocalExternalInputParser =
  (): z.ZodType<FormatKotlinNodeLocalExternalInput> => {
    if (!FormatKotlinNodeLocalExternalInputModel) {
      FormatKotlinNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeLocalExternalInput>
    }
    return FormatKotlinNodeLocalExternalInputModel!
  }

let FormatKotlinNodeLocalInputModel: z.ZodType<FormatKotlinNodeLocalInput>

export const FormatKotlinNodeLocalInputParser =
  (): z.ZodType<FormatKotlinNodeLocalInput> => {
    if (!FormatKotlinNodeLocalInputModel) {
      FormatKotlinNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeLocalInput>
    }
    return FormatKotlinNodeLocalInputModel!
  }

let FormatKotlinNodeLocalInternalInputModel: z.ZodType<FormatKotlinNodeLocalInternalInput>

export const FormatKotlinNodeLocalInternalInputParser =
  (): z.ZodType<FormatKotlinNodeLocalInternalInput> => {
    if (!FormatKotlinNodeLocalInternalInputModel) {
      FormatKotlinNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeLocalInternalInput>
    }
    return FormatKotlinNodeLocalInternalInputModel!
  }

let FormatKotlinNodeOutputModel: z.ZodType<FormatKotlinNodeOutput>

export const FormatKotlinNodeOutputParser =
  (): z.ZodType<FormatKotlinNodeOutput> => {
    if (!FormatKotlinNodeOutputModel) {
      FormatKotlinNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatKotlinNodeOutput>
    }
    return FormatKotlinNodeOutputModel!
  }

let FormatKotlinNodeRemoteInputModel: z.ZodType<FormatKotlinNodeRemoteInput>

export const FormatKotlinNodeRemoteInputParser =
  (): z.ZodType<FormatKotlinNodeRemoteInput> => {
    if (!FormatKotlinNodeRemoteInputModel) {
      FormatKotlinNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeRemoteInput>
    }
    return FormatKotlinNodeRemoteInputModel!
  }

let FormatPythonNodeClientInputModel: z.ZodType<FormatPythonNodeClientInput>

export const FormatPythonNodeClientInputParser =
  (): z.ZodType<FormatPythonNodeClientInput> => {
    if (!FormatPythonNodeClientInputModel) {
      FormatPythonNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatPythonNodeClientInput>
    }
    return FormatPythonNodeClientInputModel!
  }

let FormatPythonNodeExternalInputModel: z.ZodType<FormatPythonNodeExternalInput>

export const FormatPythonNodeExternalInputParser =
  (): z.ZodType<FormatPythonNodeExternalInput> => {
    if (!FormatPythonNodeExternalInputModel) {
      FormatPythonNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatPythonNodeExternalInput>
    }
    return FormatPythonNodeExternalInputModel!
  }

let FormatPythonNodeInputModel: z.ZodType<FormatPythonNodeInput>

export const FormatPythonNodeInputParser =
  (): z.ZodType<FormatPythonNodeInput> => {
    if (!FormatPythonNodeInputModel) {
      FormatPythonNodeInputModel = z.union([
        z.lazy(() => FormatPythonNodeRemoteInputParser()),
        z.lazy(() => FormatPythonNodeLocalExternalInputParser()),
        z.lazy(() => FormatPythonNodeLocalInternalInputParser()),
      ])
    }
    return FormatPythonNodeInputModel!
  }

let FormatPythonNodeLocalExternalInputModel: z.ZodType<FormatPythonNodeLocalExternalInput>

export const FormatPythonNodeLocalExternalInputParser =
  (): z.ZodType<FormatPythonNodeLocalExternalInput> => {
    if (!FormatPythonNodeLocalExternalInputModel) {
      FormatPythonNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeLocalExternalInput>
    }
    return FormatPythonNodeLocalExternalInputModel!
  }

let FormatPythonNodeLocalInputModel: z.ZodType<FormatPythonNodeLocalInput>

export const FormatPythonNodeLocalInputParser =
  (): z.ZodType<FormatPythonNodeLocalInput> => {
    if (!FormatPythonNodeLocalInputModel) {
      FormatPythonNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeLocalInput>
    }
    return FormatPythonNodeLocalInputModel!
  }

let FormatPythonNodeLocalInternalInputModel: z.ZodType<FormatPythonNodeLocalInternalInput>

export const FormatPythonNodeLocalInternalInputParser =
  (): z.ZodType<FormatPythonNodeLocalInternalInput> => {
    if (!FormatPythonNodeLocalInternalInputModel) {
      FormatPythonNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeLocalInternalInput>
    }
    return FormatPythonNodeLocalInternalInputModel!
  }

let FormatPythonNodeOutputModel: z.ZodType<FormatPythonNodeOutput>

export const FormatPythonNodeOutputParser =
  (): z.ZodType<FormatPythonNodeOutput> => {
    if (!FormatPythonNodeOutputModel) {
      FormatPythonNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatPythonNodeOutput>
    }
    return FormatPythonNodeOutputModel!
  }

let FormatPythonNodeRemoteInputModel: z.ZodType<FormatPythonNodeRemoteInput>

export const FormatPythonNodeRemoteInputParser =
  (): z.ZodType<FormatPythonNodeRemoteInput> => {
    if (!FormatPythonNodeRemoteInputModel) {
      FormatPythonNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeRemoteInput>
    }
    return FormatPythonNodeRemoteInputModel!
  }

let FormatRustNodeClientInputModel: z.ZodType<FormatRustNodeClientInput>

export const FormatRustNodeClientInputParser =
  (): z.ZodType<FormatRustNodeClientInput> => {
    if (!FormatRustNodeClientInputModel) {
      FormatRustNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatRustNodeClientInput>
    }
    return FormatRustNodeClientInputModel!
  }

let FormatRustNodeExternalInputModel: z.ZodType<FormatRustNodeExternalInput>

export const FormatRustNodeExternalInputParser =
  (): z.ZodType<FormatRustNodeExternalInput> => {
    if (!FormatRustNodeExternalInputModel) {
      FormatRustNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatRustNodeExternalInput>
    }
    return FormatRustNodeExternalInputModel!
  }

let FormatRustNodeInputModel: z.ZodType<FormatRustNodeInput>

export const FormatRustNodeInputParser =
  (): z.ZodType<FormatRustNodeInput> => {
    if (!FormatRustNodeInputModel) {
      FormatRustNodeInputModel = z.union([
        z.lazy(() => FormatRustNodeRemoteInputParser()),
        z.lazy(() => FormatRustNodeLocalExternalInputParser()),
        z.lazy(() => FormatRustNodeLocalInternalInputParser()),
      ])
    }
    return FormatRustNodeInputModel!
  }

let FormatRustNodeLocalExternalInputModel: z.ZodType<FormatRustNodeLocalExternalInput>

export const FormatRustNodeLocalExternalInputParser =
  (): z.ZodType<FormatRustNodeLocalExternalInput> => {
    if (!FormatRustNodeLocalExternalInputModel) {
      FormatRustNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeLocalExternalInput>
    }
    return FormatRustNodeLocalExternalInputModel!
  }

let FormatRustNodeLocalInputModel: z.ZodType<FormatRustNodeLocalInput>

export const FormatRustNodeLocalInputParser =
  (): z.ZodType<FormatRustNodeLocalInput> => {
    if (!FormatRustNodeLocalInputModel) {
      FormatRustNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeLocalInput>
    }
    return FormatRustNodeLocalInputModel!
  }

let FormatRustNodeLocalInternalInputModel: z.ZodType<FormatRustNodeLocalInternalInput>

export const FormatRustNodeLocalInternalInputParser =
  (): z.ZodType<FormatRustNodeLocalInternalInput> => {
    if (!FormatRustNodeLocalInternalInputModel) {
      FormatRustNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeLocalInternalInput>
    }
    return FormatRustNodeLocalInternalInputModel!
  }

let FormatRustNodeOutputModel: z.ZodType<FormatRustNodeOutput>

export const FormatRustNodeOutputParser =
  (): z.ZodType<FormatRustNodeOutput> => {
    if (!FormatRustNodeOutputModel) {
      FormatRustNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatRustNodeOutput>
    }
    return FormatRustNodeOutputModel!
  }

let FormatRustNodeRemoteInputModel: z.ZodType<FormatRustNodeRemoteInput>

export const FormatRustNodeRemoteInputParser =
  (): z.ZodType<FormatRustNodeRemoteInput> => {
    if (!FormatRustNodeRemoteInputModel) {
      FormatRustNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeRemoteInput>
    }
    return FormatRustNodeRemoteInputModel!
  }

let FormatSwiftNodeClientInputModel: z.ZodType<FormatSwiftNodeClientInput>

export const FormatSwiftNodeClientInputParser =
  (): z.ZodType<FormatSwiftNodeClientInput> => {
    if (!FormatSwiftNodeClientInputModel) {
      FormatSwiftNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatSwiftNodeClientInput>
    }
    return FormatSwiftNodeClientInputModel!
  }

let FormatSwiftNodeExternalInputModel: z.ZodType<FormatSwiftNodeExternalInput>

export const FormatSwiftNodeExternalInputParser =
  (): z.ZodType<FormatSwiftNodeExternalInput> => {
    if (!FormatSwiftNodeExternalInputModel) {
      FormatSwiftNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatSwiftNodeExternalInput>
    }
    return FormatSwiftNodeExternalInputModel!
  }

let FormatSwiftNodeInputModel: z.ZodType<FormatSwiftNodeInput>

export const FormatSwiftNodeInputParser =
  (): z.ZodType<FormatSwiftNodeInput> => {
    if (!FormatSwiftNodeInputModel) {
      FormatSwiftNodeInputModel = z.union([
        z.lazy(() => FormatSwiftNodeRemoteInputParser()),
        z.lazy(() => FormatSwiftNodeLocalExternalInputParser()),
        z.lazy(() => FormatSwiftNodeLocalInternalInputParser()),
      ])
    }
    return FormatSwiftNodeInputModel!
  }

let FormatSwiftNodeLocalExternalInputModel: z.ZodType<FormatSwiftNodeLocalExternalInput>

export const FormatSwiftNodeLocalExternalInputParser =
  (): z.ZodType<FormatSwiftNodeLocalExternalInput> => {
    if (!FormatSwiftNodeLocalExternalInputModel) {
      FormatSwiftNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeLocalExternalInput>
    }
    return FormatSwiftNodeLocalExternalInputModel!
  }

let FormatSwiftNodeLocalInputModel: z.ZodType<FormatSwiftNodeLocalInput>

export const FormatSwiftNodeLocalInputParser =
  (): z.ZodType<FormatSwiftNodeLocalInput> => {
    if (!FormatSwiftNodeLocalInputModel) {
      FormatSwiftNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeLocalInput>
    }
    return FormatSwiftNodeLocalInputModel!
  }

let FormatSwiftNodeLocalInternalInputModel: z.ZodType<FormatSwiftNodeLocalInternalInput>

export const FormatSwiftNodeLocalInternalInputParser =
  (): z.ZodType<FormatSwiftNodeLocalInternalInput> => {
    if (!FormatSwiftNodeLocalInternalInputModel) {
      FormatSwiftNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeLocalInternalInput>
    }
    return FormatSwiftNodeLocalInternalInputModel!
  }

let FormatSwiftNodeOutputModel: z.ZodType<FormatSwiftNodeOutput>

export const FormatSwiftNodeOutputParser =
  (): z.ZodType<FormatSwiftNodeOutput> => {
    if (!FormatSwiftNodeOutputModel) {
      FormatSwiftNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatSwiftNodeOutput>
    }
    return FormatSwiftNodeOutputModel!
  }

let FormatSwiftNodeRemoteInputModel: z.ZodType<FormatSwiftNodeRemoteInput>

export const FormatSwiftNodeRemoteInputParser =
  (): z.ZodType<FormatSwiftNodeRemoteInput> => {
    if (!FormatSwiftNodeRemoteInputModel) {
      FormatSwiftNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeRemoteInput>
    }
    return FormatSwiftNodeRemoteInputModel!
  }

let SanitizeHtmlNodeClientInputModel: z.ZodType<SanitizeHtmlNodeClientInput>

export const SanitizeHtmlNodeClientInputParser =
  (): z.ZodType<SanitizeHtmlNodeClientInput> => {
    if (!SanitizeHtmlNodeClientInputModel) {
      SanitizeHtmlNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
      }) as z.ZodType<SanitizeHtmlNodeClientInput>
    }
    return SanitizeHtmlNodeClientInputModel!
  }

let SanitizeHtmlNodeExternalInputModel: z.ZodType<SanitizeHtmlNodeExternalInput>

export const SanitizeHtmlNodeExternalInputParser =
  (): z.ZodType<SanitizeHtmlNodeExternalInput> => {
    if (!SanitizeHtmlNodeExternalInputModel) {
      SanitizeHtmlNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
      }) as z.ZodType<SanitizeHtmlNodeExternalInput>
    }
    return SanitizeHtmlNodeExternalInputModel!
  }

let SanitizeHtmlNodeInputModel: z.ZodType<SanitizeHtmlNodeInput>

export const SanitizeHtmlNodeInputParser =
  (): z.ZodType<SanitizeHtmlNodeInput> => {
    if (!SanitizeHtmlNodeInputModel) {
      SanitizeHtmlNodeInputModel = z.union([
        z.lazy(() => SanitizeHtmlNodeRemoteInputParser()),
        z.lazy(() => SanitizeHtmlNodeLocalExternalInputParser()),
        z.lazy(() => SanitizeHtmlNodeLocalInternalInputParser()),
      ])
    }
    return SanitizeHtmlNodeInputModel!
  }

let SanitizeHtmlNodeLocalExternalInputModel: z.ZodType<SanitizeHtmlNodeLocalExternalInput>

export const SanitizeHtmlNodeLocalExternalInputParser =
  (): z.ZodType<SanitizeHtmlNodeLocalExternalInput> => {
    if (!SanitizeHtmlNodeLocalExternalInputModel) {
      SanitizeHtmlNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeLocalExternalInput>
    }
    return SanitizeHtmlNodeLocalExternalInputModel!
  }

let SanitizeHtmlNodeLocalInputModel: z.ZodType<SanitizeHtmlNodeLocalInput>

export const SanitizeHtmlNodeLocalInputParser =
  (): z.ZodType<SanitizeHtmlNodeLocalInput> => {
    if (!SanitizeHtmlNodeLocalInputModel) {
      SanitizeHtmlNodeLocalInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeLocalInput>
    }
    return SanitizeHtmlNodeLocalInputModel!
  }

let SanitizeHtmlNodeLocalInternalInputModel: z.ZodType<SanitizeHtmlNodeLocalInternalInput>

export const SanitizeHtmlNodeLocalInternalInputParser =
  (): z.ZodType<SanitizeHtmlNodeLocalInternalInput> => {
    if (!SanitizeHtmlNodeLocalInternalInputModel) {
      SanitizeHtmlNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeLocalInternalInput>
    }
    return SanitizeHtmlNodeLocalInternalInputModel!
  }

let SanitizeHtmlNodeOutputModel: z.ZodType<SanitizeHtmlNodeOutput>

export const SanitizeHtmlNodeOutputParser =
  (): z.ZodType<SanitizeHtmlNodeOutput> => {
    if (!SanitizeHtmlNodeOutputModel) {
      SanitizeHtmlNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<SanitizeHtmlNodeOutput>
    }
    return SanitizeHtmlNodeOutputModel!
  }

let SanitizeHtmlNodeRemoteInputModel: z.ZodType<SanitizeHtmlNodeRemoteInput>

export const SanitizeHtmlNodeRemoteInputParser =
  (): z.ZodType<SanitizeHtmlNodeRemoteInput> => {
    if (!SanitizeHtmlNodeRemoteInputModel) {
      SanitizeHtmlNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeRemoteInput>
    }
    return SanitizeHtmlNodeRemoteInputModel!
  }
