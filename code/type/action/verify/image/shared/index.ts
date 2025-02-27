import { ImageMagickFormat } from '~/code/type/object/image-magick/index'

export type VerifyImageWithImageMagick = {
  format: ImageMagickFormat
  file: {
    path: string
  }
}
