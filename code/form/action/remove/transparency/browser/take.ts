import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveTransparencyBrowserInputParser = z.union([
  z.lazy(() => RemoveTransparencyBrowserRemoteInputParser),
  z.lazy(() => RemoveTransparencyBrowserLocalInputParser),
])

export type RemoveTransparencyBrowserInputRecord = z.infer<
  typeof RemoveTransparencyBrowserInputParser
>

export const RemoveTransparencyBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyBrowserLocalInputRecord = z.infer<
  typeof RemoveTransparencyBrowserLocalInputParser
>

export const RemoveTransparencyBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveTransparencyBrowserOutputRecord = z.infer<
  typeof RemoveTransparencyBrowserOutputParser
>

export const RemoveTransparencyBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyBrowserRemoteInputRecord = z.infer<
  typeof RemoveTransparencyBrowserRemoteInputParser
>
