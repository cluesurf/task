import { LocalPath } from '~/code/form/object/file'
import {
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/form/object/image-magick'

export type ConvertImageWithImageMagickCommandInput = {
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
