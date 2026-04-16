import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ModifyPdfBrowserInputParser = z.union([
  z.lazy(() => ModifyPdfBrowserRemoteInputParser),
  z.lazy(() => ModifyPdfBrowserLocalInputParser),
])

export type ModifyPdfBrowserInputRecord = z.infer<
  typeof ModifyPdfBrowserInputParser
>

export const ModifyPdfBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfBrowserLocalInputRecord = z.infer<
  typeof ModifyPdfBrowserLocalInputParser
>

export const ModifyPdfBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ModifyPdfBrowserOutputRecord = z.infer<
  typeof ModifyPdfBrowserOutputParser
>

export const ModifyPdfBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfBrowserRemoteInputRecord = z.infer<
  typeof ModifyPdfBrowserRemoteInputParser
>
