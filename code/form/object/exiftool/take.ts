import { z } from 'zod'

import {
  ExiftoolFamilyContentKey,
  ExiftoolImageFormatContentKey,
  ExiftoolTagContentKey,
} from '~/code/form/object/exiftool'
import {
  EXIFTOOL_FAMILY_CONTENT_KEY,
  EXIFTOOL_IMAGE_FORMAT_CONTENT_KEY,
  EXIFTOOL_TAG_CONTENT_KEY,
} from '~/code/form/object/exiftool/base'

export const ExiftoolFamilyContentKeyParser: z.ZodType<ExiftoolFamilyContentKey> =
  z.enum(
    EXIFTOOL_FAMILY_CONTENT_KEY as [
      ExiftoolFamilyContentKey,
      ...ExiftoolFamilyContentKey[],
    ],
  )

export const ExiftoolFamilyDataParser = z.object({
  head: z.string(),
  family: z.array(z.number().int().gte(0)),
})

export type ExiftoolFamilyDataRecord = z.infer<
  typeof ExiftoolFamilyDataParser
>

export const ExiftoolImageFormatContentKeyParser: z.ZodType<ExiftoolImageFormatContentKey> =
  z.enum(
    EXIFTOOL_IMAGE_FORMAT_CONTENT_KEY as [
      ExiftoolImageFormatContentKey,
      ...ExiftoolImageFormatContentKey[],
    ],
  )

export const ExiftoolImageFormatDataParser = z.object({
  head: z.string(),
  read: z.optional(z.boolean()).default(false),
  write: z.optional(z.boolean()).default(false),
  create: z.optional(z.boolean()).default(false),
})

export type ExiftoolImageFormatDataRecord = z.infer<
  typeof ExiftoolImageFormatDataParser
>

export const ExiftoolTagContentKeyParser: z.ZodType<ExiftoolTagContentKey> =
  z.enum(
    EXIFTOOL_TAG_CONTENT_KEY as [
      ExiftoolTagContentKey,
      ...ExiftoolTagContentKey[],
    ],
  )

export const ExiftoolTagDataParser = z.object({
  head: z.string(),
})

export type ExiftoolTagDataRecord = z.infer<
  typeof ExiftoolTagDataParser
>
