import { ImageMagickFormat } from '~/code/form/object/image-magick'

export type VerifyImageWithImageMagick = {
  format: ImageMagickFormat
  file: {
    path: string
  }
}
