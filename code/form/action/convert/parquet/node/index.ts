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

export type ConvertParquetNodeClientInput = {
  handle: 'client'
  input: {
    format: DataFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: DataFormat
  }
}
export type ConvertParquetNodeExternalInput = {
  handle: 'external'
  input: {
    format: DataFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: DataFormat
  }
}
export type ConvertParquetNodeInput =
  | ConvertParquetNodeRemoteInput
  | ConvertParquetNodeLocalExternalInput
  | ConvertParquetNodeLocalInternalInput
export type ConvertParquetNodeLocalExternalInput = {
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
export type ConvertParquetNodeLocalInput = {
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
export type ConvertParquetNodeLocalInternalInput = {
  handle?: 'internal'
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
export type ConvertParquetNodeOutput = {
  file: FilePath
}
export type ConvertParquetNodeRemoteInput = {
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
