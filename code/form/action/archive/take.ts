import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'

export const ArchiveParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type ArchiveRecord = z.infer<typeof ArchiveParser>
