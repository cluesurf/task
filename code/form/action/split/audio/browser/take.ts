import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const SplitAudioBrowserInputParser = z.union([
  z.lazy(() => SplitAudioBrowserRemoteInputParser),
  z.lazy(() => SplitAudioBrowserLocalInputParser),
])

export type SplitAudioBrowserInputRecord = z.infer<
  typeof SplitAudioBrowserInputParser
>

export const SplitAudioBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioBrowserLocalInputRecord = z.infer<
  typeof SplitAudioBrowserLocalInputParser
>

export const SplitAudioBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type SplitAudioBrowserOutputRecord = z.infer<
  typeof SplitAudioBrowserOutputParser
>

export const SplitAudioBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioBrowserRemoteInputRecord = z.infer<
  typeof SplitAudioBrowserRemoteInputParser
>
