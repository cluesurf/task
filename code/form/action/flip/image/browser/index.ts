import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type FlipImageBrowserInput =
  | FlipImageBrowserRemoteInput
  | FlipImageBrowserLocalInput
export type FlipImageBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  horizontal?: boolean
  vertical?: boolean
}
export type FlipImageBrowserOutput = {
  file: FileContent
}
export type FlipImageBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  horizontal?: boolean
  vertical?: boolean
}
