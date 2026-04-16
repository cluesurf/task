import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveInvisibleBrowserInputParser = z.union([
  z.lazy(() => RemoveInvisibleBrowserRemoteInputParser),
  z.lazy(() => RemoveInvisibleBrowserLocalInputParser),
])

export type RemoveInvisibleBrowserInputRecord = z.infer<
  typeof RemoveInvisibleBrowserInputParser
>

export const RemoveInvisibleBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type RemoveInvisibleBrowserLocalInputRecord = z.infer<
  typeof RemoveInvisibleBrowserLocalInputParser
>

export const RemoveInvisibleBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveInvisibleBrowserOutputRecord = z.infer<
  typeof RemoveInvisibleBrowserOutputParser
>

export const RemoveInvisibleBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type RemoveInvisibleBrowserRemoteInputRecord = z.infer<
  typeof RemoveInvisibleBrowserRemoteInputParser
>
