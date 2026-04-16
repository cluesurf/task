import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type PadAudioNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadAudioNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadAudioNodeInput =
  | PadAudioNodeRemoteInput
  | PadAudioNodeLocalExternalInput
  | PadAudioNodeLocalInternalInput
export type PadAudioNodeLocalExternalInput = {
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
export type PadAudioNodeLocalInput = {
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
export type PadAudioNodeLocalInternalInput = {
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
export type PadAudioNodeOutput = {
  file: FilePath
}
export type PadAudioNodeRemoteInput = {
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
