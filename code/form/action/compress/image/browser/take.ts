import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const CompressImageBrowserInputParser = z.union([
  z.lazy(() => CompressImageBrowserRemoteInputParser),
  z.lazy(() => CompressImageBrowserLocalInputParser),
])

export type CompressImageBrowserInputRecord = z.infer<
  typeof CompressImageBrowserInputParser
>

export const CompressImageBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  quality: z.optional(z.string()),
})

export type CompressImageBrowserLocalInputRecord = z.infer<
  typeof CompressImageBrowserLocalInputParser
>

export const CompressImageBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompressImageBrowserOutputRecord = z.infer<
  typeof CompressImageBrowserOutputParser
>

export const CompressImageBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  quality: z.optional(z.string()),
})

export type CompressImageBrowserRemoteInputRecord = z.infer<
  typeof CompressImageBrowserRemoteInputParser
>
