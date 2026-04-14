import { z } from 'zod'

import {
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
} from '~/code/form/action/convert/pdf-latex/shared/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertLatexWithPdfLatexCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => PdfLatexInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => PdfLatexOutputFormatParser),
    directory: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexWithPdfLatexCommandInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexCommandInputParser
>
