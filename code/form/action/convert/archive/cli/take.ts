import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertArchiveCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertArchiveCommandInputRecord = z.infer<
  typeof ConvertArchiveCommandInputParser
>
