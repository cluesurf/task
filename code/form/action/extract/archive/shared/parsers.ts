import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ExtractWith7Z,
  ExtractWithUnarchiver,
} from '~/code/form/action/extract/archive/shared/index'
import { ArchiveFormatParser } from '~/code/form/object/archive/parsers'

let ExtractWith7ZModel: z.ZodType<ExtractWith7Z>

export const ExtractWith7ZParser = (): z.ZodType<ExtractWith7Z> => {
  if (!ExtractWith7ZModel) {
    ExtractWith7ZModel = z.object({
      input: z.object({
        format: z.string(),
        path: z.string(),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<ExtractWith7Z>
  }
  return ExtractWith7ZModel!
}

let ExtractWithUnarchiverModel: z.ZodType<ExtractWithUnarchiver>

export const ExtractWithUnarchiverParser =
  (): z.ZodType<ExtractWithUnarchiver> => {
    if (!ExtractWithUnarchiverModel) {
      ExtractWithUnarchiverModel = z.object({
        input: z.object({
          password: z.optional(z.string()),
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          overwrite: z.optional(z.boolean()).default(false),
          directory: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<ExtractWithUnarchiver>
    }
    return ExtractWithUnarchiverModel!
  }
