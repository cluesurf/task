import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type GetDurationNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
export type GetDurationNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
export type GetDurationNodeInput =
  | GetDurationNodeRemoteInput
  | GetDurationNodeLocalExternalInput
  | GetDurationNodeLocalInternalInput
export type GetDurationNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
export type GetDurationNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
export type GetDurationNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
export type GetDurationNodeOutput = {
  file: FilePath
}
export type GetDurationNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
