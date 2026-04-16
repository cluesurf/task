import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type UpdateImageNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
export type UpdateImageNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
export type UpdateImageNodeInput =
  | UpdateImageNodeRemoteInput
  | UpdateImageNodeLocalExternalInput
  | UpdateImageNodeLocalInternalInput
export type UpdateImageNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
export type UpdateImageNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
export type UpdateImageNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
export type UpdateImageNodeOutput = {
  file: FilePath
}
export type UpdateImageNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
