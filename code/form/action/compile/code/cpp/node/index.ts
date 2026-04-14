import { CppInputFormat } from '~/code/form/action/compile/code/cpp'
import { AssemblySyntax } from '~/code/form/object/assembly'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/form/object/llvm'

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
