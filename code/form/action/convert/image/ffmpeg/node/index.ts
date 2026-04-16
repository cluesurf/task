import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithFfmpegNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
export type ConvertImageWithFfmpegNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
export type ConvertImageWithFfmpegNodeInput =
  | ConvertImageWithFfmpegNodeRemoteInput
  | ConvertImageWithFfmpegNodeLocalExternalInput
  | ConvertImageWithFfmpegNodeLocalInternalInput
export type ConvertImageWithFfmpegNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
export type ConvertImageWithFfmpegNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
export type ConvertImageWithFfmpegNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
export type ConvertImageWithFfmpegNodeOutput = {
  file: FilePath
}
export type ConvertImageWithFfmpegNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
