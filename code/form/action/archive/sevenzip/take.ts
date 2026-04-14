import { z } from 'zod'

import { SevenzipOutputFormat } from '~/code/form/action/archive/sevenzip'
import { SEVENZIP_OUTPUT_FORMAT } from '~/code/form/action/archive/sevenzip/base'

export const ArchiveWithSevenzipParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => SevenzipOutputFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  level: z.optional(z.number().int().gte(0)),
  method: z.optional(
    z.enum(['lzma2', 'lzma', 'bzip2', 'ppmd', 'deflate', 'copy']),
  ),
  password: z.optional(z.string()),
  encryptHeaders: z.optional(z.boolean()).default(false),
  solid: z.optional(z.boolean()).default(true),
  multithread: z.optional(z.number().int().gte(0)),
  volumeSize: z.optional(z.string()),
  exclude: z.optional(z.array(z.string())),
})

export type ArchiveWithSevenzipRecord = z.infer<
  typeof ArchiveWithSevenzipParser
>

export const SevenzipOutputFormatParser = z.enum(
  SEVENZIP_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<SevenzipOutputFormat>
