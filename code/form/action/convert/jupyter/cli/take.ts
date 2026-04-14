import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertDocumentWithJupyterCommandInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithJupyterCommandInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterCommandInputParser
>
