import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/type/object/libre-office/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertDocumentWithLibreOfficeBrowserInput =
  | ConvertDocumentWithLibreOfficeBrowserRemoteInput
  | ConvertDocumentWithLibreOfficeBrowserLocalInput
export type ConvertDocumentWithLibreOfficeBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: LibreOfficeInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
export type ConvertDocumentWithLibreOfficeBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithLibreOfficeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: LibreOfficeInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: LibreOfficeOutputFormat
  }
}
