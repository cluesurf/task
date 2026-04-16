import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type InspectFileNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
}
export type InspectFileNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
}
export type InspectFileNodeInput =
  | InspectFileNodeRemoteInput
  | InspectFileNodeLocalExternalInput
  | InspectFileNodeLocalInternalInput
export type InspectFileNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
}
export type InspectFileNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
}
export type InspectFileNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
}
export type InspectFileNodeOutput = {
  file: FilePath
}
export type InspectFileNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
}
