import { EncryptFileTool } from '~/code/form/action/encrypt/file/shared'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type EncryptFileNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
export type EncryptFileNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
export type EncryptFileNodeInput =
  | EncryptFileNodeRemoteInput
  | EncryptFileNodeLocalExternalInput
  | EncryptFileNodeLocalInternalInput
export type EncryptFileNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
export type EncryptFileNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
export type EncryptFileNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
export type EncryptFileNodeOutput = {
  file: FilePath
}
export type EncryptFileNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
