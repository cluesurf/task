import { CInputFormat } from '~/code/type/action/compile/code/c/shared/index'
import { LocalPath } from '~/code/type/object/file/index'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/type/object/llvm/index'
import { AssemblySyntax } from '~/code/type/object/assembly/index'

export type CompileCCommandInput = {
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
