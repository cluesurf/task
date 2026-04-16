import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ShapeFontBrowserInput =
  | ShapeFontBrowserRemoteInput
  | ShapeFontBrowserLocalInput
export type ShapeFontBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
export type ShapeFontBrowserOutput = {
  file: FileContent
}
export type ShapeFontBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
