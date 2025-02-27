import { CInputFormat } from '~/code/type/action/compile/code/c/shared/index'
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
