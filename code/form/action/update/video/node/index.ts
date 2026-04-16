import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type UpdateVideoNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  subtitles?: string
}
export type UpdateVideoNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  subtitles?: string
}
export type UpdateVideoNodeInput =
  | UpdateVideoNodeRemoteInput
  | UpdateVideoNodeLocalExternalInput
  | UpdateVideoNodeLocalInternalInput
export type UpdateVideoNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  subtitles?: string
}
export type UpdateVideoNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  subtitles?: string
}
export type UpdateVideoNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  subtitles?: string
}
export type UpdateVideoNodeOutput = {
  file: FilePath
}
export type UpdateVideoNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  subtitles?: string
}
