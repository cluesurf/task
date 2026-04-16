import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveSubtitlesBrowserInputParser = z.union([
  z.lazy(() => RemoveSubtitlesBrowserRemoteInputParser),
  z.lazy(() => RemoveSubtitlesBrowserLocalInputParser),
])

export type RemoveSubtitlesBrowserInputRecord = z.infer<
  typeof RemoveSubtitlesBrowserInputParser
>

export const RemoveSubtitlesBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type RemoveSubtitlesBrowserLocalInputRecord = z.infer<
  typeof RemoveSubtitlesBrowserLocalInputParser
>

export const RemoveSubtitlesBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveSubtitlesBrowserOutputRecord = z.infer<
  typeof RemoveSubtitlesBrowserOutputParser
>

export const RemoveSubtitlesBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type RemoveSubtitlesBrowserRemoteInputRecord = z.infer<
  typeof RemoveSubtitlesBrowserRemoteInputParser
>
