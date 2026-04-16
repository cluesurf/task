import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithAutotraceBrowserInput =
  | ConvertImageWithAutotraceBrowserRemoteInput
  | ConvertImageWithAutotraceBrowserLocalInput
export type ConvertImageWithAutotraceBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
export type ConvertImageWithAutotraceBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithAutotraceBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}
