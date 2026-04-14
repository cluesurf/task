import { CppInputFormat } from '~/code/form/action/compile/code/cpp'
import { AssemblySyntax } from '~/code/form/object/assembly'
import { LocalPath } from '~/code/form/object/file'
import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmOptimizationLevel,
} from '~/code/form/object/llvm'

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
