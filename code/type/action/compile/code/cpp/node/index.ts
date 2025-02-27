import { CppInputFormat } from '~/code/type/action/compile/code/cpp/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/type/object/llvm/index'
import { AssemblySyntax } from '~/code/type/object/assembly/index'

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
