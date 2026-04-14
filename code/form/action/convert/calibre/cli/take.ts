import { z } from 'zod'

import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/form/object/calibre/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertDocumentWithCalibreCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => CalibreInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => CalibreOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithCalibreCommandInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreCommandInputParser
>
