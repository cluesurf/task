import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'

export const ExtractWith7ZParser = z.object({
  input: z.object({
    format: z.string(),
    path: z.string(),
  }),
  output: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type ExtractWith7ZRecord = z.infer<typeof ExtractWith7ZParser>

export const ExtractWithUnarchiverParser = z.object({
  input: z.object({
    password: z.optional(z.string()),
    format: z.lazy(() => ArchiveFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    overwrite: z.optional(z.boolean()).default(false),
    directory: z.object({
      path: z.string(),
    }),
  }),
})

export type ExtractWithUnarchiverRecord = z.infer<
  typeof ExtractWithUnarchiverParser
>
