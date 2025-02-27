import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/type/object/rust/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'

export type CompileRustNodeClientInput = {
  handle: 'client'
  input: {
    format: RustInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustNodeExternalInput = {
  handle: 'external'
  input: {
    format: RustInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    optimize?: boolean
    target?: RustCompilerTarget
  }
  explain?: boolean
}
export type CompileRustNodeInput =
  | CompileRustNodeRemoteInput
  | CompileRustNodeLocalExternalInput
  | CompileRustNodeLocalInternalInput
export type CompileRustNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: RustInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    file?: LocalOutputPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeLocalInput = {
  input: {
    format: RustInputFormat
    file: LocalPath
  }
  output: {
    format: RustOutputFormat
    file: LocalPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: RustInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    file?: LocalOutputPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileRustNodeOutput = {
  file: FilePath
}
export type CompileRustNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: RustInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: RustOutputFormat
    file?: LocalOutputPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
