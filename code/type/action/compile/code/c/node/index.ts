import { CInputFormat } from '~/code/type/action/compile/code/c/shared/index'
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
