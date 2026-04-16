import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type PadNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadNodeInput =
  | PadNodeRemoteInput
  | PadNodeLocalExternalInput
  | PadNodeLocalInternalInput
export type PadNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadNodeOutput = {
  file: FilePath
}
export type PadNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  to: string
  sampleRate?: number
  channels?: number
}
