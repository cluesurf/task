import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveProfileBrowserInputParser = z.union([
  z.lazy(() => RemoveProfileBrowserRemoteInputParser),
  z.lazy(() => RemoveProfileBrowserLocalInputParser),
])

export type RemoveProfileBrowserInputRecord = z.infer<
  typeof RemoveProfileBrowserInputParser
>

export const RemoveProfileBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type RemoveProfileBrowserLocalInputRecord = z.infer<
  typeof RemoveProfileBrowserLocalInputParser
>

export const RemoveProfileBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveProfileBrowserOutputRecord = z.infer<
  typeof RemoveProfileBrowserOutputParser
>

export const RemoveProfileBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type RemoveProfileBrowserRemoteInputRecord = z.infer<
  typeof RemoveProfileBrowserRemoteInputParser
>
