import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file/index'

export type ConvertImageWithInkscapeBrowserInput =
  | ConvertImageWithInkscapeBrowserRemoteInput
  | ConvertImageWithInkscapeBrowserLocalInput
export type ConvertImageWithInkscapeBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: string
    file: {
      content: FileContent
    }
  }
  output: {
    format: string
  }
}
export type ConvertImageWithInkscapeBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithInkscapeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileContentWithSha256
  }
  output: {
    format: string
  }
}
