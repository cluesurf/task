import { z } from 'zod'

import { ZipOutputFormat } from '~/code/form/action/archive/zip'
import { ZIP_OUTPUT_FORMAT } from '~/code/form/action/archive/zip/base'

export const ArchiveWithZipParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => ZipOutputFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  level: z.optional(z.number().int().gte(0)),
  password: z.optional(z.string()),
  encryption: z.optional(z.enum(['zip-2.0', 'aes-128', 'aes-256'])),
  exclude: z.optional(z.array(z.string())),
  recursive: z.optional(z.boolean()).default(true),
  junkPaths: z.optional(z.boolean()).default(false),
  splitSize: z.optional(z.string()),
})

export type ArchiveWithZipRecord = z.infer<typeof ArchiveWithZipParser>

export const ZipOutputFormatParser = z.enum(
  ZIP_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ZipOutputFormat>
