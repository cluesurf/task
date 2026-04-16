import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type CompressAudioNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  bitrate?: string
}
export type CompressAudioNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  bitrate?: string
}
export type CompressAudioNodeInput =
  | CompressAudioNodeRemoteInput
  | CompressAudioNodeLocalExternalInput
  | CompressAudioNodeLocalInternalInput
export type CompressAudioNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  bitrate?: string
}
export type CompressAudioNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  bitrate?: string
}
export type CompressAudioNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  bitrate?: string
}
export type CompressAudioNodeOutput = {
  file: FilePath
}
export type CompressAudioNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  bitrate?: string
}
