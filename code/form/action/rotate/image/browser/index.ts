import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RotateImageBrowserInput =
  | RotateImageBrowserRemoteInput
  | RotateImageBrowserLocalInput
export type RotateImageBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  degree: string
}
export type RotateImageBrowserOutput = {
  file: FileContent
}
export type RotateImageBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  degree: string
}
