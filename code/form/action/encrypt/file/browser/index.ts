import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type EncryptFileBrowserInput =
  | EncryptFileBrowserRemoteInput
  | EncryptFileBrowserLocalInput
export type EncryptFileBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  tool?: string
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
export type EncryptFileBrowserOutput = {
  file: FileContent
}
export type EncryptFileBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  tool?: string
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
