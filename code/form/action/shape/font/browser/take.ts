import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ShapeFontBrowserInputParser = z.union([
  z.lazy(() => ShapeFontBrowserRemoteInputParser),
  z.lazy(() => ShapeFontBrowserLocalInputParser),
])

export type ShapeFontBrowserInputRecord = z.infer<
  typeof ShapeFontBrowserInputParser
>

export const ShapeFontBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontBrowserLocalInputRecord = z.infer<
  typeof ShapeFontBrowserLocalInputParser
>

export const ShapeFontBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ShapeFontBrowserOutputRecord = z.infer<
  typeof ShapeFontBrowserOutputParser
>

export const ShapeFontBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontBrowserRemoteInputRecord = z.infer<
  typeof ShapeFontBrowserRemoteInputParser
>
