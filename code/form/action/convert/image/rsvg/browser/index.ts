import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithRsvgBrowserInput =
  | ConvertImageWithRsvgBrowserRemoteInput
  | ConvertImageWithRsvgBrowserLocalInput
export type ConvertImageWithRsvgBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
export type ConvertImageWithRsvgBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithRsvgBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
