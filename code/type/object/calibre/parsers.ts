import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CalibreFormatData,
  CalibreInputFormat,
  CalibreInputProfile,
  CalibreOutputFormat,
  CalibreOutputProfile,
} from '~/code/type/object/calibre/index'

let CalibreFormatDataModel: z.ZodType<CalibreFormatData>

export const CalibreFormatDataParser =
  (): z.ZodType<CalibreFormatData> => {
    if (!CalibreFormatDataModel) {
      CalibreFormatDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<CalibreFormatData>
    }
    return CalibreFormatDataModel!
  }

let CalibreInputFormatModel: z.ZodType<CalibreInputFormat>

export const CalibreInputFormatParser = () => {
  if (!CalibreInputFormatModel) {
    CalibreInputFormatModel = z.enum(
      LOAD('calibre_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreInputFormat>
  }
  return CalibreInputFormatModel!
}

let CalibreInputProfileModel: z.ZodType<CalibreInputProfile>

export const CalibreInputProfileParser = () => {
  if (!CalibreInputProfileModel) {
    CalibreInputProfileModel = z.enum(
      LOAD('calibre_input_profile') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreInputProfile>
  }
  return CalibreInputProfileModel!
}

let CalibreOutputFormatModel: z.ZodType<CalibreOutputFormat>

export const CalibreOutputFormatParser = () => {
  if (!CalibreOutputFormatModel) {
    CalibreOutputFormatModel = z.enum(
      LOAD('calibre_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreOutputFormat>
  }
  return CalibreOutputFormatModel!
}

let CalibreOutputProfileModel: z.ZodType<CalibreOutputProfile>

export const CalibreOutputProfileParser = () => {
  if (!CalibreOutputProfileModel) {
    CalibreOutputProfileModel = z.enum(
      LOAD('calibre_output_profile') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreOutputProfile>
  }
  return CalibreOutputProfileModel!
}
