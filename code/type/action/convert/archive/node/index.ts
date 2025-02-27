import { ArchiveFormat } from '~/code/type/object/archive/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'

export type ConvertArchiveNodeClientInput = {
  handle: 'client'
  input: {
    format: ArchiveFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertArchiveNodeExternalInput = {
  handle: 'external'
  input: {
    format: ArchiveFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertArchiveNodeInput =
  | ConvertArchiveNodeRemoteInput
  | ConvertArchiveNodeLocalExternalInput
  | ConvertArchiveNodeLocalInternalInput
export type ConvertArchiveNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: ArchiveFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeLocalInput = {
  input: {
    format: ArchiveFormat
    file: LocalPath
  }
  output: {
    format: ArchiveFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: ArchiveFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertArchiveNodeOutput = {
  file: FilePath
}
export type ConvertArchiveNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: ArchiveFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
