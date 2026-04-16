import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemovePasswordBrowserInputParser = z.union([
  z.lazy(() => RemovePasswordBrowserRemoteInputParser),
  z.lazy(() => RemovePasswordBrowserLocalInputParser),
])

export type RemovePasswordBrowserInputRecord = z.infer<
  typeof RemovePasswordBrowserInputParser
>

export const RemovePasswordBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  password: z.optional(z.string()),
})

export type RemovePasswordBrowserLocalInputRecord = z.infer<
  typeof RemovePasswordBrowserLocalInputParser
>

export const RemovePasswordBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemovePasswordBrowserOutputRecord = z.infer<
  typeof RemovePasswordBrowserOutputParser
>

export const RemovePasswordBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  password: z.optional(z.string()),
})

export type RemovePasswordBrowserRemoteInputRecord = z.infer<
  typeof RemovePasswordBrowserRemoteInputParser
>
