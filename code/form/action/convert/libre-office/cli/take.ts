import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/form/object/libre-office/take'

export const ConvertDocumentWithLibreOfficeCommandInputParser =
  z.object({
    input: z.object({
      format: z.lazy(() => LibreOfficeInputFormatParser),
      file: z.lazy(() => LocalPathParser),
    }),
    output: z.object({
      format: z.lazy(() => LibreOfficeOutputFormatParser),
      directory: z.lazy(() => LocalPathParser),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithLibreOfficeCommandInputRecord = z.infer<
  typeof ConvertDocumentWithLibreOfficeCommandInputParser
>
