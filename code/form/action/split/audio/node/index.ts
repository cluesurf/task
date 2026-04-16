import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type SplitAudioNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
export type SplitAudioNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
export type SplitAudioNodeInput =
  | SplitAudioNodeRemoteInput
  | SplitAudioNodeLocalExternalInput
  | SplitAudioNodeLocalInternalInput
export type SplitAudioNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
export type SplitAudioNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
export type SplitAudioNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
export type SplitAudioNodeOutput = {
  file: FilePath
}
export type SplitAudioNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
