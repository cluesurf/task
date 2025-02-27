import { SwiftInputFormat } from '~/code/type/action/compile/code/swift/shared/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'
import { BackendCompilationOutput } from '~/code/type/object/llvm/index'

export type CompileSwiftBrowserInput =
  | CompileSwiftBrowserRemoteInput
  | CompileSwiftBrowserLocalInput
export type CompileSwiftBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: SwiftInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileSwiftBrowserOutput = {
  file: FileContent
}
export type CompileSwiftBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: SwiftInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
  }
}
