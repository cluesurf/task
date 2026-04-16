import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type NormalizeAudioNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  target?: string
  peak?: string
  range?: string
}
export type NormalizeAudioNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  target?: string
  peak?: string
  range?: string
}
export type NormalizeAudioNodeInput =
  | NormalizeAudioNodeRemoteInput
  | NormalizeAudioNodeLocalExternalInput
  | NormalizeAudioNodeLocalInternalInput
export type NormalizeAudioNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  target?: string
  peak?: string
  range?: string
}
export type NormalizeAudioNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  target?: string
  peak?: string
  range?: string
}
export type NormalizeAudioNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  target?: string
  peak?: string
  range?: string
}
export type NormalizeAudioNodeOutput = {
  file: FilePath
}
export type NormalizeAudioNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  target?: string
  peak?: string
  range?: string
}
