import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/type/object/enscript/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertDocumentWithEnscriptBrowserInput =
  | ConvertDocumentWithEnscriptBrowserRemoteInput
  | ConvertDocumentWithEnscriptBrowserLocalInput
export type ConvertDocumentWithEnscriptBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: EnscriptInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: EnscriptOutputFormat
  }
}
export type ConvertDocumentWithEnscriptBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithEnscriptBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: EnscriptInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: EnscriptOutputFormat
  }
}
