import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const NormalizeAudioBrowserInputParser = z.union([
  z.lazy(() => NormalizeAudioBrowserRemoteInputParser),
  z.lazy(() => NormalizeAudioBrowserLocalInputParser),
])

export type NormalizeAudioBrowserInputRecord = z.infer<
  typeof NormalizeAudioBrowserInputParser
>

export const NormalizeAudioBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioBrowserLocalInputRecord = z.infer<
  typeof NormalizeAudioBrowserLocalInputParser
>

export const NormalizeAudioBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type NormalizeAudioBrowserOutputRecord = z.infer<
  typeof NormalizeAudioBrowserOutputParser
>

export const NormalizeAudioBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioBrowserRemoteInputRecord = z.infer<
  typeof NormalizeAudioBrowserRemoteInputParser
>
