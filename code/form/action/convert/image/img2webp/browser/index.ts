import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithImg2WebpBrowserInput =
  | ConvertImageWithImg2WebpBrowserRemoteInput
  | ConvertImageWithImg2WebpBrowserLocalInput
export type ConvertImageWithImg2WebpBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
export type ConvertImageWithImg2WebpBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithImg2WebpBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
