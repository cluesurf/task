import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const TrimVideoBrowserInputParser = z.union([
  z.lazy(() => TrimVideoBrowserRemoteInputParser),
  z.lazy(() => TrimVideoBrowserLocalInputParser),
])

export type TrimVideoBrowserInputRecord = z.infer<
  typeof TrimVideoBrowserInputParser
>

export const TrimVideoBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoBrowserLocalInputRecord = z.infer<
  typeof TrimVideoBrowserLocalInputParser
>

export const TrimVideoBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type TrimVideoBrowserOutputRecord = z.infer<
  typeof TrimVideoBrowserOutputParser
>

export const TrimVideoBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoBrowserRemoteInputRecord = z.infer<
  typeof TrimVideoBrowserRemoteInputParser
>
