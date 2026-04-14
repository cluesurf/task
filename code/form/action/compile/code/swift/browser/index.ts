import { SwiftInputFormat } from '~/code/form/action/compile/code/swift/shared'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'
import { BackendCompilationOutput } from '~/code/form/object/llvm'

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
