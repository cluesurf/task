import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveTransparencyBrowserInput =
  | RemoveTransparencyBrowserRemoteInput
  | RemoveTransparencyBrowserLocalInput
export type RemoveTransparencyBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  background?: string
}
export type RemoveTransparencyBrowserOutput = {
  file: FileContent
}
export type RemoveTransparencyBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  background?: string
}
