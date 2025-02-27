import { CppInputFormat } from '~/code/type/action/compile/code/cpp/index'
import { LocalPath } from '~/code/type/object/file/index'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/type/object/llvm/index'
import { AssemblySyntax } from '~/code/type/object/assembly/index'

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
