import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RotateImageBrowserInputParser = z.union([
  z.lazy(() => RotateImageBrowserRemoteInputParser),
  z.lazy(() => RotateImageBrowserLocalInputParser),
])

export type RotateImageBrowserInputRecord = z.infer<
  typeof RotateImageBrowserInputParser
>

export const RotateImageBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  degree: z.string(),
})

export type RotateImageBrowserLocalInputRecord = z.infer<
  typeof RotateImageBrowserLocalInputParser
>

export const RotateImageBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RotateImageBrowserOutputRecord = z.infer<
  typeof RotateImageBrowserOutputParser
>

export const RotateImageBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  degree: z.string(),
})

export type RotateImageBrowserRemoteInputRecord = z.infer<
  typeof RotateImageBrowserRemoteInputParser
>
