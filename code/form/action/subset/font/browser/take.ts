import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const SubsetFontBrowserInputParser = z.union([
  z.lazy(() => SubsetFontBrowserRemoteInputParser),
  z.lazy(() => SubsetFontBrowserLocalInputParser),
])

export type SubsetFontBrowserInputRecord = z.infer<
  typeof SubsetFontBrowserInputParser
>

export const SubsetFontBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontBrowserLocalInputRecord = z.infer<
  typeof SubsetFontBrowserLocalInputParser
>

export const SubsetFontBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type SubsetFontBrowserOutputRecord = z.infer<
  typeof SubsetFontBrowserOutputParser
>

export const SubsetFontBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontBrowserRemoteInputRecord = z.infer<
  typeof SubsetFontBrowserRemoteInputParser
>
