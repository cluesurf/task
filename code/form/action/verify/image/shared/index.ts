import { ImageMagickFormat } from '~/code/form/object/imagemagick'

export type VerifyImageWithImageMagick = {
  format: ImageMagickFormat
  file: {
    path: string
  }
}
