import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'
import { FontFormat } from '~/code/form/object/font'

export type ConvertFontWithFontForgeNodeClientInput = {
  handle: 'client'
  input: {
    format: FontFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
  }
}
export type ConvertFontWithFontForgeNodeExternalInput = {
  handle: 'external'
  input: {
    format: FontFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
  }
}
export type ConvertFontWithFontForgeNodeInput =
  | ConvertFontWithFontForgeNodeRemoteInput
  | ConvertFontWithFontForgeNodeLocalExternalInput
  | ConvertFontWithFontForgeNodeLocalInternalInput
export type ConvertFontWithFontForgeNodeLocalExternalInput = {
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
export type ConvertFontWithFontForgeNodeLocalInput = {
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
export type ConvertFontWithFontForgeNodeLocalInternalInput = {
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
export type ConvertFontWithFontForgeNodeOutput = {
  file: FilePath
}
export type ConvertFontWithFontForgeNodeRemoteInput = {
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
