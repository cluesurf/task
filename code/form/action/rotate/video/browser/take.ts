import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RotateVideoBrowserInputParser = z.union([
  z.lazy(() => RotateVideoBrowserRemoteInputParser),
  z.lazy(() => RotateVideoBrowserLocalInputParser),
])

export type RotateVideoBrowserInputRecord = z.infer<
  typeof RotateVideoBrowserInputParser
>

export const RotateVideoBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  degree: z.string(),
})

export type RotateVideoBrowserLocalInputRecord = z.infer<
  typeof RotateVideoBrowserLocalInputParser
>

export const RotateVideoBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RotateVideoBrowserOutputRecord = z.infer<
  typeof RotateVideoBrowserOutputParser
>

export const RotateVideoBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  degree: z.string(),
})

export type RotateVideoBrowserRemoteInputRecord = z.infer<
  typeof RotateVideoBrowserRemoteInputParser
>
