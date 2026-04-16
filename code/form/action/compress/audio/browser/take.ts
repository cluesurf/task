import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const CompressAudioBrowserInputParser = z.union([
  z.lazy(() => CompressAudioBrowserRemoteInputParser),
  z.lazy(() => CompressAudioBrowserLocalInputParser),
])

export type CompressAudioBrowserInputRecord = z.infer<
  typeof CompressAudioBrowserInputParser
>

export const CompressAudioBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  bitrate: z.optional(z.string()),
})

export type CompressAudioBrowserLocalInputRecord = z.infer<
  typeof CompressAudioBrowserLocalInputParser
>

export const CompressAudioBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompressAudioBrowserOutputRecord = z.infer<
  typeof CompressAudioBrowserOutputParser
>

export const CompressAudioBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  bitrate: z.optional(z.string()),
})

export type CompressAudioBrowserRemoteInputRecord = z.infer<
  typeof CompressAudioBrowserRemoteInputParser
>
