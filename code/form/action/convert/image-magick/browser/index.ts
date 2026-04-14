import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'
import {
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/form/object/image-magick'

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
