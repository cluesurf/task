import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file/index'

export type SanitizeHtmlBrowserInput =
  | SanitizeHtmlBrowserRemoteInput
  | SanitizeHtmlBrowserLocalInput
export type SanitizeHtmlBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: string
    file: {
      content: FileContent
    }
  }
}
export type SanitizeHtmlBrowserOutput = {
  file: FileContent
}
export type SanitizeHtmlBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileContentWithSha256
  }
}
