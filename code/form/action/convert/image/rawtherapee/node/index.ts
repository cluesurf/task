import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithRawtherapeeNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
export type ConvertImageWithRawtherapeeNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
export type ConvertImageWithRawtherapeeNodeInput =
  | ConvertImageWithRawtherapeeNodeRemoteInput
  | ConvertImageWithRawtherapeeNodeLocalExternalInput
  | ConvertImageWithRawtherapeeNodeLocalInternalInput
export type ConvertImageWithRawtherapeeNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
export type ConvertImageWithRawtherapeeNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
export type ConvertImageWithRawtherapeeNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
export type ConvertImageWithRawtherapeeNodeOutput = {
  file: FilePath
}
export type ConvertImageWithRawtherapeeNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
