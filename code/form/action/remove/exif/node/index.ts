import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type RemoveExifNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
export type RemoveExifNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
export type RemoveExifNodeInput =
  | RemoveExifNodeRemoteInput
  | RemoveExifNodeLocalExternalInput
  | RemoveExifNodeLocalInternalInput
export type RemoveExifNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
export type RemoveExifNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
export type RemoveExifNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
export type RemoveExifNodeOutput = {
  file: FilePath
}
export type RemoveExifNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
