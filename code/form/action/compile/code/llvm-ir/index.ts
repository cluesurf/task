import { AssemblySyntax } from '~/code/form/object/assembly/index'
import { LlvmArchitecture } from '~/code/form/object/llvm/index'

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
