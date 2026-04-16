import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithRawtherapeeBrowserInput =
  | ConvertImageWithRawtherapeeBrowserRemoteInput
  | ConvertImageWithRawtherapeeBrowserLocalInput
export type ConvertImageWithRawtherapeeBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
export type ConvertImageWithRawtherapeeBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithRawtherapeeBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
