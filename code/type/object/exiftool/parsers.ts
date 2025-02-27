import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ExiftoolFamilyContentKey,
  ExiftoolFamilyData,
  ExiftoolImageFormatContentKey,
  ExiftoolImageFormatData,
  ExiftoolTagContentKey,
  ExiftoolTagData,
} from '~/code/type/object/exiftool/index'
import {
  EXIFTOOL_FAMILY_CONTENT_KEY,
  EXIFTOOL_IMAGE_FORMAT_CONTENT_KEY,
  EXIFTOOL_TAG_CONTENT_KEY,
} from '~/code/type/object/exiftool/constants'

export const ExiftoolFamilyContentKeyParser: z.ZodType<ExiftoolFamilyContentKey> =
  z.enum(
    EXIFTOOL_FAMILY_CONTENT_KEY as [
      ExiftoolFamilyContentKey,
      ...ExiftoolFamilyContentKey[],
    ],
  )

let ExiftoolFamilyDataModel: z.ZodType<ExiftoolFamilyData>

export const ExiftoolFamilyDataParser =
  (): z.ZodType<ExiftoolFamilyData> => {
    if (!ExiftoolFamilyDataModel) {
      ExiftoolFamilyDataModel = z.object({
        head: z.string(),
        family: z.array(z.number().int().gte(0)),
      }) as z.ZodType<ExiftoolFamilyData>
    }
    return ExiftoolFamilyDataModel!
  }

export const ExiftoolImageFormatContentKeyParser: z.ZodType<ExiftoolImageFormatContentKey> =
  z.enum(
    EXIFTOOL_IMAGE_FORMAT_CONTENT_KEY as [
      ExiftoolImageFormatContentKey,
      ...ExiftoolImageFormatContentKey[],
    ],
  )

let ExiftoolImageFormatDataModel: z.ZodType<ExiftoolImageFormatData>

export const ExiftoolImageFormatDataParser =
  (): z.ZodType<ExiftoolImageFormatData> => {
    if (!ExiftoolImageFormatDataModel) {
      ExiftoolImageFormatDataModel = z.object({
        head: z.string(),
        read: z.optional(z.boolean()).default(false),
        write: z.optional(z.boolean()).default(false),
        create: z.optional(z.boolean()).default(false),
      }) as z.ZodType<ExiftoolImageFormatData>
    }
    return ExiftoolImageFormatDataModel!
  }

export const ExiftoolTagContentKeyParser: z.ZodType<ExiftoolTagContentKey> =
  z.enum(
    EXIFTOOL_TAG_CONTENT_KEY as [
      ExiftoolTagContentKey,
      ...ExiftoolTagContentKey[],
    ],
  )

let ExiftoolTagDataModel: z.ZodType<ExiftoolTagData>

export const ExiftoolTagDataParser = (): z.ZodType<ExiftoolTagData> => {
  if (!ExiftoolTagDataModel) {
    ExiftoolTagDataModel = z.object({
      head: z.string(),
    }) as z.ZodType<ExiftoolTagData>
  }
  return ExiftoolTagDataModel!
}
