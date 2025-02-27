import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ImageMagicColorMatrix,
  ImageMagickChannel,
  ImageMagickChannelData,
  ImageMagickColorSpace,
  ImageMagickColorSpaceData,
  ImageMagickCompression,
  ImageMagickCompressionData,
  ImageMagickFormat,
  ImageMagickFormatData,
  ImageMagickGravity,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/type/object/image-magick/index'

let ImageMagicColorMatrixModel: z.ZodType<ImageMagicColorMatrix>

export const ImageMagicColorMatrixParser =
  (): z.ZodType<ImageMagicColorMatrix> => {
    if (!ImageMagicColorMatrixModel) {
      ImageMagicColorMatrixModel = z.object({
        row: z.number().int().gte(0),
        column: z.number().int().gte(0),
        value: z.array(z.number()),
      }) as z.ZodType<ImageMagicColorMatrix>
    }
    return ImageMagicColorMatrixModel!
  }

let ImageMagickChannelModel: z.ZodType<ImageMagickChannel>

export const ImageMagickChannelParser = () => {
  if (!ImageMagickChannelModel) {
    ImageMagickChannelModel = z.enum(
      LOAD('image_magick_channel') as readonly [string, ...string[]],
    ) as z.ZodType<ImageMagickChannel>
  }
  return ImageMagickChannelModel!
}

let ImageMagickChannelDataModel: z.ZodType<ImageMagickChannelData>

export const ImageMagickChannelDataParser =
  (): z.ZodType<ImageMagickChannelData> => {
    if (!ImageMagickChannelDataModel) {
      ImageMagickChannelDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<ImageMagickChannelData>
    }
    return ImageMagickChannelDataModel!
  }

let ImageMagickColorSpaceModel: z.ZodType<ImageMagickColorSpace>

export const ImageMagickColorSpaceParser = () => {
  if (!ImageMagickColorSpaceModel) {
    ImageMagickColorSpaceModel = z.enum(
      LOAD('image_magick_color_space') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickColorSpace>
  }
  return ImageMagickColorSpaceModel!
}

let ImageMagickColorSpaceDataModel: z.ZodType<ImageMagickColorSpaceData>

export const ImageMagickColorSpaceDataParser =
  (): z.ZodType<ImageMagickColorSpaceData> => {
    if (!ImageMagickColorSpaceDataModel) {
      ImageMagickColorSpaceDataModel = z.object({
        head: z.string(),
        note: z.optional(z.string()),
      }) as z.ZodType<ImageMagickColorSpaceData>
    }
    return ImageMagickColorSpaceDataModel!
  }

let ImageMagickCompressionModel: z.ZodType<ImageMagickCompression>

export const ImageMagickCompressionParser = () => {
  if (!ImageMagickCompressionModel) {
    ImageMagickCompressionModel = z.enum(
      LOAD('image_magick_compression') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickCompression>
  }
  return ImageMagickCompressionModel!
}

let ImageMagickCompressionDataModel: z.ZodType<ImageMagickCompressionData>

export const ImageMagickCompressionDataParser =
  (): z.ZodType<ImageMagickCompressionData> => {
    if (!ImageMagickCompressionDataModel) {
      ImageMagickCompressionDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<ImageMagickCompressionData>
    }
    return ImageMagickCompressionDataModel!
  }

let ImageMagickFormatModel: z.ZodType<ImageMagickFormat>

export const ImageMagickFormatParser = () => {
  if (!ImageMagickFormatModel) {
    ImageMagickFormatModel = z.enum(
      LOAD('image_magick_format') as readonly [string, ...string[]],
    ) as z.ZodType<ImageMagickFormat>
  }
  return ImageMagickFormatModel!
}

let ImageMagickFormatDataModel: z.ZodType<ImageMagickFormatData>

export const ImageMagickFormatDataParser =
  (): z.ZodType<ImageMagickFormatData> => {
    if (!ImageMagickFormatDataModel) {
      ImageMagickFormatDataModel = z.object({
        head: z.string(),
        note: z.optional(z.string()),
        read: z.optional(z.boolean()),
        write: z.optional(z.boolean()),
        multiple: z.optional(z.boolean()),
        supportsBlob: z.optional(z.boolean()),
      }) as z.ZodType<ImageMagickFormatData>
    }
    return ImageMagickFormatDataModel!
  }

let ImageMagickGravityModel: z.ZodType<ImageMagickGravity>

export const ImageMagickGravityParser = () => {
  if (!ImageMagickGravityModel) {
    ImageMagickGravityModel = z.enum(
      LOAD('image_magick_gravity') as readonly [string, ...string[]],
    ) as z.ZodType<ImageMagickGravity>
  }
  return ImageMagickGravityModel!
}

let ImageMagickInputFormatModel: z.ZodType<ImageMagickInputFormat>

export const ImageMagickInputFormatParser = () => {
  if (!ImageMagickInputFormatModel) {
    ImageMagickInputFormatModel = z.enum(
      LOAD('image_magick_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickInputFormat>
  }
  return ImageMagickInputFormatModel!
}

let ImageMagickOutputFormatModel: z.ZodType<ImageMagickOutputFormat>

export const ImageMagickOutputFormatParser = () => {
  if (!ImageMagickOutputFormatModel) {
    ImageMagickOutputFormatModel = z.enum(
      LOAD('image_magick_output_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickOutputFormat>
  }
  return ImageMagickOutputFormatModel!
}
