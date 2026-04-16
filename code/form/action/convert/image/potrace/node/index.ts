import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithPotraceNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
export type ConvertImageWithPotraceNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
export type ConvertImageWithPotraceNodeInput =
  | ConvertImageWithPotraceNodeRemoteInput
  | ConvertImageWithPotraceNodeLocalExternalInput
  | ConvertImageWithPotraceNodeLocalInternalInput
export type ConvertImageWithPotraceNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
export type ConvertImageWithPotraceNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
export type ConvertImageWithPotraceNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
export type ConvertImageWithPotraceNodeOutput = {
  file: FilePath
}
export type ConvertImageWithPotraceNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
