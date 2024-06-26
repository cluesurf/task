import merge from 'lodash/merge'
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
  FileInputPathOptional,
  FilePathOptional,
  ImageMagicColorMatrixOptional,
  LocalOutputPathOptional,
  LocalPathOptional,
  RemoteInputPathOptional,
  TextStyleOptional,
} from '~/code/type/shared/optional/index.js'
import { ClangStyleAllOptional } from '~/code/type/shared/optional/clang-format.js'

export type CompileCNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: CInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: CInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeInputOptional =
  | CompileCNodeRemoteInputOptional
  | CompileCNodeLocalExternalInputOptional
  | CompileCNodeLocalInternalInputOptional
export type CompileCNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: CInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeLocalInputOptional = {
  input?: {
    format?: CInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalPathOptional
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: CInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeOutputOptional = {
  file?: FilePathOptional
}
export type CompileCNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: CInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: CppInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: CppInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeInputOptional =
  | CompileCppNodeRemoteInputOptional
  | CompileCppNodeLocalExternalInputOptional
  | CompileCppNodeLocalInternalInputOptional
export type CompileCppNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: CppInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeLocalInputOptional = {
  input?: {
    format?: CppInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalPathOptional
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: CppInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeOutputOptional = {
  file?: FilePathOptional
}
export type CompileCppNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: CppInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileRustNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: RustInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: RustInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustNodeInputOptional =
  | CompileRustNodeRemoteInputOptional
  | CompileRustNodeLocalExternalInputOptional
  | CompileRustNodeLocalInternalInputOptional
export type CompileRustNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: RustInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: RustOutputFormat
    file?: LocalOutputPathOptional
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeLocalInputOptional = {
  input?: {
    format?: RustInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: RustOutputFormat
    file?: LocalPathOptional
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: RustInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: RustOutputFormat
    file?: LocalOutputPathOptional
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeOutputOptional = {
  file?: FilePathOptional
}
export type CompileRustNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: RustInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: RustOutputFormat
    file?: LocalOutputPathOptional
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileSwiftNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: SwiftInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
  }
}
export type CompileSwiftNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: SwiftInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
  }
}
export type CompileSwiftNodeInputOptional =
  | CompileSwiftNodeRemoteInputOptional
  | CompileSwiftNodeLocalExternalInputOptional
  | CompileSwiftNodeLocalInternalInputOptional
export type CompileSwiftNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: SwiftInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type CompileSwiftNodeLocalInputOptional = {
  input?: {
    format?: SwiftInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type CompileSwiftNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: SwiftInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type CompileSwiftNodeOutputOptional = {
  file?: FilePathOptional
}
export type CompileSwiftNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: SwiftInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type CompileWastNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: WastInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: WastOutputFormat
  }
}
export type CompileWastNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: WastInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: WastOutputFormat
  }
}
export type CompileWastNodeInputOptional =
  | CompileWastNodeRemoteInputOptional
  | CompileWastNodeLocalExternalInputOptional
  | CompileWastNodeLocalInternalInputOptional
export type CompileWastNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: WastInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: WastOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type CompileWastNodeLocalInputOptional = {
  input?: {
    format?: WastInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: WastOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type CompileWastNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: WastInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: WastOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type CompileWastNodeOutputOptional = {
  file?: FilePathOptional
}
export type CompileWastNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: WastInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: WastOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertArchiveNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: ArchiveFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ArchiveFormat
  }
}
export type ConvertArchiveNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: ArchiveFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ArchiveFormat
  }
}
export type ConvertArchiveNodeInputOptional =
  | ConvertArchiveNodeRemoteInputOptional
  | ConvertArchiveNodeLocalExternalInputOptional
  | ConvertArchiveNodeLocalInternalInputOptional
export type ConvertArchiveNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: ArchiveFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ArchiveFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertArchiveNodeLocalInputOptional = {
  input?: {
    format?: ArchiveFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: ArchiveFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertArchiveNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: ArchiveFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ArchiveFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertArchiveNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertArchiveNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: ArchiveFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ArchiveFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: CalibreInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: CalibreInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreNodeInputOptional =
  | ConvertDocumentWithCalibreNodeRemoteInputOptional
  | ConvertDocumentWithCalibreNodeLocalExternalInputOptional
  | ConvertDocumentWithCalibreNodeLocalInternalInputOptional
export type ConvertDocumentWithCalibreNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: CalibreInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: CalibreOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeLocalInputOptional = {
  input?: {
    format?: CalibreInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: CalibreOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: CalibreInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: CalibreOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertDocumentWithCalibreNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: CalibreInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: CalibreOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: EnscriptInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: EnscriptInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptNodeInputOptional =
  | ConvertDocumentWithEnscriptNodeRemoteInputOptional
  | ConvertDocumentWithEnscriptNodeLocalExternalInputOptional
  | ConvertDocumentWithEnscriptNodeLocalInternalInputOptional
export type ConvertDocumentWithEnscriptNodeLocalExternalInputOptional =
  {
    handle?: 'external'
    input?: {
      format?: EnscriptInputFormat
      file?: RemoteInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: EnscriptOutputFormat
      file?: LocalOutputPathOptional
    }
    pathScope?: string
  }
export type ConvertDocumentWithEnscriptNodeLocalInputOptional = {
  input?: {
    format?: EnscriptInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: EnscriptOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptNodeLocalInternalInputOptional =
  {
    handle?: 'internal'
    input?: {
      format?: EnscriptInputFormat
      file?: FileInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: EnscriptOutputFormat
      file?: LocalOutputPathOptional
    }
    pathScope?: string
  }
export type ConvertDocumentWithEnscriptNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertDocumentWithEnscriptNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: EnscriptInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: EnscriptOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
  }
}
export type ConvertDocumentWithJupyterNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: string
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
  }
}
export type ConvertDocumentWithJupyterNodeInputOptional =
  | ConvertDocumentWithJupyterNodeRemoteInputOptional
  | ConvertDocumentWithJupyterNodeLocalExternalInputOptional
  | ConvertDocumentWithJupyterNodeLocalInternalInputOptional
export type ConvertDocumentWithJupyterNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: string
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeLocalInputOptional = {
  input?: {
    format?: string
    file?: LocalPathOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertDocumentWithJupyterNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: LibreOfficeInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: LibreOfficeInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeNodeInputOptional =
  | ConvertDocumentWithLibreOfficeNodeRemoteInputOptional
  | ConvertDocumentWithLibreOfficeNodeLocalExternalInputOptional
  | ConvertDocumentWithLibreOfficeNodeLocalInternalInputOptional
export type ConvertDocumentWithLibreOfficeNodeLocalExternalInputOptional =
  {
    handle?: 'external'
    input?: {
      format?: LibreOfficeInputFormat
      file?: RemoteInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: LibreOfficeOutputFormat
    }
    pathScope?: string
  }
export type ConvertDocumentWithLibreOfficeNodeLocalInputOptional = {
  input?: {
    format?: LibreOfficeInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: LibreOfficeOutputFormat
    directory?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeLocalInternalInputOptional =
  {
    handle?: 'internal'
    input?: {
      format?: LibreOfficeInputFormat
      file?: FileInputPathOptional | FileContentOptional
    }
    output?: {
      format?: LibreOfficeOutputFormat
      directory?: LocalOutputPathOptional
    }
    pathScope?: string
  }
export type ConvertDocumentWithLibreOfficeNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertDocumentWithLibreOfficeNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: LibreOfficeInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: LibreOfficeOutputFormat
    directory?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: PandocInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PandocInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocNodeInputOptional =
  | ConvertDocumentWithPandocNodeRemoteInputOptional
  | ConvertDocumentWithPandocNodeLocalExternalInputOptional
  | ConvertDocumentWithPandocNodeLocalInternalInputOptional
export type ConvertDocumentWithPandocNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PandocInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PandocOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeLocalInputOptional = {
  input?: {
    format?: PandocInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: PandocOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: PandocInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PandocOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertDocumentWithPandocNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PandocInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PandocOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: FontFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FontFormat
  }
}
export type ConvertFontWithFontForgeNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: FontFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FontFormat
  }
}
export type ConvertFontWithFontForgeNodeInputOptional =
  | ConvertFontWithFontForgeNodeRemoteInputOptional
  | ConvertFontWithFontForgeNodeLocalExternalInputOptional
  | ConvertFontWithFontForgeNodeLocalInternalInputOptional
export type ConvertFontWithFontForgeNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: FontFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FontFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeLocalInputOptional = {
  input?: {
    format?: FontFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: FontFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: FontFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FontFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertFontWithFontForgeNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: FontFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FontFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertHtmlWithPuppeteerNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: PuppeteerInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
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
export type ConvertHtmlWithPuppeteerNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PuppeteerInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
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
export type ConvertHtmlWithPuppeteerNodeInputOptional =
  | ConvertHtmlWithPuppeteerNodeRemoteInputOptional
  | ConvertHtmlWithPuppeteerNodeLocalExternalInputOptional
  | ConvertHtmlWithPuppeteerNodeLocalInternalInputOptional
export type ConvertHtmlWithPuppeteerNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PuppeteerInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeLocalInputOptional = {
  input?: {
    format?: PuppeteerInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: PuppeteerInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertHtmlWithPuppeteerNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PuppeteerInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertImageWithImageMagickNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: ImageMagickInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
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
export type ConvertImageWithImageMagickNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: ImageMagickInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
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
export type ConvertImageWithImageMagickNodeInputOptional =
  | ConvertImageWithImageMagickNodeRemoteInputOptional
  | ConvertImageWithImageMagickNodeLocalExternalInputOptional
  | ConvertImageWithImageMagickNodeLocalInternalInputOptional
export type ConvertImageWithImageMagickNodeLocalExternalInputOptional =
  {
    handle?: 'external'
    input?: {
      format?: ImageMagickInputFormat
      file?: RemoteInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: ImageMagickOutputFormat
      file?: LocalOutputPathOptional
    }
    pathScope?: string
    colorCount?: number
    colorMatrix?: ImageMagicColorMatrixOptional
    colorSpace?: ImageMagickColorSpace
    compare?: boolean
    compression?: ImageMagickCompression
    density?: number
    quality?: number
  }
export type ConvertImageWithImageMagickNodeLocalInputOptional = {
  input?: {
    format?: ImageMagickInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: ImageMagickOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrixOptional
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeLocalInternalInputOptional =
  {
    handle?: 'internal'
    input?: {
      format?: ImageMagickInputFormat
      file?: FileInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: ImageMagickOutputFormat
      file?: LocalOutputPathOptional
    }
    pathScope?: string
    colorCount?: number
    colorMatrix?: ImageMagicColorMatrixOptional
    colorSpace?: ImageMagickColorSpace
    compare?: boolean
    compression?: ImageMagickCompression
    density?: number
    quality?: number
  }
export type ConvertImageWithImageMagickNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertImageWithImageMagickNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: ImageMagickInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ImageMagickOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrixOptional
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithInkscapeNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
  }
}
export type ConvertImageWithInkscapeNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: string
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
  }
}
export type ConvertImageWithInkscapeNodeInputOptional =
  | ConvertImageWithInkscapeNodeRemoteInputOptional
  | ConvertImageWithInkscapeNodeLocalExternalInputOptional
  | ConvertImageWithInkscapeNodeLocalInternalInputOptional
export type ConvertImageWithInkscapeNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: string
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeLocalInputOptional = {
  input?: {
    format?: string
    file?: LocalPathOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertImageWithInkscapeNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: string
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngNodeInputOptional =
  | ConvertLatexToPngNodeRemoteInputOptional
  | ConvertLatexToPngNodeLocalExternalInputOptional
  | ConvertLatexToPngNodeLocalInternalInputOptional
export type ConvertLatexToPngNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeLocalInputOptional = {
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertLatexToPngNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: PdfLatexInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PdfLatexInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexNodeInputOptional =
  | ConvertLatexWithPdfLatexNodeRemoteInputOptional
  | ConvertLatexWithPdfLatexNodeLocalExternalInputOptional
  | ConvertLatexWithPdfLatexNodeLocalInternalInputOptional
export type ConvertLatexWithPdfLatexNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PdfLatexInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PdfLatexOutputFormat
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInputOptional = {
  input?: {
    format?: PdfLatexInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: PdfLatexOutputFormat
    directory?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: PdfLatexInputFormat
    file?: FileInputPathOptional | FileContentOptional
  }
  output?: {
    format?: PdfLatexOutputFormat
    directory?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertLatexWithPdfLatexNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PdfLatexInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PdfLatexOutputFormat
    directory?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type ConvertMarkdownWithPuppeteerNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: PuppeteerMarkdownInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
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
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyleOptional
    h2?: TextStyleOptional
    h3?: TextStyleOptional
    h4?: TextStyleOptional
    h5?: TextStyleOptional
    h6?: TextStyleOptional
    text?: TextStyleOptional
    link?: TextStyleOptional
  }
}
export type ConvertMarkdownWithPuppeteerNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PuppeteerMarkdownInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
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
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyleOptional
    h2?: TextStyleOptional
    h3?: TextStyleOptional
    h4?: TextStyleOptional
    h5?: TextStyleOptional
    h6?: TextStyleOptional
    text?: TextStyleOptional
    link?: TextStyleOptional
  }
}
export type ConvertMarkdownWithPuppeteerNodeInputOptional =
  | ConvertMarkdownWithPuppeteerNodeRemoteInputOptional
  | ConvertMarkdownWithPuppeteerNodeLocalExternalInputOptional
  | ConvertMarkdownWithPuppeteerNodeLocalInternalInputOptional
export type ConvertMarkdownWithPuppeteerNodeLocalExternalInputOptional =
  {
    handle?: 'external'
    input?: {
      format?: PuppeteerMarkdownInputFormat
      file?: RemoteInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: PuppeteerOutputFormat
      file?: LocalOutputPathOptional
    }
    pathScope?: string
    viewport?: {
      width?: number
      height?: number
    }
    proxy?: string
    waitUntil?: PuppeteerLifeCycleEvent
    style?: {
      margin?: {
        x?: number
        y?: number
      }
      h1?: TextStyleOptional
      h2?: TextStyleOptional
      h3?: TextStyleOptional
      h4?: TextStyleOptional
      h5?: TextStyleOptional
      h6?: TextStyleOptional
      text?: TextStyleOptional
      link?: TextStyleOptional
    }
  }
export type ConvertMarkdownWithPuppeteerNodeLocalInputOptional = {
  input?: {
    format?: PuppeteerMarkdownInputFormat
    file?: {
      content?: ArrayBuffer
    }
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyleOptional
    h2?: TextStyleOptional
    h3?: TextStyleOptional
    h4?: TextStyleOptional
    h5?: TextStyleOptional
    h6?: TextStyleOptional
    text?: TextStyleOptional
    link?: TextStyleOptional
  }
}
export type ConvertMarkdownWithPuppeteerNodeLocalInternalInputOptional =
  {
    handle?: 'internal'
    input?: {
      format?: PuppeteerMarkdownInputFormat
      file?: FileInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      format?: PuppeteerOutputFormat
      file?: LocalOutputPathOptional
    }
    pathScope?: string
    viewport?: {
      width?: number
      height?: number
    }
    proxy?: string
    waitUntil?: PuppeteerLifeCycleEvent
    style?: {
      margin?: {
        x?: number
        y?: number
      }
      h1?: TextStyleOptional
      h2?: TextStyleOptional
      h3?: TextStyleOptional
      h4?: TextStyleOptional
      h5?: TextStyleOptional
      h6?: TextStyleOptional
      text?: TextStyleOptional
      link?: TextStyleOptional
    }
  }
export type ConvertMarkdownWithPuppeteerNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertMarkdownWithPuppeteerNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PuppeteerMarkdownInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyleOptional
    h2?: TextStyleOptional
    h3?: TextStyleOptional
    h4?: TextStyleOptional
    h5?: TextStyleOptional
    h6?: TextStyleOptional
    text?: TextStyleOptional
    link?: TextStyleOptional
  }
}
export type ConvertTxtWithPuppeteerNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
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
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text?: TextStyleOptional
  }
}
export type ConvertTxtWithPuppeteerNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
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
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text?: TextStyleOptional
  }
}
export type ConvertTxtWithPuppeteerNodeInputOptional =
  | ConvertTxtWithPuppeteerNodeRemoteInputOptional
  | ConvertTxtWithPuppeteerNodeLocalExternalInputOptional
  | ConvertTxtWithPuppeteerNodeLocalInternalInputOptional
export type ConvertTxtWithPuppeteerNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text?: TextStyleOptional
  }
}
export type ConvertTxtWithPuppeteerNodeLocalInputOptional = {
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: {
      content?: ArrayBuffer
    }
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text?: TextStyleOptional
  }
}
export type ConvertTxtWithPuppeteerNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text?: TextStyleOptional
  }
}
export type ConvertTxtWithPuppeteerNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertTxtWithPuppeteerNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: PuppeteerTxtInputFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text?: TextStyleOptional
  }
}
export type ConvertVideoWithFfmpegNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: FfmpegFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
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
export type ConvertVideoWithFfmpegNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: FfmpegFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
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
export type ConvertVideoWithFfmpegNodeInputOptional =
  | ConvertVideoWithFfmpegNodeRemoteInputOptional
  | ConvertVideoWithFfmpegNodeLocalExternalInputOptional
  | ConvertVideoWithFfmpegNodeLocalInternalInputOptional
export type ConvertVideoWithFfmpegNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: FfmpegFormat
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FfmpegFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
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
export type ConvertVideoWithFfmpegNodeLocalInputOptional = {
  input?: {
    format?: FfmpegFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: FfmpegFormat
    file?: LocalPathOptional
  }
  pathScope?: string
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
export type ConvertVideoWithFfmpegNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: FfmpegFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FfmpegFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
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
export type ConvertVideoWithFfmpegNodeOutputOptional = {
  file?: FilePathOptional
}
export type ConvertVideoWithFfmpegNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: FfmpegFormat
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    format?: FfmpegFormat
    file?: LocalOutputPathOptional
  }
  pathScope?: string
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
export type FormatAssemblyNodeClientInputOptional = {
  handle?: 'client'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatAssemblyNodeExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatAssemblyNodeInputOptional =
  | FormatAssemblyNodeRemoteInputOptional
  | FormatAssemblyNodeLocalExternalInputOptional
  | FormatAssemblyNodeLocalInternalInputOptional
export type FormatAssemblyNodeLocalExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatAssemblyNodeLocalInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatAssemblyNodeLocalInternalInputOptional = {
  handle?: 'internal'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatAssemblyNodeOutputOptional = {
  file?: FilePathOptional
}
export type FormatAssemblyNodeRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatCodeWithClangFormatNodeClientInputOptional =
  ClangStyleAllOptional & {
    handle?: 'client'
    format?: ClangFormat
    input?: {
      file?: FileInputPathOptional | FileContentWithSha256Optional
    }
    output?: {}
  }
export type FormatCodeWithClangFormatNodeExternalInputOptional =
  ClangStyleAllOptional & {
    handle?: 'external'
    format?: ClangFormat
    input?: {
      file?: RemoteInputPathOptional | FileContentWithSha256Optional
    }
    output?: {}
  }
export type FormatCodeWithClangFormatNodeInputOptional =
  | FormatCodeWithClangFormatNodeRemoteInputOptional
  | FormatCodeWithClangFormatNodeLocalExternalInputOptional
  | FormatCodeWithClangFormatNodeLocalInternalInputOptional
export type FormatCodeWithClangFormatNodeLocalExternalInputOptional =
  ClangStyleAllOptional & {
    handle?: 'external'
    format?: ClangFormat
    input?: {
      file?: RemoteInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      file?: LocalOutputPathOptional
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeLocalInputOptional =
  ClangStyleAllOptional & {
    format?: ClangFormat
    input?: {
      file?: LocalPathOptional
    }
    output?: {
      file?: LocalPathOptional
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeLocalInternalInputOptional =
  ClangStyleAllOptional & {
    handle?: 'internal'
    format?: ClangFormat
    input?: {
      file?: FileInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      file?: LocalOutputPathOptional
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeOutputOptional =
  ClangStyleAllOptional & {
    file?: FilePathOptional
  }
export type FormatCodeWithClangFormatNodeRemoteInputOptional =
  ClangStyleAllOptional & {
    handle?: 'remote'
    format?: ClangFormat
    input?: {
      file?: FileInputPathOptional | FileContentWithSha256Optional
    }
    output?: {
      file?: LocalOutputPathOptional
    }
    pathScope?: string
  }
export type FormatKotlinNodeClientInputOptional = {
  handle?: 'client'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatKotlinNodeExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatKotlinNodeInputOptional =
  | FormatKotlinNodeRemoteInputOptional
  | FormatKotlinNodeLocalExternalInputOptional
  | FormatKotlinNodeLocalInternalInputOptional
export type FormatKotlinNodeLocalExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatKotlinNodeLocalInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatKotlinNodeLocalInternalInputOptional = {
  handle?: 'internal'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatKotlinNodeOutputOptional = {
  file?: FilePathOptional
}
export type FormatKotlinNodeRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatPythonNodeClientInputOptional = {
  handle?: 'client'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatPythonNodeExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatPythonNodeInputOptional =
  | FormatPythonNodeRemoteInputOptional
  | FormatPythonNodeLocalExternalInputOptional
  | FormatPythonNodeLocalInternalInputOptional
export type FormatPythonNodeLocalExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatPythonNodeLocalInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatPythonNodeLocalInternalInputOptional = {
  handle?: 'internal'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatPythonNodeOutputOptional = {
  file?: FilePathOptional
}
export type FormatPythonNodeRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatRustNodeClientInputOptional = {
  handle?: 'client'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatRustNodeExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatRustNodeInputOptional =
  | FormatRustNodeRemoteInputOptional
  | FormatRustNodeLocalExternalInputOptional
  | FormatRustNodeLocalInternalInputOptional
export type FormatRustNodeLocalExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatRustNodeLocalInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatRustNodeLocalInternalInputOptional = {
  handle?: 'internal'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatRustNodeOutputOptional = {
  file?: FilePathOptional
}
export type FormatRustNodeRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatSwiftNodeClientInputOptional = {
  handle?: 'client'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatSwiftNodeExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {}
}
export type FormatSwiftNodeInputOptional =
  | FormatSwiftNodeRemoteInputOptional
  | FormatSwiftNodeLocalExternalInputOptional
  | FormatSwiftNodeLocalInternalInputOptional
export type FormatSwiftNodeLocalExternalInputOptional = {
  handle?: 'external'
  format?: string
  input?: {
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatSwiftNodeLocalInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatSwiftNodeLocalInternalInputOptional = {
  handle?: 'internal'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type FormatSwiftNodeOutputOptional = {
  file?: FilePathOptional
}
export type FormatSwiftNodeRemoteInputOptional = {
  handle?: 'remote'
  format?: string
  input?: {
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type SanitizeHtmlNodeClientInputOptional = {
  handle?: 'client'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
}
export type SanitizeHtmlNodeExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: string
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
}
export type SanitizeHtmlNodeInputOptional =
  | SanitizeHtmlNodeRemoteInputOptional
  | SanitizeHtmlNodeLocalExternalInputOptional
  | SanitizeHtmlNodeLocalInternalInputOptional
export type SanitizeHtmlNodeLocalExternalInputOptional = {
  handle?: 'external'
  input?: {
    format?: string
    file?: RemoteInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type SanitizeHtmlNodeLocalInputOptional = {
  input?: {
    format?: string
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type SanitizeHtmlNodeLocalInternalInputOptional = {
  handle?: 'internal'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
export type SanitizeHtmlNodeOutputOptional = {
  file?: FilePathOptional
}
export type SanitizeHtmlNodeRemoteInputOptional = {
  handle?: 'remote'
  input?: {
    format?: string
    file?: FileInputPathOptional | FileContentWithSha256Optional
  }
  output?: {
    file?: LocalOutputPathOptional
  }
  pathScope?: string
}
