import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithGifsicleBrowserInput =
  | ConvertImageWithGifsicleBrowserRemoteInput
  | ConvertImageWithGifsicleBrowserLocalInput
export type ConvertImageWithGifsicleBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
export type ConvertImageWithGifsicleBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithGifsicleBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
