import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/form/object/libre-office/take'

export const ConvertDocumentWithLibreOfficeBrowserInputParser = z.union(
  [
    z.lazy(
      () => ConvertDocumentWithLibreOfficeBrowserRemoteInputParser,
    ),
    z.lazy(() => ConvertDocumentWithLibreOfficeBrowserLocalInputParser),
  ],
)

export type ConvertDocumentWithLibreOfficeBrowserInputRecord = z.infer<
  typeof ConvertDocumentWithLibreOfficeBrowserInputParser
>

export const ConvertDocumentWithLibreOfficeBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => LibreOfficeInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => LibreOfficeOutputFormatParser),
    }),
  })

export type ConvertDocumentWithLibreOfficeBrowserLocalInputRecord =
  z.infer<typeof ConvertDocumentWithLibreOfficeBrowserLocalInputParser>

export const ConvertDocumentWithLibreOfficeBrowserOutputParser =
  z.object({
    file: z.lazy(() => FileContentParser),
  })

export type ConvertDocumentWithLibreOfficeBrowserOutputRecord = z.infer<
  typeof ConvertDocumentWithLibreOfficeBrowserOutputParser
>

export const ConvertDocumentWithLibreOfficeBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => LibreOfficeInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => LibreOfficeOutputFormatParser),
    }),
  })

export type ConvertDocumentWithLibreOfficeBrowserRemoteInputRecord =
  z.infer<typeof ConvertDocumentWithLibreOfficeBrowserRemoteInputParser>
