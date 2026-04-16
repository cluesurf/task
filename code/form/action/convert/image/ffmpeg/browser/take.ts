import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithFfmpegBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithFfmpegBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithFfmpegBrowserLocalInputParser),
])

export type ConvertImageWithFfmpegBrowserInputRecord = z.infer<
  typeof ConvertImageWithFfmpegBrowserInputParser
>

export const ConvertImageWithFfmpegBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithFfmpegBrowserLocalInputParser
>

export const ConvertImageWithFfmpegBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithFfmpegBrowserOutputRecord = z.infer<
  typeof ConvertImageWithFfmpegBrowserOutputParser
>

export const ConvertImageWithFfmpegBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithFfmpegBrowserRemoteInputParser
>
