import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithGifsicleNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
export type ConvertImageWithGifsicleNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
export type ConvertImageWithGifsicleNodeInput =
  | ConvertImageWithGifsicleNodeRemoteInput
  | ConvertImageWithGifsicleNodeLocalExternalInput
  | ConvertImageWithGifsicleNodeLocalInternalInput
export type ConvertImageWithGifsicleNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
export type ConvertImageWithGifsicleNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
export type ConvertImageWithGifsicleNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
export type ConvertImageWithGifsicleNodeOutput = {
  file: FilePath
}
export type ConvertImageWithGifsicleNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
