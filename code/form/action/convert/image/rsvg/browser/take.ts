import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithRsvgBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithRsvgBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithRsvgBrowserLocalInputParser),
])

export type ConvertImageWithRsvgBrowserInputRecord = z.infer<
  typeof ConvertImageWithRsvgBrowserInputParser
>

export const ConvertImageWithRsvgBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  outputFormat: z.optional(z.string()),
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithRsvgBrowserLocalInputParser
>

export const ConvertImageWithRsvgBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithRsvgBrowserOutputRecord = z.infer<
  typeof ConvertImageWithRsvgBrowserOutputParser
>

export const ConvertImageWithRsvgBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  outputFormat: z.optional(z.string()),
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithRsvgBrowserRemoteInputParser
>
