import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DecryptFileBrowserInput =
  | DecryptFileBrowserRemoteInput
  | DecryptFileBrowserLocalInput
export type DecryptFileBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
export type DecryptFileBrowserOutput = {
  file: FileContent
}
export type DecryptFileBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
