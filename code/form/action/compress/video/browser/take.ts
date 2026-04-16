import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const CompressVideoBrowserInputParser = z.union([
  z.lazy(() => CompressVideoBrowserRemoteInputParser),
  z.lazy(() => CompressVideoBrowserLocalInputParser),
])

export type CompressVideoBrowserInputRecord = z.infer<
  typeof CompressVideoBrowserInputParser
>

export const CompressVideoBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoBrowserLocalInputRecord = z.infer<
  typeof CompressVideoBrowserLocalInputParser
>

export const CompressVideoBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompressVideoBrowserOutputRecord = z.infer<
  typeof CompressVideoBrowserOutputParser
>

export const CompressVideoBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoBrowserRemoteInputRecord = z.infer<
  typeof CompressVideoBrowserRemoteInputParser
>
