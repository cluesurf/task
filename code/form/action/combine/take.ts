import { z } from 'zod'

export const CombineParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  audio: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  videoCodec: z.optional(z.string()).default('libx264'),
  audioCodec: z.optional(z.string()).default('aac'),
  audioBitrate: z.optional(z.string()).default('256k'),
  sampleRate: z.optional(z.number().int().gte(0)).default(48000),
  pixelFormat: z.optional(z.string()).default('yuv420p'),
  tune: z.optional(z.string()).default('stillimage'),
})

export type CombineRecord = z.infer<typeof CombineParser>
