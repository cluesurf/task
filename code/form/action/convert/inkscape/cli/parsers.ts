import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertImageWithInkscapeCommandInput } from '~/code/form/action/convert/inkscape/cli/index'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let ConvertImageWithInkscapeCommandInputModel: z.ZodType<ConvertImageWithInkscapeCommandInput>

export const ConvertImageWithInkscapeCommandInputParser =
  (): z.ZodType<ConvertImageWithInkscapeCommandInput> => {
    if (!ConvertImageWithInkscapeCommandInputModel) {
      ConvertImageWithInkscapeCommandInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeCommandInput>
    }
    return ConvertImageWithInkscapeCommandInputModel!
  }
