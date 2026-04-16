import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RenderFontBrowserInput =
  | RenderFontBrowserRemoteInput
  | RenderFontBrowserLocalInput
export type RenderFontBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  text: string
  fontSize?: number
  features?: string
}
export type RenderFontBrowserOutput = {
  file: FileContent
}
export type RenderFontBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  text: string
  fontSize?: number
  features?: string
}
