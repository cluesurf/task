import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithFfmpegBrowserInput =
  | ConvertImageWithFfmpegBrowserRemoteInput
  | ConvertImageWithFfmpegBrowserLocalInput
export type ConvertImageWithFfmpegBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
export type ConvertImageWithFfmpegBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithFfmpegBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
