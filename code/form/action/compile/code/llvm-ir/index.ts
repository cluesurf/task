import { AssemblySyntax } from '~/code/form/object/assembly'
import { LlvmArchitecture } from '~/code/form/object/llvm'

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
