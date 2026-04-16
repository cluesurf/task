import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithDcrawBrowserInput =
  | ConvertImageWithDcrawBrowserRemoteInput
  | ConvertImageWithDcrawBrowserLocalInput
export type ConvertImageWithDcrawBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
export type ConvertImageWithDcrawBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithDcrawBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
