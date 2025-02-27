import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/type/object/rust/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type CompileRustBrowserInput =
  | CompileRustBrowserRemoteInput
  | CompileRustBrowserLocalInput
export type CompileRustBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: RustInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustBrowserOutput = {
  file: FileContent
}
export type CompileRustBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: RustInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
