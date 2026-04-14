import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertDocumentWithJupyterBrowserInputParser = z.union([
  z.lazy(() => ConvertDocumentWithJupyterBrowserRemoteInputParser),
  z.lazy(() => ConvertDocumentWithJupyterBrowserLocalInputParser),
])

export type ConvertDocumentWithJupyterBrowserInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterBrowserInputParser
>

export const ConvertDocumentWithJupyterBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.string(),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.string(),
    }),
  })

export type ConvertDocumentWithJupyterBrowserLocalInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterBrowserLocalInputParser
>

export const ConvertDocumentWithJupyterBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertDocumentWithJupyterBrowserOutputRecord = z.infer<
  typeof ConvertDocumentWithJupyterBrowserOutputParser
>

export const ConvertDocumentWithJupyterBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.string(),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.string(),
    }),
  })

export type ConvertDocumentWithJupyterBrowserRemoteInputRecord =
  z.infer<typeof ConvertDocumentWithJupyterBrowserRemoteInputParser>
