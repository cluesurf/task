import { CppInputFormat } from '~/code/form/action/compile/code/cpp/index'
import { LocalPath } from '~/code/form/object/file/index'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/form/object/llvm/index'
import { AssemblySyntax } from '~/code/form/object/assembly/index'

export type CompileCppCommandInput = {
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
