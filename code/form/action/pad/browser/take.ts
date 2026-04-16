import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const PadBrowserInputParser = z.union([
  z.lazy(() => PadBrowserRemoteInputParser),
  z.lazy(() => PadBrowserLocalInputParser),
])

export type PadBrowserInputRecord = z.infer<
  typeof PadBrowserInputParser
>

export const PadBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadBrowserLocalInputRecord = z.infer<
  typeof PadBrowserLocalInputParser
>

export const PadBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type PadBrowserOutputRecord = z.infer<
  typeof PadBrowserOutputParser
>

export const PadBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadBrowserRemoteInputRecord = z.infer<
  typeof PadBrowserRemoteInputParser
>
