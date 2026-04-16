import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithPotraceBrowserInput =
  | ConvertImageWithPotraceBrowserRemoteInput
  | ConvertImageWithPotraceBrowserLocalInput
export type ConvertImageWithPotraceBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
export type ConvertImageWithPotraceBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithPotraceBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  outputFormat?: string
  threshold?: number
  turdsize?: number
}
