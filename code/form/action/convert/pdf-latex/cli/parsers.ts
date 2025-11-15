import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertLatexWithPdfLatexCommandInput } from '~/code/form/action/convert/pdf-latex/cli/index'
import {
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
} from '~/code/form/action/convert/pdf-latex/shared/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let ConvertLatexWithPdfLatexCommandInputModel: z.ZodType<ConvertLatexWithPdfLatexCommandInput>

export const ConvertLatexWithPdfLatexCommandInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexCommandInput> => {
    if (!ConvertLatexWithPdfLatexCommandInputModel) {
      ConvertLatexWithPdfLatexCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexCommandInput>
    }
    return ConvertLatexWithPdfLatexCommandInputModel!
  }
