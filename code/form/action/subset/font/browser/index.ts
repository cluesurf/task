import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type SubsetFontBrowserInput =
  | SubsetFontBrowserRemoteInput
  | SubsetFontBrowserLocalInput
export type SubsetFontBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
export type SubsetFontBrowserOutput = {
  file: FileContent
}
export type SubsetFontBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
