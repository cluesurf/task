import { CppInputFormat } from '~/code/type/action/compile/code/cpp/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/type/object/llvm/index'
import { AssemblySyntax } from '~/code/type/object/assembly/index'

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
