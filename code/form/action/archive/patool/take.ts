import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'

export const ArchiveWithPatoolParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  verbose: z.optional(z.boolean()).default(false),
  nonInteractive: z.optional(z.boolean()).default(true),
})

export type ArchiveWithPatoolRecord = z.infer<
  typeof ArchiveWithPatoolParser
>
