import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const UpdateVideoBrowserInputParser = z.union([
  z.lazy(() => UpdateVideoBrowserRemoteInputParser),
  z.lazy(() => UpdateVideoBrowserLocalInputParser),
])

export type UpdateVideoBrowserInputRecord = z.infer<
  typeof UpdateVideoBrowserInputParser
>

export const UpdateVideoBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoBrowserLocalInputRecord = z.infer<
  typeof UpdateVideoBrowserLocalInputParser
>

export const UpdateVideoBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type UpdateVideoBrowserOutputRecord = z.infer<
  typeof UpdateVideoBrowserOutputParser
>

export const UpdateVideoBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoBrowserRemoteInputRecord = z.infer<
  typeof UpdateVideoBrowserRemoteInputParser
>
