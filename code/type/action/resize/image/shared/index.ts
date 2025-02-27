import { ImageMagickGravity } from '~/code/type/object/image-magick/index'

export type ReplaceImageColorWithImageMagick = {
  inputPath: string
  outputPath: string
  startColor: string
  endColor: string
  fuzz: number
}
export type ResizeImageWithImageMagick = {
  inputPath: string
  outputPath: string
  width: number
  height: number
  stretch: boolean
  gravity: ImageMagickGravity
}
export type WriteMetadataToImage = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  copyright?: string
  creator?: string
  license?: string
  keywords?: Array<string>
  artist?: string
  originalDate?: Date
  allDates?: Date
  creationDate?: Date
  title?: string
  description?: string
}
