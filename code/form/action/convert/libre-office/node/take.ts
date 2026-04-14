import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/form/object/libre-office/take'

export const ConvertDocumentWithLibreOfficeNodeClientInputParser =
  z.object({
    handle: z.literal('client'),
    input: z.object({
      format: z.lazy(() => LibreOfficeInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => LibreOfficeOutputFormatParser),
    }),
  })

export type ConvertDocumentWithLibreOfficeNodeClientInputRecord =
  z.infer<typeof ConvertDocumentWithLibreOfficeNodeClientInputParser>

export const ConvertDocumentWithLibreOfficeNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => LibreOfficeInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => LibreOfficeOutputFormatParser),
    }),
  })

export type ConvertDocumentWithLibreOfficeNodeExternalInputRecord =
  z.infer<typeof ConvertDocumentWithLibreOfficeNodeExternalInputParser>

export const ConvertDocumentWithLibreOfficeNodeInputParser = z.union([
  z.lazy(() => ConvertDocumentWithLibreOfficeNodeRemoteInputParser),
  z.lazy(
    () => ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser,
  ),
  z.lazy(
    () => ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser,
  ),
])

export type ConvertDocumentWithLibreOfficeNodeInputRecord = z.infer<
  typeof ConvertDocumentWithLibreOfficeNodeInputParser
>

export const ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
    }),
    output: z.object({
      format: z.string(),
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithLibreOfficeNodeLocalExternalInputRecord =
  z.infer<
    typeof ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser
  >

export const ConvertDocumentWithLibreOfficeNodeLocalInputParser =
  z.object({
    input: z.object({
      format: z.string(),
      file: z.lazy(() => LocalPathParser),
    }),
    output: z.object({
      format: z.string(),
      directory: z.lazy(() => LocalPathParser),
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithLibreOfficeNodeLocalInputRecord =
  z.infer<typeof ConvertDocumentWithLibreOfficeNodeLocalInputParser>

export const ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
    }),
    output: z.object({
      format: z.string(),
      directory: z.optional(z.lazy(() => LocalOutputPathParser)),
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithLibreOfficeNodeLocalInternalInputRecord =
  z.infer<
    typeof ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser
  >

export const ConvertDocumentWithLibreOfficeNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertDocumentWithLibreOfficeNodeOutputRecord = z.infer<
  typeof ConvertDocumentWithLibreOfficeNodeOutputParser
>

export const ConvertDocumentWithLibreOfficeNodeRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
    }),
    output: z.object({
      format: z.string(),
      directory: z.optional(z.lazy(() => LocalOutputPathParser)),
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithLibreOfficeNodeRemoteInputRecord =
  z.infer<typeof ConvertDocumentWithLibreOfficeNodeRemoteInputParser>
