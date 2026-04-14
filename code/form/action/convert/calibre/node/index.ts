import {
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/form/object/calibre'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertDocumentWithCalibreNodeClientInput = {
  handle: 'client'
  input: {
    format: CalibreInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreNodeExternalInput = {
  handle: 'external'
  input: {
    format: CalibreInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreNodeInput =
  | ConvertDocumentWithCalibreNodeRemoteInput
  | ConvertDocumentWithCalibreNodeLocalExternalInput
  | ConvertDocumentWithCalibreNodeLocalInternalInput
export type ConvertDocumentWithCalibreNodeLocalExternalInput = {
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
export type ConvertDocumentWithCalibreNodeLocalInput = {
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
export type ConvertDocumentWithCalibreNodeLocalInternalInput = {
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
export type ConvertDocumentWithCalibreNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithCalibreNodeRemoteInput = {
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
