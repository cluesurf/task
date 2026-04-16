import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type UpdateFontBrowserInput =
  | UpdateFontBrowserRemoteInput
  | UpdateFontBrowserLocalInput
export type UpdateFontBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  fea: string
}
export type UpdateFontBrowserOutput = {
  file: FileContent
}
export type UpdateFontBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  fea: string
}
