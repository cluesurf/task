import {
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/form/object/calibre'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertDocumentWithCalibreBrowserInput =
  | ConvertDocumentWithCalibreBrowserRemoteInput
  | ConvertDocumentWithCalibreBrowserLocalInput
export type ConvertDocumentWithCalibreBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: CalibreInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: CalibreOutputFormat
  }
}
export type ConvertDocumentWithCalibreBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithCalibreBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: CalibreInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: CalibreOutputFormat
  }
}
