import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'

export const ArchiveWithAtoolParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  quiet: z.optional(z.boolean()).default(true),
  verbose: z.optional(z.boolean()).default(false),
  force: z.optional(z.boolean()).default(false),
})

export type ArchiveWithAtoolRecord = z.infer<
  typeof ArchiveWithAtoolParser
>
