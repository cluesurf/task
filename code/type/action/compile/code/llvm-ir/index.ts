import { AssemblySyntax } from '~/code/type/object/assembly/index'
import { LlvmArchitecture } from '~/code/type/object/llvm/index'

export type CompileLlvmIrToAssembly = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
    file: {
      path: string
    }
  }
}
