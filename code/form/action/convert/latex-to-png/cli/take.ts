import { z } from 'zod'

import {
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
} from '~/code/form/action/convert/latex-to-png/shared/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertLatexToPngCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexToPngCommandInputRecord = z.infer<
  typeof ConvertLatexToPngCommandInputParser
>
