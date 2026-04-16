import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ModifyPdfBrowserInput =
  | ModifyPdfBrowserRemoteInput
  | ModifyPdfBrowserLocalInput
export type ModifyPdfBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  order?: string
  remove?: string
}
export type ModifyPdfBrowserOutput = {
  file: FileContent
}
export type ModifyPdfBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  order?: string
  remove?: string
}
