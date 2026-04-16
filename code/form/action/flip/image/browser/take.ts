import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const FlipImageBrowserInputParser = z.union([
  z.lazy(() => FlipImageBrowserRemoteInputParser),
  z.lazy(() => FlipImageBrowserLocalInputParser),
])

export type FlipImageBrowserInputRecord = z.infer<
  typeof FlipImageBrowserInputParser
>

export const FlipImageBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageBrowserLocalInputRecord = z.infer<
  typeof FlipImageBrowserLocalInputParser
>

export const FlipImageBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type FlipImageBrowserOutputRecord = z.infer<
  typeof FlipImageBrowserOutputParser
>

export const FlipImageBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageBrowserRemoteInputRecord = z.infer<
  typeof FlipImageBrowserRemoteInputParser
>
