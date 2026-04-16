import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const GetDurationBrowserInputParser = z.union([
  z.lazy(() => GetDurationBrowserRemoteInputParser),
  z.lazy(() => GetDurationBrowserLocalInputParser),
])

export type GetDurationBrowserInputRecord = z.infer<
  typeof GetDurationBrowserInputParser
>

export const GetDurationBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationBrowserLocalInputRecord = z.infer<
  typeof GetDurationBrowserLocalInputParser
>

export const GetDurationBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type GetDurationBrowserOutputRecord = z.infer<
  typeof GetDurationBrowserOutputParser
>

export const GetDurationBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationBrowserRemoteInputRecord = z.infer<
  typeof GetDurationBrowserRemoteInputParser
>
