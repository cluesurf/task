import { z } from 'zod'

export const OptimizeVideoParser = z.object({
  input: z.object({
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
  crf: z.optional(z.number().int().gte(0)).default(20),
  preset: z.optional(z.string()).default('slow'),
  width: z.optional(z.number().int().gte(0)).default(1920),
  pixelFormat: z.optional(z.string()).default('yuv420p'),
  audioCodec: z.optional(z.string()).default('aac'),
  audioBitrate: z.optional(z.string()).default('128k'),
  faststart: z.optional(z.boolean()).default(true),
  silent: z.optional(z.boolean()).default(false),
})

export type OptimizeVideoRecord = z.infer<typeof OptimizeVideoParser>
