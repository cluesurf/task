import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const UpdateFontBrowserInputParser = z.union([
  z.lazy(() => UpdateFontBrowserRemoteInputParser),
  z.lazy(() => UpdateFontBrowserLocalInputParser),
])

export type UpdateFontBrowserInputRecord = z.infer<
  typeof UpdateFontBrowserInputParser
>

export const UpdateFontBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  fea: z.string(),
})

export type UpdateFontBrowserLocalInputRecord = z.infer<
  typeof UpdateFontBrowserLocalInputParser
>

export const UpdateFontBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type UpdateFontBrowserOutputRecord = z.infer<
  typeof UpdateFontBrowserOutputParser
>

export const UpdateFontBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  fea: z.string(),
})

export type UpdateFontBrowserRemoteInputRecord = z.infer<
  typeof UpdateFontBrowserRemoteInputParser
>
