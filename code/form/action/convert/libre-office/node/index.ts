import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'
import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/form/object/libre-office'

export type ConvertDocumentWithLibreOfficeNodeClientInput = {
  handle: 'client'
  input: {
    format: LibreOfficeInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeNodeExternalInput = {
  handle: 'external'
  input: {
    format: LibreOfficeInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeNodeInput =
  | ConvertDocumentWithLibreOfficeNodeRemoteInput
  | ConvertDocumentWithLibreOfficeNodeLocalExternalInput
  | ConvertDocumentWithLibreOfficeNodeLocalInternalInput
export type ConvertDocumentWithLibreOfficeNodeLocalExternalInput = {
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
export type ConvertDocumentWithLibreOfficeNodeLocalInput = {
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
export type ConvertDocumentWithLibreOfficeNodeLocalInternalInput = {
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
export type ConvertDocumentWithLibreOfficeNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithLibreOfficeNodeRemoteInput = {
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
