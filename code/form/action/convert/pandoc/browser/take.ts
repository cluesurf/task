import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/form/object/pandoc/take'

export const ConvertDocumentWithPandocBrowserInputParser = z.union([
  z.lazy(() => ConvertDocumentWithPandocBrowserRemoteInputParser),
  z.lazy(() => ConvertDocumentWithPandocBrowserLocalInputParser),
])

export type ConvertDocumentWithPandocBrowserInputRecord = z.infer<
  typeof ConvertDocumentWithPandocBrowserInputParser
>

export const ConvertDocumentWithPandocBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => PandocInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => PandocOutputFormatParser),
    }),
  })

export type ConvertDocumentWithPandocBrowserLocalInputRecord = z.infer<
  typeof ConvertDocumentWithPandocBrowserLocalInputParser
>

export const ConvertDocumentWithPandocBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertDocumentWithPandocBrowserOutputRecord = z.infer<
  typeof ConvertDocumentWithPandocBrowserOutputParser
>

export const ConvertDocumentWithPandocBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => PandocInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => PandocOutputFormatParser),
    }),
  })

export type ConvertDocumentWithPandocBrowserRemoteInputRecord = z.infer<
  typeof ConvertDocumentWithPandocBrowserRemoteInputParser
>
