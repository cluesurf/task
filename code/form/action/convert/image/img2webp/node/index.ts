import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithImg2WebpNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
export type ConvertImageWithImg2WebpNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
export type ConvertImageWithImg2WebpNodeInput =
  | ConvertImageWithImg2WebpNodeRemoteInput
  | ConvertImageWithImg2WebpNodeLocalExternalInput
  | ConvertImageWithImg2WebpNodeLocalInternalInput
export type ConvertImageWithImg2WebpNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
export type ConvertImageWithImg2WebpNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
export type ConvertImageWithImg2WebpNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
export type ConvertImageWithImg2WebpNodeOutput = {
  file: FilePath
}
export type ConvertImageWithImg2WebpNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
