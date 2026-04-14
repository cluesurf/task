import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/form/action/compile/code/wast/shared'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type CompileWastNodeClientInput = {
  handle: 'client'
  input: {
    format: WastInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
  }
}
export type CompileWastNodeExternalInput = {
  handle: 'external'
  input: {
    format: WastInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
  }
}
export type CompileWastNodeInput =
  | CompileWastNodeRemoteInput
  | CompileWastNodeLocalExternalInput
  | CompileWastNodeLocalInternalInput
export type CompileWastNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: WastInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileWastNodeLocalInput = {
  input: {
    format: WastInputFormat
    file: LocalPath
  }
  output: {
    format: WastOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type CompileWastNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: WastInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type CompileWastNodeOutput = {
  file: FilePath
}
export type CompileWastNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: WastInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
