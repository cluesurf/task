import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type RemovePasswordNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  password?: string
}
export type RemovePasswordNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  password?: string
}
export type RemovePasswordNodeInput =
  | RemovePasswordNodeRemoteInput
  | RemovePasswordNodeLocalExternalInput
  | RemovePasswordNodeLocalInternalInput
export type RemovePasswordNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  password?: string
}
export type RemovePasswordNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  password?: string
}
export type RemovePasswordNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  password?: string
}
export type RemovePasswordNodeOutput = {
  file: FilePath
}
export type RemovePasswordNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  password?: string
}
