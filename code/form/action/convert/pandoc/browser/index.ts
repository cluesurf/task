import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'
import {
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/form/object/pandoc'

export type ConvertDocumentWithPandocBrowserInput =
  | ConvertDocumentWithPandocBrowserRemoteInput
  | ConvertDocumentWithPandocBrowserLocalInput
export type ConvertDocumentWithPandocBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PandocInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithPandocBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PandocInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
  }
}
