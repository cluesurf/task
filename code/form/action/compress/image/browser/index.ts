import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type CompressImageBrowserInput =
  | CompressImageBrowserRemoteInput
  | CompressImageBrowserLocalInput
export type CompressImageBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  quality?: string
}
export type CompressImageBrowserOutput = {
  file: FileContent
}
export type CompressImageBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  quality?: string
}
