import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const TrimAudioBrowserInputParser = z.union([
  z.lazy(() => TrimAudioBrowserRemoteInputParser),
  z.lazy(() => TrimAudioBrowserLocalInputParser),
])

export type TrimAudioBrowserInputRecord = z.infer<
  typeof TrimAudioBrowserInputParser
>

export const TrimAudioBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
})

export type TrimAudioBrowserLocalInputRecord = z.infer<
  typeof TrimAudioBrowserLocalInputParser
>

export const TrimAudioBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type TrimAudioBrowserOutputRecord = z.infer<
  typeof TrimAudioBrowserOutputParser
>

export const TrimAudioBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
})

export type TrimAudioBrowserRemoteInputRecord = z.infer<
  typeof TrimAudioBrowserRemoteInputParser
>
