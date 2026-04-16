import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type TrimImageBrowserInput =
  | TrimImageBrowserRemoteInput
  | TrimImageBrowserLocalInput
export type TrimImageBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  crop: string
}
export type TrimImageBrowserOutput = {
  file: FileContent
}
export type TrimImageBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  crop: string
}
