import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertLatexToPngCommandInput } from '~/code/form/action/convert/latex-to-png/cli/index'
import {
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
} from '~/code/form/action/convert/latex-to-png/shared/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let ConvertLatexToPngCommandInputModel: z.ZodType<ConvertLatexToPngCommandInput>

export const ConvertLatexToPngCommandInputParser =
  (): z.ZodType<ConvertLatexToPngCommandInput> => {
    if (!ConvertLatexToPngCommandInputModel) {
      ConvertLatexToPngCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngCommandInput>
    }
    return ConvertLatexToPngCommandInputModel!
  }
