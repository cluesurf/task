import { CppInputFormat } from '~/code/form/action/compile/code/cpp'
import { AssemblySyntax } from '~/code/form/object/assembly'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/form/object/llvm'

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
