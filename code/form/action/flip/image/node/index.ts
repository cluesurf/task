import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type FlipImageNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  horizontal?: boolean
  vertical?: boolean
}
export type FlipImageNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  horizontal?: boolean
  vertical?: boolean
}
export type FlipImageNodeInput =
  | FlipImageNodeRemoteInput
  | FlipImageNodeLocalExternalInput
  | FlipImageNodeLocalInternalInput
export type FlipImageNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  horizontal?: boolean
  vertical?: boolean
}
export type FlipImageNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  horizontal?: boolean
  vertical?: boolean
}
export type FlipImageNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  horizontal?: boolean
  vertical?: boolean
}
export type FlipImageNodeOutput = {
  file: FilePath
}
export type FlipImageNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  horizontal?: boolean
  vertical?: boolean
}
