import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type TrimAudioNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  start?: string
  end?: string
  duration?: string
}
export type TrimAudioNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  start?: string
  end?: string
  duration?: string
}
export type TrimAudioNodeInput =
  | TrimAudioNodeRemoteInput
  | TrimAudioNodeLocalExternalInput
  | TrimAudioNodeLocalInternalInput
export type TrimAudioNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  start?: string
  end?: string
  duration?: string
}
export type TrimAudioNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  start?: string
  end?: string
  duration?: string
}
export type TrimAudioNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  start?: string
  end?: string
  duration?: string
}
export type TrimAudioNodeOutput = {
  file: FilePath
}
export type TrimAudioNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  start?: string
  end?: string
  duration?: string
}
