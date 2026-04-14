import { SwiftInputFormat } from '~/code/form/action/compile/code/swift/shared'
import { LocalPath } from '~/code/form/object/file'
import { BackendCompilationOutput } from '~/code/form/object/llvm'

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
