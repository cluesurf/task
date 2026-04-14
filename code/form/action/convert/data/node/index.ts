import { DataFormat } from '~/code/form/object/data'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertDataNodeClientInput = {
  handle: 'client'
  input: {
    format: DataFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: DataFormat
  }
}
export type ConvertDataNodeExternalInput = {
  handle: 'external'
  input: {
    format: DataFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: DataFormat
  }
}
export type ConvertDataNodeInput =
  | ConvertDataNodeRemoteInput
  | ConvertDataNodeLocalExternalInput
  | ConvertDataNodeLocalInternalInput
export type ConvertDataNodeLocalExternalInput = {
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
export type ConvertDataNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    directory: LocalPath
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertDataNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: DataFormat
    directory: LocalPath
  }
  output: {
    format: DataFormat
    directory: LocalPath
  }
  merge?: boolean
  pathScope?: string
}
export type ConvertDataNodeOutput = {
  converted: number
  skipped: number
  failed: number
}
export type ConvertDataNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    directory?: LocalOutputPath
    file?: LocalPath
  }
  pathScope?: string
}
