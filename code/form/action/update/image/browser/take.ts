import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const UpdateImageBrowserInputParser = z.union([
  z.lazy(() => UpdateImageBrowserRemoteInputParser),
  z.lazy(() => UpdateImageBrowserLocalInputParser),
])

export type UpdateImageBrowserInputRecord = z.infer<
  typeof UpdateImageBrowserInputParser
>

export const UpdateImageBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageBrowserLocalInputRecord = z.infer<
  typeof UpdateImageBrowserLocalInputParser
>

export const UpdateImageBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type UpdateImageBrowserOutputRecord = z.infer<
  typeof UpdateImageBrowserOutputParser
>

export const UpdateImageBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageBrowserRemoteInputRecord = z.infer<
  typeof UpdateImageBrowserRemoteInputParser
>
