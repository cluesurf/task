import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const PadAudioBrowserInputParser = z.union([
  z.lazy(() => PadAudioBrowserRemoteInputParser),
  z.lazy(() => PadAudioBrowserLocalInputParser),
])

export type PadAudioBrowserInputRecord = z.infer<
  typeof PadAudioBrowserInputParser
>

export const PadAudioBrowserLocalInputParser = z.object({
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

export type PadAudioBrowserLocalInputRecord = z.infer<
  typeof PadAudioBrowserLocalInputParser
>

export const PadAudioBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type PadAudioBrowserOutputRecord = z.infer<
  typeof PadAudioBrowserOutputParser
>

export const PadAudioBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadAudioBrowserRemoteInputRecord = z.infer<
  typeof PadAudioBrowserRemoteInputParser
>
