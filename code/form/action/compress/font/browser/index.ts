import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type CompressFontBrowserInput =
  | CompressFontBrowserRemoteInput
  | CompressFontBrowserLocalInput
export type CompressFontBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type CompressFontBrowserOutput = {
  file: FileContent
}
export type CompressFontBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
