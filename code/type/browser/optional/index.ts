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
  FontFormat,
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
import {
  FileContentOptional,
  FileContentWithSha256Optional,
  ImageMagicColorMatrixOptional,
} from '~/code/type/shared/optional/index.js'
import { ClangStyleAllOptional } from '~/code/type/shared/optional/clang-format.js'

export type CompileCBrowserInputOptional =
  | CompileCBrowserRemoteInputOptional
  | CompileCBrowserLocalInputOptional
export type CompileCBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: CInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCBrowserOutputOptional = {
  file?: FileContentOptional
}
export type CompileCBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: CInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppBrowserInputOptional =
  | CompileCppBrowserRemoteInputOptional
  | CompileCppBrowserLocalInputOptional
export type CompileCppBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: CppInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppBrowserOutputOptional = {
  file?: FileContentOptional
}
export type CompileCppBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: CppInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileRustBrowserInputOptional =
  | CompileRustBrowserRemoteInputOptional
  | CompileRustBrowserLocalInputOptional
export type CompileRustBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: RustInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustBrowserOutputOptional = {
  file?: FileContentOptional
}
export type CompileRustBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: RustInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileSwiftBrowserInputOptional =
  | CompileSwiftBrowserRemoteInputOptional
  | CompileSwiftBrowserLocalInputOptional
export type CompileSwiftBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: SwiftInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: BackendCompilationOutput
  }
}
export type CompileSwiftBrowserOutputOptional = {
  file?: FileContentOptional
}
export type CompileSwiftBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: SwiftInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
  }
}
export type CompileWastBrowserInputOptional =
  | CompileWastBrowserRemoteInputOptional
  | CompileWastBrowserLocalInputOptional
export type CompileWastBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: WastInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: WastOutputFormat
  }
}
export type CompileWastBrowserOutputOptional = {
  file?: FileContentOptional
}
export type CompileWastBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: WastInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: WastOutputFormat
  }
}
export type ConvertArchiveBrowserInputOptional =
  | ConvertArchiveBrowserRemoteInputOptional
  | ConvertArchiveBrowserLocalInputOptional
export type ConvertArchiveBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: ArchiveFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: ArchiveFormat
  }
}
export type ConvertArchiveBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertArchiveBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: ArchiveFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: ArchiveFormat
  }
}
export type ConvertDocumentWithCalibreBrowserInputOptional =
  | ConvertDocumentWithCalibreBrowserRemoteInputOptional
  | ConvertDocumentWithCalibreBrowserLocalInputOptional
export type ConvertDocumentWithCalibreBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: CalibreInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertDocumentWithCalibreBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: CalibreInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: CalibreOutputFormat
  }
}
export type ConvertDocumentWithEnscriptBrowserInputOptional =
  | ConvertDocumentWithEnscriptBrowserRemoteInputOptional
  | ConvertDocumentWithEnscriptBrowserLocalInputOptional
export type ConvertDocumentWithEnscriptBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: EnscriptInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertDocumentWithEnscriptBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: EnscriptInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithJupyterBrowserInputOptional =
  | ConvertDocumentWithJupyterBrowserRemoteInputOptional
  | ConvertDocumentWithJupyterBrowserLocalInputOptional
export type ConvertDocumentWithJupyterBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: string
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: string
  }
}
export type ConvertDocumentWithJupyterBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertDocumentWithJupyterBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: string
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: string
  }
}
export type ConvertDocumentWithLibreOfficeBrowserInputOptional =
  | ConvertDocumentWithLibreOfficeBrowserRemoteInputOptional
  | ConvertDocumentWithLibreOfficeBrowserLocalInputOptional
export type ConvertDocumentWithLibreOfficeBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: LibreOfficeInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertDocumentWithLibreOfficeBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: LibreOfficeInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithPandocBrowserInputOptional =
  | ConvertDocumentWithPandocBrowserRemoteInputOptional
  | ConvertDocumentWithPandocBrowserLocalInputOptional
export type ConvertDocumentWithPandocBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: PandocInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertDocumentWithPandocBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PandocInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: PandocOutputFormat
  }
}
export type ConvertFontWithFontForgeBrowserInputOptional =
  | ConvertFontWithFontForgeBrowserRemoteInputOptional
  | ConvertFontWithFontForgeBrowserLocalInputOptional
export type ConvertFontWithFontForgeBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: FontFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: FontFormat
  }
}
export type ConvertFontWithFontForgeBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertFontWithFontForgeBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: FontFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: FontFormat
  }
}
export type ConvertHtmlWithPuppeteerBrowserInputOptional =
  | ConvertHtmlWithPuppeteerBrowserRemoteInputOptional
  | ConvertHtmlWithPuppeteerBrowserLocalInputOptional
export type ConvertHtmlWithPuppeteerBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: PuppeteerInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: PuppeteerOutputFormat
  }
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertHtmlWithPuppeteerBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PuppeteerInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
  }
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertImageWithImageMagickBrowserInputOptional =
  | ConvertImageWithImageMagickBrowserRemoteInputOptional
  | ConvertImageWithImageMagickBrowserLocalInputOptional
export type ConvertImageWithImageMagickBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: ImageMagickInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: ImageMagickOutputFormat
  }
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrixOptional
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertImageWithImageMagickBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: ImageMagickInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: ImageMagickOutputFormat
  }
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrixOptional
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithInkscapeBrowserInputOptional =
  | ConvertImageWithInkscapeBrowserRemoteInputOptional
  | ConvertImageWithInkscapeBrowserLocalInputOptional
export type ConvertImageWithInkscapeBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: string
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: string
  }
}
export type ConvertImageWithInkscapeBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertImageWithInkscapeBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: string
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: string
  }
}
export type ConvertLatexToPngBrowserInputOptional =
  | ConvertLatexToPngBrowserRemoteInputOptional
  | ConvertLatexToPngBrowserLocalInputOptional
export type ConvertLatexToPngBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertLatexToPngBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexWithPdfLatexBrowserInputOptional =
  | ConvertLatexWithPdfLatexBrowserRemoteInputOptional
  | ConvertLatexWithPdfLatexBrowserLocalInputOptional
export type ConvertLatexWithPdfLatexBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: PdfLatexInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertLatexWithPdfLatexBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PdfLatexInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: PdfLatexOutputFormat
  }
}
export type ConvertMarkdownWithPuppeteerBrowserInputOptional =
  | ConvertMarkdownWithPuppeteerBrowserRemoteInputOptional
  | ConvertMarkdownWithPuppeteerBrowserLocalInputOptional
export type ConvertMarkdownWithPuppeteerBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: PuppeteerMarkdownInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: PuppeteerOutputFormat
  }
}
export type ConvertMarkdownWithPuppeteerBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertMarkdownWithPuppeteerBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PuppeteerMarkdownInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
  }
}
export type ConvertTxtWithPuppeteerBrowserInputOptional =
  | ConvertTxtWithPuppeteerBrowserRemoteInputOptional
  | ConvertTxtWithPuppeteerBrowserLocalInputOptional
export type ConvertTxtWithPuppeteerBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: PuppeteerOutputFormat
  }
}
export type ConvertTxtWithPuppeteerBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertTxtWithPuppeteerBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
  }
}
export type ConvertVideoWithFfmpegBrowserInputOptional =
  | ConvertVideoWithFfmpegBrowserRemoteInputOptional
  | ConvertVideoWithFfmpegBrowserLocalInputOptional
export type ConvertVideoWithFfmpegBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: FfmpegFormat
    file?: {
      content?: FileContentOptional
    }
  }
  output?: {
    format?: FfmpegFormat
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
export type ConvertVideoWithFfmpegBrowserOutputOptional = {
  file?: FileContentOptional
}
export type ConvertVideoWithFfmpegBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: FfmpegFormat
    file?: FileContentWithSha256Optional
  }
  output?: {
    format?: FfmpegFormat
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
export type FormatAssemblyBrowserInputOptional =
  | FormatAssemblyBrowserRemoteInputOptional
  | FormatAssemblyBrowserLocalInputOptional
export type FormatAssemblyBrowserLocalInputOptional = {
  handle?: 'local'
  format?: string
  input?: {
    file?: {
      content?: FileContentOptional
    }
  }
}
export type FormatAssemblyBrowserOutputOptional = {
  file?: FileContentOptional
}
export type FormatAssemblyBrowserRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileContentWithSha256Optional
  }
}
export type FormatCodeWithClangFormatBrowserInputOptional =
  | FormatCodeWithClangFormatBrowserRemoteInputOptional
  | FormatCodeWithClangFormatBrowserLocalInputOptional
export type FormatCodeWithClangFormatBrowserLocalInputOptional =
  ClangStyleAllOptional & {
    handle?: 'local'
    format?: ClangFormat
    input?: {
      file?: {
        content?: FileContentOptional
      }
    }
  }
export type FormatCodeWithClangFormatBrowserOutputOptional =
  ClangStyleAllOptional & {
    file?: FileContentOptional
  }
export type FormatCodeWithClangFormatBrowserRemoteInputOptional =
  ClangStyleAllOptional & {
    handle?: 'remote'
    format?: ClangFormat
    input?: {
      file?: FileContentWithSha256Optional
    }
  }
export type FormatKotlinBrowserInputOptional =
  | FormatKotlinBrowserRemoteInputOptional
  | FormatKotlinBrowserLocalInputOptional
export type FormatKotlinBrowserLocalInputOptional = {
  handle?: 'local'
  format?: string
  input?: {
    file?: {
      content?: FileContentOptional
    }
  }
}
export type FormatKotlinBrowserOutputOptional = {
  file?: FileContentOptional
}
export type FormatKotlinBrowserRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileContentWithSha256Optional
  }
}
export type FormatPythonBrowserInputOptional =
  | FormatPythonBrowserRemoteInputOptional
  | FormatPythonBrowserLocalInputOptional
export type FormatPythonBrowserLocalInputOptional = {
  handle?: 'local'
  format?: string
  input?: {
    file?: {
      content?: FileContentOptional
    }
  }
}
export type FormatPythonBrowserOutputOptional = {
  file?: FileContentOptional
}
export type FormatPythonBrowserRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileContentWithSha256Optional
  }
}
export type FormatRustBrowserInputOptional =
  | FormatRustBrowserRemoteInputOptional
  | FormatRustBrowserLocalInputOptional
export type FormatRustBrowserLocalInputOptional = {
  handle?: 'local'
  format?: string
  input?: {
    file?: {
      content?: FileContentOptional
    }
  }
}
export type FormatRustBrowserOutputOptional = {
  file?: FileContentOptional
}
export type FormatRustBrowserRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileContentWithSha256Optional
  }
}
export type FormatSwiftBrowserInputOptional =
  | FormatSwiftBrowserRemoteInputOptional
  | FormatSwiftBrowserLocalInputOptional
export type FormatSwiftBrowserLocalInputOptional = {
  handle?: 'local'
  format?: string
  input?: {
    file?: {
      content?: FileContentOptional
    }
  }
}
export type FormatSwiftBrowserOutputOptional = {
  file?: FileContentOptional
}
export type FormatSwiftBrowserRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileContentWithSha256Optional
  }
}
export type SanitizeHtmlBrowserInputOptional =
  | SanitizeHtmlBrowserRemoteInputOptional
  | SanitizeHtmlBrowserLocalInputOptional
export type SanitizeHtmlBrowserLocalInputOptional = {
  handle?: 'local'
  input?: {
    format?: string
    file?: {
      content?: FileContentOptional
    }
  }
}
export type SanitizeHtmlBrowserOutputOptional = {
  file?: FileContentOptional
}
export type SanitizeHtmlBrowserRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: string
    file?: FileContentWithSha256Optional
  }
}
