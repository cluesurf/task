import { z } from 'zod'

import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/form/object/enscript/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertDocumentWithEnscriptCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => EnscriptInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => EnscriptOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithEnscriptCommandInputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptCommandInputParser
>
