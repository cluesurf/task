import {
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/type/object/image-magick/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertImageWithImageMagickBrowserInput =
  | ConvertImageWithImageMagickBrowserRemoteInput
  | ConvertImageWithImageMagickBrowserLocalInput
export type ConvertImageWithImageMagickBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: ImageMagickInputFormat
    file: {
      content: FileContent
    }
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
export type ConvertImageWithImageMagickBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithImageMagickBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: ImageMagickInputFormat
    file: FileContentWithSha256
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
