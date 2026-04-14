import { z } from 'zod'

import { AudioPadFormatParser } from '~/code/form/object/audio/take'

export const PadParser = z.object({
  input: z.object({
    format: z.optional(z.lazy(() => AudioPadFormatParser)),
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    format: z.optional(z.lazy(() => AudioPadFormatParser)),
    file: z.object({
      path: z.string(),
    }),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadRecord = z.infer<typeof PadParser>
