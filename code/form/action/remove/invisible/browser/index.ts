import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveInvisibleBrowserInput =
  | RemoveInvisibleBrowserRemoteInput
  | RemoveInvisibleBrowserLocalInput
export type RemoveInvisibleBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type RemoveInvisibleBrowserOutput = {
  file: FileContent
}
export type RemoveInvisibleBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
