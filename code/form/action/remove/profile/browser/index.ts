import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveProfileBrowserInput =
  | RemoveProfileBrowserRemoteInput
  | RemoveProfileBrowserLocalInput
export type RemoveProfileBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type RemoveProfileBrowserOutput = {
  file: FileContent
}
export type RemoveProfileBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
