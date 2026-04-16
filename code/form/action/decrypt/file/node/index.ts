import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DecryptFileNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
export type DecryptFileNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
export type DecryptFileNodeInput =
  | DecryptFileNodeRemoteInput
  | DecryptFileNodeLocalExternalInput
  | DecryptFileNodeLocalInternalInput
export type DecryptFileNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
export type DecryptFileNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
export type DecryptFileNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
export type DecryptFileNodeOutput = {
  file: FilePath
}
export type DecryptFileNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
