import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const TrimImageBrowserInputParser = z.union([
  z.lazy(() => TrimImageBrowserRemoteInputParser),
  z.lazy(() => TrimImageBrowserLocalInputParser),
])

export type TrimImageBrowserInputRecord = z.infer<
  typeof TrimImageBrowserInputParser
>

export const TrimImageBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  crop: z.string(),
})

export type TrimImageBrowserLocalInputRecord = z.infer<
  typeof TrimImageBrowserLocalInputParser
>

export const TrimImageBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type TrimImageBrowserOutputRecord = z.infer<
  typeof TrimImageBrowserOutputParser
>

export const TrimImageBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  crop: z.string(),
})

export type TrimImageBrowserRemoteInputRecord = z.infer<
  typeof TrimImageBrowserRemoteInputParser
>
