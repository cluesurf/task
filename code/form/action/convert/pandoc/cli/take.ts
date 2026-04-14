import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/form/object/pandoc/take'

export const ConvertDocumentWithPandocCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => PandocInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => PandocOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithPandocCommandInputRecord = z.infer<
  typeof ConvertDocumentWithPandocCommandInputParser
>
