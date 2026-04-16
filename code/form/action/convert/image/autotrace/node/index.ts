import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithAutotraceNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
export type ConvertImageWithAutotraceNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
export type ConvertImageWithAutotraceNodeInput =
  | ConvertImageWithAutotraceNodeRemoteInput
  | ConvertImageWithAutotraceNodeLocalExternalInput
  | ConvertImageWithAutotraceNodeLocalInternalInput
export type ConvertImageWithAutotraceNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
export type ConvertImageWithAutotraceNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
export type ConvertImageWithAutotraceNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
export type ConvertImageWithAutotraceNodeOutput = {
  file: FilePath
}
export type ConvertImageWithAutotraceNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
