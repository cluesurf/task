import { DataFormat } from '~/code/form/object/data'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertParquetBrowserInput =
  | ConvertParquetBrowserRemoteInput
  | ConvertParquetBrowserLocalInput
export type ConvertParquetBrowserLocalInput = {
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
export type ConvertParquetBrowserOutput = {
  file: FileContent
}
export type ConvertParquetBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: DataFormat
    file: FileContentWithSha256
  }
  output: {
    format: DataFormat
  }
}
