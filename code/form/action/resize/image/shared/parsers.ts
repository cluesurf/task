import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ReplaceImageColorWithImageMagick,
  ResizeImageWithImageMagick,
  WriteMetadataToImage,
} from '~/code/form/action/resize/image/shared/index'
import { ImageMagickGravityParser } from '~/code/form/object/image-magick/parsers'

let ReplaceImageColorWithImageMagickModel: z.ZodType<ReplaceImageColorWithImageMagick>

export const ReplaceImageColorWithImageMagickParser =
  (): z.ZodType<ReplaceImageColorWithImageMagick> => {
    if (!ReplaceImageColorWithImageMagickModel) {
      ReplaceImageColorWithImageMagickModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
        startColor: z.string(),
        endColor: z.string(),
        fuzz: z.number(),
      }) as z.ZodType<ReplaceImageColorWithImageMagick>
    }
    return ReplaceImageColorWithImageMagickModel!
  }

let ResizeImageWithImageMagickModel: z.ZodType<ResizeImageWithImageMagick>

export const ResizeImageWithImageMagickParser =
  (): z.ZodType<ResizeImageWithImageMagick> => {
    if (!ResizeImageWithImageMagickModel) {
      ResizeImageWithImageMagickModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
        width: z.number().int(),
        height: z.number().int(),
        stretch: z.boolean(),
        gravity: z.lazy(() => ImageMagickGravityParser()),
      }) as z.ZodType<ResizeImageWithImageMagick>
    }
    return ResizeImageWithImageMagickModel!
  }

let WriteMetadataToImageModel: z.ZodType<WriteMetadataToImage>

export const WriteMetadataToImageParser =
  (): z.ZodType<WriteMetadataToImage> => {
    if (!WriteMetadataToImageModel) {
      WriteMetadataToImageModel = z.object({
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
      }) as z.ZodType<WriteMetadataToImage>
    }
    return WriteMetadataToImageModel!
  }
