import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type RemoveSubtitlesNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
}
export type RemoveSubtitlesNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
}
export type RemoveSubtitlesNodeInput =
  | RemoveSubtitlesNodeRemoteInput
  | RemoveSubtitlesNodeLocalExternalInput
  | RemoveSubtitlesNodeLocalInternalInput
export type RemoveSubtitlesNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
}
export type RemoveSubtitlesNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
}
export type RemoveSubtitlesNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
}
export type RemoveSubtitlesNodeOutput = {
  file: FilePath
}
export type RemoveSubtitlesNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
}
