import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/form/object/enscript'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertDocumentWithEnscriptNodeClientInput = {
  handle: 'client'
  input: {
    format: EnscriptInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptNodeExternalInput = {
  handle: 'external'
  input: {
    format: EnscriptInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptNodeInput =
  | ConvertDocumentWithEnscriptNodeRemoteInput
  | ConvertDocumentWithEnscriptNodeLocalExternalInput
  | ConvertDocumentWithEnscriptNodeLocalInternalInput
export type ConvertDocumentWithEnscriptNodeLocalExternalInput = {
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
export type ConvertDocumentWithEnscriptNodeLocalInput = {
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
export type ConvertDocumentWithEnscriptNodeLocalInternalInput = {
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
export type ConvertDocumentWithEnscriptNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithEnscriptNodeRemoteInput = {
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
