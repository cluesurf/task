import { LocalPath } from '~/code/form/object/file'
import {
  ImageMagicColorMatrix,
  ImageMagickColorSpace,
  ImageMagickCompression,
} from '~/code/form/object/imagemagick'

export type ConvertImageWithImageMagickCommandInput = {
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
