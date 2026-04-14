import { z } from 'zod'

import { TarOutputFormat } from '~/code/form/action/archive/tar'
import { TAR_OUTPUT_FORMAT } from '~/code/form/action/archive/tar/base'

export const ArchiveWithTarParser = z.object({
  input: z.object({
    path: z.string(),
  }),
  output: z.object({
    format: z.lazy(() => TarOutputFormatParser),
    file: z.object({
      path: z.string(),
    }),
  }),
  compressionLevel: z.optional(z.number().int().gte(0)),
  dereference: z.optional(z.boolean()).default(false),
  exclude: z.optional(z.array(z.string())),
  changeDirectory: z.optional(z.string()),
  preserveOwner: z.optional(z.boolean()).default(true),
  preservePermissions: z.optional(z.boolean()).default(true),
})

export type ArchiveWithTarRecord = z.infer<typeof ArchiveWithTarParser>

export const TarOutputFormatParser = z.enum(
  TAR_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<TarOutputFormat>
