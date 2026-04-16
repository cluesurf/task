import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithRadianceBrowserInput =
  | ConvertImageWithRadianceBrowserRemoteInput
  | ConvertImageWithRadianceBrowserLocalInput
export type ConvertImageWithRadianceBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  reverse?: boolean
}
export type ConvertImageWithRadianceBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithRadianceBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  reverse?: boolean
}
