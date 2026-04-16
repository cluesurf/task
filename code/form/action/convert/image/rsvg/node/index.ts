import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithRsvgNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
export type ConvertImageWithRsvgNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
export type ConvertImageWithRsvgNodeInput =
  | ConvertImageWithRsvgNodeRemoteInput
  | ConvertImageWithRsvgNodeLocalExternalInput
  | ConvertImageWithRsvgNodeLocalInternalInput
export type ConvertImageWithRsvgNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
export type ConvertImageWithRsvgNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
export type ConvertImageWithRsvgNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
export type ConvertImageWithRsvgNodeOutput = {
  file: FilePath
}
export type ConvertImageWithRsvgNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
