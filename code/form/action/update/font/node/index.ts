import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type UpdateFontNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  fea: string
}
export type UpdateFontNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  fea: string
}
export type UpdateFontNodeInput =
  | UpdateFontNodeRemoteInput
  | UpdateFontNodeLocalExternalInput
  | UpdateFontNodeLocalInternalInput
export type UpdateFontNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  fea: string
}
export type UpdateFontNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  fea: string
}
export type UpdateFontNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  fea: string
}
export type UpdateFontNodeOutput = {
  file: FilePath
}
export type UpdateFontNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  fea: string
}
