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
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
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
  LocalOutputPath,
  LocalPath,
  PandocInputFormat,
  PandocOutputFormat,
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
  RemoteInputPath,
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
  SwiftInputFormat,
  TextStyle,
  WastInputFormat,
  WastOutputFormat,
} from '~/code/type/shared/index'
import { ClangStyleAll } from '~/code/type/shared/clang-format'

export type CompileCNodeClientInput = {
  handle: 'client'
  input: {
    format: CInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeExternalInput = {
  handle: 'external'
  input: {
    format: CInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeInput =
  | CompileCNodeRemoteInput
  | CompileCNodeLocalExternalInput
  | CompileCNodeLocalInternalInput
export type CompileCNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: CInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeLocalInput = {
  input: {
    format: CInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: CInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCNodeOutput = {
  file: FilePath
}
export type CompileCNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: CInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeClientInput = {
  handle: 'client'
  input: {
    format: CppInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeExternalInput = {
  handle: 'external'
  input: {
    format: CppInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeInput =
  | CompileCppNodeRemoteInput
  | CompileCppNodeLocalExternalInput
  | CompileCppNodeLocalInternalInput
export type CompileCppNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: CppInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeLocalInput = {
  input: {
    format: CppInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: CppInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCppNodeOutput = {
  file: FilePath
}
export type CompileCppNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: CppInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileRustNodeClientInput = {
  handle: 'client'
  input: {
    format: RustInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustNodeExternalInput = {
  handle: 'external'
  input: {
    format: RustInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustNodeInput =
  | CompileRustNodeRemoteInput
  | CompileRustNodeLocalExternalInput
  | CompileRustNodeLocalInternalInput
export type CompileRustNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: RustInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    file?: LocalOutputPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeLocalInput = {
  input: {
    format: RustInputFormat
    file: LocalPath
  }
  output: {
    format: RustOutputFormat
    file: LocalPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: RustInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    file?: LocalOutputPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeOutput = {
  file: FilePath
}
export type CompileRustNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: RustInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    file?: LocalOutputPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileSwiftNodeClientInput = {
  handle: 'client'
  input: {
    format: SwiftInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileSwiftNodeExternalInput = {
  handle: 'external'
  input: {
    format: SwiftInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileSwiftNodeInput =
  | CompileSwiftNodeRemoteInput
  | CompileSwiftNodeLocalExternalInput
  | CompileSwiftNodeLocalInternalInput
export type CompileSwiftNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: SwiftInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileSwiftNodeLocalInput = {
  input: {
    format: SwiftInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
  }
  pathScope?: string
}
export type CompileSwiftNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: SwiftInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileSwiftNodeOutput = {
  file: FilePath
}
export type CompileSwiftNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: SwiftInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileWastNodeClientInput = {
  handle: 'client'
  input: {
    format: WastInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
  }
}
export type CompileWastNodeExternalInput = {
  handle: 'external'
  input: {
    format: WastInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
  }
}
export type CompileWastNodeInput =
  | CompileWastNodeRemoteInput
  | CompileWastNodeLocalExternalInput
  | CompileWastNodeLocalInternalInput
export type CompileWastNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: WastInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileWastNodeLocalInput = {
  input: {
    format: WastInputFormat
    file: LocalPath
  }
  output: {
    format: WastOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type CompileWastNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: WastInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileWastNodeOutput = {
  file: FilePath
}
export type CompileWastNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: WastInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeClientInput = {
  handle: 'client'
  input: {
    format: ArchiveFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertArchiveNodeExternalInput = {
  handle: 'external'
  input: {
    format: ArchiveFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertArchiveNodeInput =
  | ConvertArchiveNodeRemoteInput
  | ConvertArchiveNodeLocalExternalInput
  | ConvertArchiveNodeLocalInternalInput
export type ConvertArchiveNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: ArchiveFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeLocalInput = {
  input: {
    format: ArchiveFormat
    file: LocalPath
  }
  output: {
    format: ArchiveFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: ArchiveFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeOutput = {
  file: FilePath
}
export type ConvertArchiveNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: ArchiveFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeClientInput = {
  handle: 'client'
  input: {
    format: CalibreInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreNodeExternalInput = {
  handle: 'external'
  input: {
    format: CalibreInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreNodeInput =
  | ConvertDocumentWithCalibreNodeRemoteInput
  | ConvertDocumentWithCalibreNodeLocalExternalInput
  | ConvertDocumentWithCalibreNodeLocalInternalInput
export type ConvertDocumentWithCalibreNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: CalibreInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeLocalInput = {
  input: {
    format: CalibreInputFormat
    file: LocalPath
  }
  output: {
    format: CalibreOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: CalibreInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithCalibreNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: CalibreInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptNodeClientInput = {
  handle: 'client'
  input: {
    format: EnscriptInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptNodeExternalInput = {
  handle: 'external'
  input: {
    format: EnscriptInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptNodeInput =
  | ConvertDocumentWithEnscriptNodeRemoteInput
  | ConvertDocumentWithEnscriptNodeLocalExternalInput
  | ConvertDocumentWithEnscriptNodeLocalInternalInput
export type ConvertDocumentWithEnscriptNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: EnscriptInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptNodeLocalInput = {
  input: {
    format: EnscriptInputFormat
    file: LocalPath
  }
  output: {
    format: EnscriptOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: EnscriptInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithEnscriptNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: EnscriptInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeClientInput = {
  handle: 'client'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithJupyterNodeExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithJupyterNodeInput =
  | ConvertDocumentWithJupyterNodeRemoteInput
  | ConvertDocumentWithJupyterNodeLocalExternalInput
  | ConvertDocumentWithJupyterNodeLocalInternalInput
export type ConvertDocumentWithJupyterNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithJupyterNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeClientInput = {
  handle: 'client'
  input: {
    format: LibreOfficeInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeNodeExternalInput = {
  handle: 'external'
  input: {
    format: LibreOfficeInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeNodeInput =
  | ConvertDocumentWithLibreOfficeNodeRemoteInput
  | ConvertDocumentWithLibreOfficeNodeLocalExternalInput
  | ConvertDocumentWithLibreOfficeNodeLocalInternalInput
export type ConvertDocumentWithLibreOfficeNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: LibreOfficeInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeLocalInput = {
  input: {
    format: LibreOfficeInputFormat
    file: LocalPath
  }
  output: {
    format: LibreOfficeOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: LibreOfficeInputFormat
    file: FileInputPath | FileContent
  }
  output: {
    format: LibreOfficeOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithLibreOfficeNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: LibreOfficeInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeClientInput = {
  handle: 'client'
  input: {
    format: PandocInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocNodeExternalInput = {
  handle: 'external'
  input: {
    format: PandocInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocNodeInput =
  | ConvertDocumentWithPandocNodeRemoteInput
  | ConvertDocumentWithPandocNodeLocalExternalInput
  | ConvertDocumentWithPandocNodeLocalInternalInput
export type ConvertDocumentWithPandocNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PandocInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeLocalInput = {
  input: {
    format: PandocInputFormat
    file: LocalPath
  }
  output: {
    format: PandocOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PandocInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithPandocNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PandocInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeClientInput = {
  handle: 'client'
  input: {
    format: FontFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
  }
}
export type ConvertFontWithFontForgeNodeExternalInput = {
  handle: 'external'
  input: {
    format: FontFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
  }
}
export type ConvertFontWithFontForgeNodeInput =
  | ConvertFontWithFontForgeNodeRemoteInput
  | ConvertFontWithFontForgeNodeLocalExternalInput
  | ConvertFontWithFontForgeNodeLocalInternalInput
export type ConvertFontWithFontForgeNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: FontFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeLocalInput = {
  input: {
    format: FontFormat
    file: LocalPath
  }
  output: {
    format: FontFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: FontFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeOutput = {
  file: FilePath
}
export type ConvertFontWithFontForgeNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: FontFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertHtmlWithPuppeteerNodeClientInput = {
  handle: 'client'
  input: {
    format: PuppeteerInputFormat
    file: FileInputPath | FileContentWithSha256
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
export type ConvertHtmlWithPuppeteerNodeExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerInputFormat
    file: RemoteInputPath | FileContentWithSha256
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
export type ConvertHtmlWithPuppeteerNodeInput =
  | ConvertHtmlWithPuppeteerNodeRemoteInput
  | ConvertHtmlWithPuppeteerNodeLocalExternalInput
  | ConvertHtmlWithPuppeteerNodeLocalInternalInput
export type ConvertHtmlWithPuppeteerNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeLocalInput = {
  input: {
    format: PuppeteerInputFormat
    file: LocalPath
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PuppeteerInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeOutput = {
  file: FilePath
}
export type ConvertHtmlWithPuppeteerNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertImageWithImageMagickNodeClientInput = {
  handle: 'client'
  input: {
    format: ImageMagickInputFormat
    file: FileInputPath | FileContentWithSha256
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
export type ConvertImageWithImageMagickNodeExternalInput = {
  handle: 'external'
  input: {
    format: ImageMagickInputFormat
    file: RemoteInputPath | FileContentWithSha256
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
export type ConvertImageWithImageMagickNodeInput =
  | ConvertImageWithImageMagickNodeRemoteInput
  | ConvertImageWithImageMagickNodeLocalExternalInput
  | ConvertImageWithImageMagickNodeLocalInternalInput
export type ConvertImageWithImageMagickNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: ImageMagickInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeLocalInput = {
  input: {
    format: ImageMagickInputFormat
    file: LocalPath
  }
  output: {
    format: ImageMagickOutputFormat
    file: LocalPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: ImageMagickInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeOutput = {
  file: FilePath
}
export type ConvertImageWithImageMagickNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: ImageMagickInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithInkscapeNodeClientInput = {
  handle: 'client'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertImageWithInkscapeNodeExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertImageWithInkscapeNodeInput =
  | ConvertImageWithInkscapeNodeRemoteInput
  | ConvertImageWithInkscapeNodeLocalExternalInput
  | ConvertImageWithInkscapeNodeLocalInternalInput
export type ConvertImageWithInkscapeNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeOutput = {
  file: FilePath
}
export type ConvertImageWithInkscapeNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeClientInput = {
  handle: 'client'
  input: {
    format: ConvertLatexToPngInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngNodeExternalInput = {
  handle: 'external'
  input: {
    format: ConvertLatexToPngInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngNodeInput =
  | ConvertLatexToPngNodeRemoteInput
  | ConvertLatexToPngNodeLocalExternalInput
  | ConvertLatexToPngNodeLocalInternalInput
export type ConvertLatexToPngNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: ConvertLatexToPngInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeLocalInput = {
  input: {
    format: ConvertLatexToPngInputFormat
    file: LocalPath
  }
  output: {
    format: ConvertLatexToPngOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: ConvertLatexToPngInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeOutput = {
  file: FilePath
}
export type ConvertLatexToPngNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: ConvertLatexToPngInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeClientInput = {
  handle: 'client'
  input: {
    format: PdfLatexInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexNodeExternalInput = {
  handle: 'external'
  input: {
    format: PdfLatexInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexNodeInput =
  | ConvertLatexWithPdfLatexNodeRemoteInput
  | ConvertLatexWithPdfLatexNodeLocalExternalInput
  | ConvertLatexWithPdfLatexNodeLocalInternalInput
export type ConvertLatexWithPdfLatexNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PdfLatexInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInput = {
  input: {
    format: PdfLatexInputFormat
    file: LocalPath
  }
  output: {
    format: PdfLatexOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PdfLatexInputFormat
    file: FileInputPath | FileContent
  }
  output: {
    format: PdfLatexOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeOutput = {
  file: FilePath
}
export type ConvertLatexWithPdfLatexNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PdfLatexInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertMarkdownWithPuppeteerNodeClientInput = {
  handle: 'client'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
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
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
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
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeInput =
  | ConvertMarkdownWithPuppeteerNodeRemoteInput
  | ConvertMarkdownWithPuppeteerNodeLocalExternalInput
  | ConvertMarkdownWithPuppeteerNodeLocalInternalInput
export type ConvertMarkdownWithPuppeteerNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
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
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeLocalInput = {
  input: {
    format: PuppeteerMarkdownInputFormat
    file: {
      content: ArrayBuffer
    }
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
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
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
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
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeOutput = {
  file: FilePath
}
export type ConvertMarkdownWithPuppeteerNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
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
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeClientInput = {
  handle: 'client'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
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
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerTxtInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
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
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeInput =
  | ConvertTxtWithPuppeteerNodeRemoteInput
  | ConvertTxtWithPuppeteerNodeLocalExternalInput
  | ConvertTxtWithPuppeteerNodeLocalInternalInput
export type ConvertTxtWithPuppeteerNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerTxtInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
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
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeLocalInput = {
  input: {
    format: PuppeteerTxtInputFormat
    file: {
      content: ArrayBuffer
    }
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
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
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
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
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeOutput = {
  file: FilePath
}
export type ConvertTxtWithPuppeteerNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
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
    text: TextStyle
  }
}
export type ConvertVideoWithFfmpegNodeClientInput = {
  handle: 'client'
  input: {
    format: FfmpegFormat
    file: FileInputPath | FileContentWithSha256
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
export type ConvertVideoWithFfmpegNodeExternalInput = {
  handle: 'external'
  input: {
    format: FfmpegFormat
    file: RemoteInputPath | FileContentWithSha256
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
export type ConvertVideoWithFfmpegNodeInput =
  | ConvertVideoWithFfmpegNodeRemoteInput
  | ConvertVideoWithFfmpegNodeLocalExternalInput
  | ConvertVideoWithFfmpegNodeLocalInternalInput
export type ConvertVideoWithFfmpegNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: FfmpegFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
    file?: LocalOutputPath
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
export type ConvertVideoWithFfmpegNodeLocalInput = {
  input: {
    format: FfmpegFormat
    file: LocalPath
  }
  output: {
    format: FfmpegFormat
    file: LocalPath
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
export type ConvertVideoWithFfmpegNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: FfmpegFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
    file?: LocalOutputPath
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
export type ConvertVideoWithFfmpegNodeOutput = {
  file: FilePath
}
export type ConvertVideoWithFfmpegNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: FfmpegFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
    file?: LocalOutputPath
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
export type FormatAssemblyNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatAssemblyNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatAssemblyNodeInput =
  | FormatAssemblyNodeRemoteInput
  | FormatAssemblyNodeLocalExternalInput
  | FormatAssemblyNodeLocalInternalInput
export type FormatAssemblyNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatAssemblyNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatAssemblyNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatAssemblyNodeOutput = {
  file: FilePath
}
export type FormatAssemblyNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatCodeWithClangFormatNodeClientInput = ClangStyleAll & {
  handle: 'client'
  format: ClangFormat
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatCodeWithClangFormatNodeExternalInput =
  ClangStyleAll & {
    handle: 'external'
    format: ClangFormat
    input: {
      file: RemoteInputPath | FileContentWithSha256
    }
    output: {}
  }
export type FormatCodeWithClangFormatNodeInput =
  | FormatCodeWithClangFormatNodeRemoteInput
  | FormatCodeWithClangFormatNodeLocalExternalInput
  | FormatCodeWithClangFormatNodeLocalInternalInput
export type FormatCodeWithClangFormatNodeLocalExternalInput =
  ClangStyleAll & {
    handle: 'external'
    format: ClangFormat
    input: {
      file: RemoteInputPath | FileContentWithSha256
    }
    output: {
      file?: LocalOutputPath
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeLocalInput = ClangStyleAll & {
  format: ClangFormat
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatCodeWithClangFormatNodeLocalInternalInput =
  ClangStyleAll & {
    handle?: 'internal'
    format: ClangFormat
    input: {
      file: FileInputPath | FileContentWithSha256
    }
    output: {
      file?: LocalOutputPath
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeOutput = ClangStyleAll & {
  file: FilePath
}
export type FormatCodeWithClangFormatNodeRemoteInput = ClangStyleAll & {
  handle: 'remote'
  format: ClangFormat
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatKotlinNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatKotlinNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatKotlinNodeInput =
  | FormatKotlinNodeRemoteInput
  | FormatKotlinNodeLocalExternalInput
  | FormatKotlinNodeLocalInternalInput
export type FormatKotlinNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatKotlinNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatKotlinNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatKotlinNodeOutput = {
  file: FilePath
}
export type FormatKotlinNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatPythonNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatPythonNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatPythonNodeInput =
  | FormatPythonNodeRemoteInput
  | FormatPythonNodeLocalExternalInput
  | FormatPythonNodeLocalInternalInput
export type FormatPythonNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatPythonNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatPythonNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatPythonNodeOutput = {
  file: FilePath
}
export type FormatPythonNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatRustNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatRustNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatRustNodeInput =
  | FormatRustNodeRemoteInput
  | FormatRustNodeLocalExternalInput
  | FormatRustNodeLocalInternalInput
export type FormatRustNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatRustNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatRustNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatRustNodeOutput = {
  file: FilePath
}
export type FormatRustNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatSwiftNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatSwiftNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatSwiftNodeInput =
  | FormatSwiftNodeRemoteInput
  | FormatSwiftNodeLocalExternalInput
  | FormatSwiftNodeLocalInternalInput
export type FormatSwiftNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatSwiftNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatSwiftNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatSwiftNodeOutput = {
  file: FilePath
}
export type FormatSwiftNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeClientInput = {
  handle: 'client'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
}
export type SanitizeHtmlNodeExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
}
export type SanitizeHtmlNodeInput =
  | SanitizeHtmlNodeRemoteInput
  | SanitizeHtmlNodeLocalExternalInput
  | SanitizeHtmlNodeLocalInternalInput
export type SanitizeHtmlNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeOutput = {
  file: FilePath
}
export type SanitizeHtmlNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
