import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithDarktableBrowserInput =
  | ConvertImageWithDarktableBrowserRemoteInput
  | ConvertImageWithDarktableBrowserLocalInput
export type ConvertImageWithDarktableBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
export type ConvertImageWithDarktableBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithDarktableBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
