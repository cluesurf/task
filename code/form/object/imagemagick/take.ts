import { z } from 'zod'

import {
  ImageMagickChannel,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickFormat,
  ImageMagickGravity,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/form/object/imagemagick'
import {
  IMAGE_MAGICK_CHANNEL,
  IMAGE_MAGICK_COLOR_SPACE,
  IMAGE_MAGICK_COMPRESSION,
  IMAGE_MAGICK_FORMAT,
  IMAGE_MAGICK_GRAVITY,
  IMAGE_MAGICK_INPUT_FORMAT,
  IMAGE_MAGICK_OUTPUT_FORMAT,
} from '~/code/form/object/imagemagick/base'

export const ImageMagicColorMatrixParser = z.object({
  row: z.number().int().gte(0),
  column: z.number().int().gte(0),
  value: z.array(z.number()),
})

export type ImageMagicColorMatrixRecord = z.infer<
  typeof ImageMagicColorMatrixParser
>

export const ImageMagickChannelParser = z.enum(
  IMAGE_MAGICK_CHANNEL as readonly [string, ...string[]],
) as z.ZodType<ImageMagickChannel>

export const ImageMagickChannelDataParser = z.object({
  head: z.string(),
})

export type ImageMagickChannelDataRecord = z.infer<
  typeof ImageMagickChannelDataParser
>

export const ImageMagickColorSpaceParser = z.enum(
  IMAGE_MAGICK_COLOR_SPACE as readonly [string, ...string[]],
) as z.ZodType<ImageMagickColorSpace>

export const ImageMagickColorSpaceDataParser = z.object({
  head: z.string(),
  note: z.optional(z.string()),
})

export type ImageMagickColorSpaceDataRecord = z.infer<
  typeof ImageMagickColorSpaceDataParser
>

export const ImageMagickCompressionParser = z.enum(
  IMAGE_MAGICK_COMPRESSION as readonly [string, ...string[]],
) as z.ZodType<ImageMagickCompression>

export const ImageMagickCompressionDataParser = z.object({
  head: z.string(),
})

export type ImageMagickCompressionDataRecord = z.infer<
  typeof ImageMagickCompressionDataParser
>

export const ImageMagickFormatParser = z.enum(
  IMAGE_MAGICK_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ImageMagickFormat>

export const ImageMagickFormatDataParser = z.object({
  head: z.string(),
  note: z.optional(z.string()),
  read: z.optional(z.boolean()),
  write: z.optional(z.boolean()),
  multiple: z.optional(z.boolean()),
  supportsBlob: z.optional(z.boolean()),
})

export type ImageMagickFormatDataRecord = z.infer<
  typeof ImageMagickFormatDataParser
>

export const ImageMagickGravityParser = z.enum(
  IMAGE_MAGICK_GRAVITY as readonly [string, ...string[]],
) as z.ZodType<ImageMagickGravity>

export const ImageMagickInputFormatParser = z.enum(
  IMAGE_MAGICK_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ImageMagickInputFormat>

export const ImageMagickOutputFormatParser = z.enum(
  IMAGE_MAGICK_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ImageMagickOutputFormat>
