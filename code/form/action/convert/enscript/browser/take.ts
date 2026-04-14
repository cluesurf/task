import { z } from 'zod'

import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/form/object/enscript/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertDocumentWithEnscriptBrowserInputParser = z.union([
  z.lazy(() => ConvertDocumentWithEnscriptBrowserRemoteInputParser),
  z.lazy(() => ConvertDocumentWithEnscriptBrowserLocalInputParser),
])

export type ConvertDocumentWithEnscriptBrowserInputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptBrowserInputParser
>

export const ConvertDocumentWithEnscriptBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
    }),
  })

export type ConvertDocumentWithEnscriptBrowserLocalInputRecord =
  z.infer<typeof ConvertDocumentWithEnscriptBrowserLocalInputParser>

export const ConvertDocumentWithEnscriptBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertDocumentWithEnscriptBrowserOutputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptBrowserOutputParser
>

export const ConvertDocumentWithEnscriptBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
    }),
  })

export type ConvertDocumentWithEnscriptBrowserRemoteInputRecord =
  z.infer<typeof ConvertDocumentWithEnscriptBrowserRemoteInputParser>
