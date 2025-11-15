import { SwiftInputFormat } from '~/code/form/action/compile/code/swift/shared/index'
import { LocalPath } from '~/code/form/object/file/index'
import { BackendCompilationOutput } from '~/code/form/object/llvm/index'

export type CompileSwiftCommandInput = {
  input: {
    format: SwiftInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
  }
  pathScope?: string
}
