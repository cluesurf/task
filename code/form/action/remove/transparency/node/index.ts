import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type RemoveTransparencyNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  background?: string
}
export type RemoveTransparencyNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  background?: string
}
export type RemoveTransparencyNodeInput =
  | RemoveTransparencyNodeRemoteInput
  | RemoveTransparencyNodeLocalExternalInput
  | RemoveTransparencyNodeLocalInternalInput
export type RemoveTransparencyNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  background?: string
}
export type RemoveTransparencyNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  background?: string
}
export type RemoveTransparencyNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  background?: string
}
export type RemoveTransparencyNodeOutput = {
  file: FilePath
}
export type RemoveTransparencyNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  background?: string
}
