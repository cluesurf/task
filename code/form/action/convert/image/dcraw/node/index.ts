import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithDcrawNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
export type ConvertImageWithDcrawNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
export type ConvertImageWithDcrawNodeInput =
  | ConvertImageWithDcrawNodeRemoteInput
  | ConvertImageWithDcrawNodeLocalExternalInput
  | ConvertImageWithDcrawNodeLocalInternalInput
export type ConvertImageWithDcrawNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
export type ConvertImageWithDcrawNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
export type ConvertImageWithDcrawNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
export type ConvertImageWithDcrawNodeOutput = {
  file: FilePath
}
export type ConvertImageWithDcrawNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
