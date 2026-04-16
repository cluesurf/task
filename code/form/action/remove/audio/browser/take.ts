import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveAudioBrowserInputParser = z.union([
  z.lazy(() => RemoveAudioBrowserRemoteInputParser),
  z.lazy(() => RemoveAudioBrowserLocalInputParser),
])

export type RemoveAudioBrowserInputRecord = z.infer<
  typeof RemoveAudioBrowserInputParser
>

export const RemoveAudioBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type RemoveAudioBrowserLocalInputRecord = z.infer<
  typeof RemoveAudioBrowserLocalInputParser
>

export const RemoveAudioBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveAudioBrowserOutputRecord = z.infer<
  typeof RemoveAudioBrowserOutputParser
>

export const RemoveAudioBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type RemoveAudioBrowserRemoteInputRecord = z.infer<
  typeof RemoveAudioBrowserRemoteInputParser
>
