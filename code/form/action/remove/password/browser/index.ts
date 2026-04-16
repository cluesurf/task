import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemovePasswordBrowserInput =
  | RemovePasswordBrowserRemoteInput
  | RemovePasswordBrowserLocalInput
export type RemovePasswordBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  password?: string
}
export type RemovePasswordBrowserOutput = {
  file: FileContent
}
export type RemovePasswordBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  password?: string
}
