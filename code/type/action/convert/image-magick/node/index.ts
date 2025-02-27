import {
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/type/object/image-magick/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'

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
    format: ImageMagickInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
    file?: LocalOutputPath
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
    format: ImageMagickInputFormat
    file: LocalPath
  }
  output: {
    format: ImageMagickOutputFormat
    file: LocalPath
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
    format: ImageMagickInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
    file?: LocalOutputPath
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
    format: ImageMagickInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ImageMagickOutputFormat
    file?: LocalOutputPath
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
