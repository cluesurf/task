import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const SanitizeHtmlBrowserInputParser = z.union([
  z.lazy(() => SanitizeHtmlBrowserRemoteInputParser),
  z.lazy(() => SanitizeHtmlBrowserLocalInputParser),
])

export type SanitizeHtmlBrowserInputRecord = z.infer<
  typeof SanitizeHtmlBrowserInputParser
>

export const SanitizeHtmlBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.string(),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type SanitizeHtmlBrowserLocalInputRecord = z.infer<
  typeof SanitizeHtmlBrowserLocalInputParser
>

export const SanitizeHtmlBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type SanitizeHtmlBrowserOutputRecord = z.infer<
  typeof SanitizeHtmlBrowserOutputParser
>

export const SanitizeHtmlBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.string(),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type SanitizeHtmlBrowserRemoteInputRecord = z.infer<
  typeof SanitizeHtmlBrowserRemoteInputParser
>
