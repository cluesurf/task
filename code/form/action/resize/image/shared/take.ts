import { z } from 'zod'

import { ImageMagickGravityParser } from '~/code/form/object/imagemagick/take'

export const ReplaceImageColorWithImageMagickParser = z.object({
  inputPath: z.string(),
  outputPath: z.string(),
  startColor: z.string(),
  endColor: z.string(),
  fuzz: z.number(),
})

export type ReplaceImageColorWithImageMagickRecord = z.infer<
  typeof ReplaceImageColorWithImageMagickParser
>

export const ResizeImageWithImageMagickParser = z.object({
  inputPath: z.string(),
  outputPath: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  stretch: z.boolean(),
  gravity: z.lazy(() => ImageMagickGravityParser),
})

export type ResizeImageWithImageMagickRecord = z.infer<
  typeof ResizeImageWithImageMagickParser
>

export const WriteMetadataToImageParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  copyright: z.optional(z.string()),
  creator: z.optional(z.string()),
  license: z.optional(z.string()),
  keywords: z.optional(z.array(z.string())),
  artist: z.optional(z.string()),
  originalDate: z.optional(z.coerce.date()),
  allDates: z.optional(z.coerce.date()),
  creationDate: z.optional(z.coerce.date()),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
})

export type WriteMetadataToImageRecord = z.infer<
  typeof WriteMetadataToImageParser
>
