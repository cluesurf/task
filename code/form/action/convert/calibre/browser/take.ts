import { z } from 'zod'

import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/form/object/calibre/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertDocumentWithCalibreBrowserInputParser = z.union([
  z.lazy(() => ConvertDocumentWithCalibreBrowserRemoteInputParser),
  z.lazy(() => ConvertDocumentWithCalibreBrowserLocalInputParser),
])

export type ConvertDocumentWithCalibreBrowserInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreBrowserInputParser
>

export const ConvertDocumentWithCalibreBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
    }),
  })

export type ConvertDocumentWithCalibreBrowserLocalInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreBrowserLocalInputParser
>

export const ConvertDocumentWithCalibreBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertDocumentWithCalibreBrowserOutputRecord = z.infer<
  typeof ConvertDocumentWithCalibreBrowserOutputParser
>

export const ConvertDocumentWithCalibreBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
    }),
  })

export type ConvertDocumentWithCalibreBrowserRemoteInputRecord =
  z.infer<typeof ConvertDocumentWithCalibreBrowserRemoteInputParser>
