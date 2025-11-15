import { CInputFormat } from '~/code/form/action/compile/code/c/shared/index'
import { LocalPath } from '~/code/form/object/file/index'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/form/object/llvm/index'
import { AssemblySyntax } from '~/code/form/object/assembly/index'

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
