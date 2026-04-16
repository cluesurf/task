import { DecryptFileTool } from '~/code/form/action/decrypt/file/shared'
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
  tool?: DecryptFileTool
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
  tool?: DecryptFileTool
  passphrase?: string
  identity?: string
  cipher?: string
}
