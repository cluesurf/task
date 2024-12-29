import merge from 'lodash/merge.js'
import {
  ImageMagickChannel,
  ImageMagickChannelData,
  ImageMagickColorSpace,
  ImageMagickColorSpaceData,
  ImageMagickCompression,
  ImageMagickCompressionData,
  ImageMagickFormat,
  ImageMagickFormatData,
} from '~/code/type/shared/index.js'

export type ImageMagickChannelContentValue = ImageMagickChannelData

export type ImageMagickChannelContent = Record<
  ImageMagickChannel,
  ImageMagickChannelContentValue
>
export type ImageMagickColorSpaceContentValue =
  ImageMagickColorSpaceData

export type ImageMagickColorSpaceContent = Record<
  ImageMagickColorSpace,
  ImageMagickColorSpaceContentValue
>
export type ImageMagickCompressionContentValue =
  ImageMagickCompressionData

export type ImageMagickCompressionContent = Record<
  ImageMagickCompression,
  ImageMagickCompressionContentValue
>
export type ImageMagickFormatContentValue = ImageMagickFormatData

export type ImageMagickFormatContent = Record<
  ImageMagickFormat,
  ImageMagickFormatContentValue
>
