import {
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/type/object/calibre/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'

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
    format: CalibreInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeLocalInput = {
  input: {
    format: CalibreInputFormat
    file: LocalPath
  }
  output: {
    format: CalibreOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: CalibreInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithCalibreNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithCalibreNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: CalibreInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
