import { FontFormat } from '~/code/form/object/font/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file/index'

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
    format: FontFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeLocalInput = {
  input: {
    format: FontFormat
    file: LocalPath
  }
  output: {
    format: FontFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: FontFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertFontWithFontForgeNodeOutput = {
  file: FilePath
}
export type ConvertFontWithFontForgeNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: FontFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FontFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
