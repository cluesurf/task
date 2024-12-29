import merge from 'lodash/merge.js'
import {
  ArchiveFormat,
  AssemblySyntax,
  BackendCompilationOutput,
  CInputFormat,
  CalibreInputFormat,
  CalibreOutputFormat,
  ClangFormat,
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
  CppInputFormat,
  EnscriptInputFormat,
  EnscriptOutputFormat,
  FfmpegCodecAudio,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegFormat,
  FfmpegStrictOption,
  FileContent,
  FileContentWithSha256,
  FontFormat,
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
  LlvmArchitecture,
  LlvmOptimizationLevel,
  PandocInputFormat,
  PandocOutputFormat,
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
  SwiftInputFormat,
  WastInputFormat,
  WastOutputFormat,
} from '~/code/type/shared/index.js'
import { ClangStyleAll } from '~/code/type/shared/clang-format.js'

export type CompileCBrowserInput =
  | CompileCBrowserRemoteInput
  | CompileCBrowserLocalInput
export type CompileCBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: CInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCBrowserOutput = {
  file: FileContent
}
export type CompileCBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: CInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppBrowserInput =
  | CompileCppBrowserRemoteInput
  | CompileCppBrowserLocalInput
export type CompileCppBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: CppInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppBrowserOutput = {
  file: FileContent
}
export type CompileCppBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: CppInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileRustBrowserInput =
  | CompileRustBrowserRemoteInput
  | CompileRustBrowserLocalInput
export type CompileRustBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: RustInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustBrowserOutput = {
  file: FileContent
}
export type CompileRustBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: RustInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileSwiftBrowserInput =
  | CompileSwiftBrowserRemoteInput
  | CompileSwiftBrowserLocalInput
export type CompileSwiftBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: SwiftInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileSwiftBrowserOutput = {
  file: FileContent
}
export type CompileSwiftBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: SwiftInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileWastBrowserInput =
  | CompileWastBrowserRemoteInput
  | CompileWastBrowserLocalInput
export type CompileWastBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: WastInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: WastOutputFormat
  }
}
export type CompileWastBrowserOutput = {
  file: FileContent
}
export type CompileWastBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: WastInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
  }
}
export type ConvertArchiveBrowserInput =
  | ConvertArchiveBrowserRemoteInput
  | ConvertArchiveBrowserLocalInput
export type ConvertArchiveBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: ArchiveFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertArchiveBrowserOutput = {
  file: FileContent
}
export type ConvertArchiveBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: ArchiveFormat
    file: FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertDocumentWithCalibreBrowserInput =
  | ConvertDocumentWithCalibreBrowserRemoteInput
  | ConvertDocumentWithCalibreBrowserLocalInput
export type ConvertDocumentWithCalibreBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: CalibreInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithCalibreBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: CalibreInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithEnscriptBrowserInput =
  | ConvertDocumentWithEnscriptBrowserRemoteInput
  | ConvertDocumentWithEnscriptBrowserLocalInput
export type ConvertDocumentWithEnscriptBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: EnscriptInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithEnscriptBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: EnscriptInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithJupyterBrowserInput =
  | ConvertDocumentWithJupyterBrowserRemoteInput
  | ConvertDocumentWithJupyterBrowserLocalInput
export type ConvertDocumentWithJupyterBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: string
    file: {
      content: FileContent
    }
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithJupyterBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithJupyterBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithLibreOfficeBrowserInput =
  | ConvertDocumentWithLibreOfficeBrowserRemoteInput
  | ConvertDocumentWithLibreOfficeBrowserLocalInput
export type ConvertDocumentWithLibreOfficeBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: LibreOfficeInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithLibreOfficeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: LibreOfficeInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithPandocBrowserInput =
  | ConvertDocumentWithPandocBrowserRemoteInput
  | ConvertDocumentWithPandocBrowserLocalInput
export type ConvertDocumentWithPandocBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PandocInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithPandocBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PandocInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertFontWithFontForgeBrowserInput =
  | ConvertFontWithFontForgeBrowserRemoteInput
  | ConvertFontWithFontForgeBrowserLocalInput
export type ConvertFontWithFontForgeBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: FontFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: FontFormat
  }
}
export type ConvertFontWithFontForgeBrowserOutput = {
  file: FileContent
}
export type ConvertFontWithFontForgeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: FontFormat
    file: FileContentWithSha256
  }
  output: {
    format: FontFormat
  }
}
export type ConvertHtmlWithPuppeteerBrowserInput =
  | ConvertHtmlWithPuppeteerBrowserRemoteInput
  | ConvertHtmlWithPuppeteerBrowserLocalInput
export type ConvertHtmlWithPuppeteerBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PuppeteerInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerBrowserOutput = {
  file: FileContent
}
export type ConvertHtmlWithPuppeteerBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertImageWithImageMagickBrowserInput =
  | ConvertImageWithImageMagickBrowserRemoteInput
  | ConvertImageWithImageMagickBrowserLocalInput
export type ConvertImageWithImageMagickBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: ImageMagickInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: ImageMagickOutputFormat
  }
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithImageMagickBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: ImageMagickInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
  }
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithInkscapeBrowserInput =
  | ConvertImageWithInkscapeBrowserRemoteInput
  | ConvertImageWithInkscapeBrowserLocalInput
export type ConvertImageWithInkscapeBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: string
    file: {
      content: FileContent
    }
  }
  output: {
    format: string
  }
}
export type ConvertImageWithInkscapeBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithInkscapeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertLatexToPngBrowserInput =
  | ConvertLatexToPngBrowserRemoteInput
  | ConvertLatexToPngBrowserLocalInput
export type ConvertLatexToPngBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: ConvertLatexToPngInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngBrowserOutput = {
  file: FileContent
}
export type ConvertLatexToPngBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: ConvertLatexToPngInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexWithPdfLatexBrowserInput =
  | ConvertLatexWithPdfLatexBrowserRemoteInput
  | ConvertLatexWithPdfLatexBrowserLocalInput
export type ConvertLatexWithPdfLatexBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PdfLatexInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexBrowserOutput = {
  file: FileContent
}
export type ConvertLatexWithPdfLatexBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PdfLatexInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertMarkdownWithPuppeteerBrowserInput =
  | ConvertMarkdownWithPuppeteerBrowserRemoteInput
  | ConvertMarkdownWithPuppeteerBrowserLocalInput
export type ConvertMarkdownWithPuppeteerBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertMarkdownWithPuppeteerBrowserOutput = {
  file: FileContent
}
export type ConvertMarkdownWithPuppeteerBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertTxtWithPuppeteerBrowserInput =
  | ConvertTxtWithPuppeteerBrowserRemoteInput
  | ConvertTxtWithPuppeteerBrowserLocalInput
export type ConvertTxtWithPuppeteerBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PuppeteerTxtInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertTxtWithPuppeteerBrowserOutput = {
  file: FileContent
}
export type ConvertTxtWithPuppeteerBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertVideoWithFfmpegBrowserInput =
  | ConvertVideoWithFfmpegBrowserRemoteInput
  | ConvertVideoWithFfmpegBrowserLocalInput
export type ConvertVideoWithFfmpegBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: FfmpegFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: FfmpegFormat
  }
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
  audioBitRate?: number
  videoBitRate?: number
  frameRate?: number
  startTime?: number | string
  endTime?: number | string
  strict?: FfmpegStrictOption
  overwrite?: boolean
  progress?: boolean
  scaleWidth?: number
  scaleHeight?: number
  audioChannels?: number
  audioSamplingFrequency?: number
  subtitleCodec?: FfmpegCodecSubtitle
  duration?: number | string
  rotation?: number
}
export type ConvertVideoWithFfmpegBrowserOutput = {
  file: FileContent
}
export type ConvertVideoWithFfmpegBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: FfmpegFormat
    file: FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
  }
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
  audioBitRate?: number
  videoBitRate?: number
  frameRate?: number
  startTime?: number | string
  endTime?: number | string
  strict?: FfmpegStrictOption
  overwrite?: boolean
  progress?: boolean
  scaleWidth?: number
  scaleHeight?: number
  audioChannels?: number
  audioSamplingFrequency?: number
  subtitleCodec?: FfmpegCodecSubtitle
  duration?: number | string
  rotation?: number
}
export type FormatAssemblyBrowserInput =
  | FormatAssemblyBrowserRemoteInput
  | FormatAssemblyBrowserLocalInput
export type FormatAssemblyBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatAssemblyBrowserOutput = {
  file: FileContent
}
export type FormatAssemblyBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatCodeWithClangFormatBrowserInput =
  | FormatCodeWithClangFormatBrowserRemoteInput
  | FormatCodeWithClangFormatBrowserLocalInput
export type FormatCodeWithClangFormatBrowserLocalInput =
  ClangStyleAll & {
    handle?: 'local'
    format: ClangFormat
    input: {
      file: {
        content: FileContent
      }
    }
  }
export type FormatCodeWithClangFormatBrowserOutput = ClangStyleAll & {
  file: FileContent
}
export type FormatCodeWithClangFormatBrowserRemoteInput =
  ClangStyleAll & {
    handle: 'remote'
    format: ClangFormat
    input: {
      file: FileContentWithSha256
    }
  }
export type FormatKotlinBrowserInput =
  | FormatKotlinBrowserRemoteInput
  | FormatKotlinBrowserLocalInput
export type FormatKotlinBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatKotlinBrowserOutput = {
  file: FileContent
}
export type FormatKotlinBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatPythonBrowserInput =
  | FormatPythonBrowserRemoteInput
  | FormatPythonBrowserLocalInput
export type FormatPythonBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatPythonBrowserOutput = {
  file: FileContent
}
export type FormatPythonBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatRustBrowserInput =
  | FormatRustBrowserRemoteInput
  | FormatRustBrowserLocalInput
export type FormatRustBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatRustBrowserOutput = {
  file: FileContent
}
export type FormatRustBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatSwiftBrowserInput =
  | FormatSwiftBrowserRemoteInput
  | FormatSwiftBrowserLocalInput
export type FormatSwiftBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatSwiftBrowserOutput = {
  file: FileContent
}
export type FormatSwiftBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type SanitizeHtmlBrowserInput =
  | SanitizeHtmlBrowserRemoteInput
  | SanitizeHtmlBrowserLocalInput
export type SanitizeHtmlBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: string
    file: {
      content: FileContent
    }
  }
}
export type SanitizeHtmlBrowserOutput = {
  file: FileContent
}
export type SanitizeHtmlBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileContentWithSha256
  }
}
