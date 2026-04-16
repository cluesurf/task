import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveExifBrowserInputParser = z.union([
  z.lazy(() => RemoveExifBrowserRemoteInputParser),
  z.lazy(() => RemoveExifBrowserLocalInputParser),
])

export type RemoveExifBrowserInputRecord = z.infer<
  typeof RemoveExifBrowserInputParser
>

export const RemoveExifBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifBrowserLocalInputRecord = z.infer<
  typeof RemoveExifBrowserLocalInputParser
>

export const RemoveExifBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveExifBrowserOutputRecord = z.infer<
  typeof RemoveExifBrowserOutputParser
>

export const RemoveExifBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifBrowserRemoteInputRecord = z.infer<
  typeof RemoveExifBrowserRemoteInputParser
>
