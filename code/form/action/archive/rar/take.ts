import { z } from 'zod'

import { RarOutputFormat } from '~/code/form/action/archive/rar'
import { RAR_OUTPUT_FORMAT } from '~/code/form/action/archive/rar/base'

export const ArchiveWithRarParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => RarOutputFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  level: z.optional(z.number().int().gte(0)),
  password: z.optional(z.string()),
  solid: z.optional(z.boolean()).default(false),
  recovery: z.optional(z.number().int().gte(0)),
  exclude: z.optional(z.array(z.string())),
  recursive: z.optional(z.boolean()).default(true),
  volumeSize: z.optional(z.string()),
})

export type ArchiveWithRarRecord = z.infer<typeof ArchiveWithRarParser>

export const RarOutputFormatParser = z.enum(
  RAR_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<RarOutputFormat>
