import { DataFormat } from '~/code/form/object/data'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertDataBrowserInput =
  | ConvertDataBrowserRemoteInput
  | ConvertDataBrowserLocalInput
export type ConvertDataBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: DataFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: DataFormat
  }
}
export type ConvertDataBrowserOutput = {
  file: FileContent
}
export type ConvertDataBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: DataFormat
    file: FileContentWithSha256
  }
  output: {
    format: DataFormat
  }
}
