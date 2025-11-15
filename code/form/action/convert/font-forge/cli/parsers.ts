import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertFontWithFontForgeCommandInput } from '~/code/form/action/convert/font-forge/cli/index'
import { FontFormatParser } from '~/code/form/object/font/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let ConvertFontWithFontForgeCommandInputModel: z.ZodType<ConvertFontWithFontForgeCommandInput>

export const ConvertFontWithFontForgeCommandInputParser =
  (): z.ZodType<ConvertFontWithFontForgeCommandInput> => {
    if (!ConvertFontWithFontForgeCommandInputModel) {
      ConvertFontWithFontForgeCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeCommandInput>
    }
    return ConvertFontWithFontForgeCommandInputModel!
  }
