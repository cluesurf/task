import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'
import {
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/form/object/imagemagick'

export type ConvertImageWithImageMagickNodeClientInput = {
  handle: 'client'
  input: {
    format: ImageMagickInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
  }
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeExternalInput = {
  handle: 'external'
  input: {
    format: ImageMagickInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
  }
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeInput =
  | ConvertImageWithImageMagickNodeRemoteInput
  | ConvertImageWithImageMagickNodeLocalExternalInput
  | ConvertImageWithImageMagickNodeLocalInternalInput
export type ConvertImageWithImageMagickNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithImageMagickNodeOutput = {
  file: FilePath
}
export type ConvertImageWithImageMagickNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
