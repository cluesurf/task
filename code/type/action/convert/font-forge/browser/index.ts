import { FontFormat } from '~/code/type/object/font/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertFontWithFontForgeBrowserInput =
  | ConvertFontWithFontForgeBrowserRemoteInput
  | ConvertFontWithFontForgeBrowserLocalInput
export type ConvertFontWithFontForgeBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: FontFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: FontFormat
  }
}
export type ConvertFontWithFontForgeBrowserOutput = {
  file: FileContent
}
export type ConvertFontWithFontForgeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: FontFormat
    file: FileContentWithSha256
  }
  output: {
    format: FontFormat
  }
}
