import { SwiftInputFormat } from '~/code/type/action/compile/code/swift/shared/index'
import { LocalPath } from '~/code/type/object/file/index'
import { BackendCompilationOutput } from '~/code/type/object/llvm/index'

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
