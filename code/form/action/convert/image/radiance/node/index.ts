import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithRadianceNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  reverse?: boolean
}
export type ConvertImageWithRadianceNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  reverse?: boolean
}
export type ConvertImageWithRadianceNodeInput =
  | ConvertImageWithRadianceNodeRemoteInput
  | ConvertImageWithRadianceNodeLocalExternalInput
  | ConvertImageWithRadianceNodeLocalInternalInput
export type ConvertImageWithRadianceNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  reverse?: boolean
}
export type ConvertImageWithRadianceNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  reverse?: boolean
}
export type ConvertImageWithRadianceNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  reverse?: boolean
}
export type ConvertImageWithRadianceNodeOutput = {
  file: FilePath
}
export type ConvertImageWithRadianceNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  reverse?: boolean
}
