import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RenderFontBrowserInputParser = z.union([
  z.lazy(() => RenderFontBrowserRemoteInputParser),
  z.lazy(() => RenderFontBrowserLocalInputParser),
])

export type RenderFontBrowserInputRecord = z.infer<
  typeof RenderFontBrowserInputParser
>

export const RenderFontBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontBrowserLocalInputRecord = z.infer<
  typeof RenderFontBrowserLocalInputParser
>

export const RenderFontBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RenderFontBrowserOutputRecord = z.infer<
  typeof RenderFontBrowserOutputParser
>

export const RenderFontBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontBrowserRemoteInputRecord = z.infer<
  typeof RenderFontBrowserRemoteInputParser
>
