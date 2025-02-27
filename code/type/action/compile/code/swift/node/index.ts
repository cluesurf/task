import { SwiftInputFormat } from '~/code/type/action/compile/code/swift/shared/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'
import { BackendCompilationOutput } from '~/code/type/object/llvm/index'

export type CompileSwiftNodeClientInput = {
  handle: 'client'
  input: {
    format: SwiftInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileSwiftNodeExternalInput = {
  handle: 'external'
  input: {
    format: SwiftInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
  }
}
export type CompileSwiftNodeInput =
  | CompileSwiftNodeRemoteInput
  | CompileSwiftNodeLocalExternalInput
  | CompileSwiftNodeLocalInternalInput
export type CompileSwiftNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: SwiftInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileSwiftNodeLocalInput = {
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
export type CompileSwiftNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: SwiftInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileSwiftNodeOutput = {
  file: FilePath
}
export type CompileSwiftNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: SwiftInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: BackendCompilationOutput
    file?: LocalOutputPath
  }
  pathScope?: string
}
