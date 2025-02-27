import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/type/object/libre-office/index'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'

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
    format: LibreOfficeInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeLocalInput = {
  input: {
    format: LibreOfficeInputFormat
    file: LocalPath
  }
  output: {
    format: LibreOfficeOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: LibreOfficeInputFormat
    file: FileInputPath | FileContent
  }
  output: {
    format: LibreOfficeOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithLibreOfficeNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: LibreOfficeInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
