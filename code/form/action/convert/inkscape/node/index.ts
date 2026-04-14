import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithInkscapeNodeClientInput = {
  handle: 'client'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertImageWithInkscapeNodeExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertImageWithInkscapeNodeInput =
  | ConvertImageWithInkscapeNodeRemoteInput
  | ConvertImageWithInkscapeNodeLocalExternalInput
  | ConvertImageWithInkscapeNodeLocalInternalInput
export type ConvertImageWithInkscapeNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertImageWithInkscapeNodeOutput = {
  file: FilePath
}
export type ConvertImageWithInkscapeNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
