import { z } from 'zod'

import { DataFormatParser } from '~/code/form/object/data/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertDataBrowserInputParser = z.union([
  z.lazy(() => ConvertDataBrowserRemoteInputParser),
  z.lazy(() => ConvertDataBrowserLocalInputParser),
])

export type ConvertDataBrowserInputRecord = z.infer<
  typeof ConvertDataBrowserInputParser
>

export const ConvertDataBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
  }),
})

export type ConvertDataBrowserLocalInputRecord = z.infer<
  typeof ConvertDataBrowserLocalInputParser
>

export const ConvertDataBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertDataBrowserOutputRecord = z.infer<
  typeof ConvertDataBrowserOutputParser
>

export const ConvertDataBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
  }),
})

export type ConvertDataBrowserRemoteInputRecord = z.infer<
  typeof ConvertDataBrowserRemoteInputParser
>
