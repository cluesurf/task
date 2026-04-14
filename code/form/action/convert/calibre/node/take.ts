import { z } from 'zod'

import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/form/object/calibre/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertDocumentWithCalibreNodeClientInputParser = z.object(
  {
    handle: z.literal('client'),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
    }),
  },
)

export type ConvertDocumentWithCalibreNodeClientInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreNodeClientInputParser
>

export const ConvertDocumentWithCalibreNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
    }),
  })

export type ConvertDocumentWithCalibreNodeExternalInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreNodeExternalInputParser
>

export const ConvertDocumentWithCalibreNodeInputParser = z.union([
  z.lazy(() => ConvertDocumentWithCalibreNodeRemoteInputParser),
  z.lazy(() => ConvertDocumentWithCalibreNodeLocalExternalInputParser),
  z.lazy(() => ConvertDocumentWithCalibreNodeLocalInternalInputParser),
])

export type ConvertDocumentWithCalibreNodeInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreNodeInputParser
>

export const ConvertDocumentWithCalibreNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithCalibreNodeLocalExternalInputRecord =
  z.infer<typeof ConvertDocumentWithCalibreNodeLocalExternalInputParser>

export const ConvertDocumentWithCalibreNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => CalibreInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => CalibreOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithCalibreNodeLocalInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreNodeLocalInputParser
>

export const ConvertDocumentWithCalibreNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithCalibreNodeLocalInternalInputRecord =
  z.infer<typeof ConvertDocumentWithCalibreNodeLocalInternalInputParser>

export const ConvertDocumentWithCalibreNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertDocumentWithCalibreNodeOutputRecord = z.infer<
  typeof ConvertDocumentWithCalibreNodeOutputParser
>

export const ConvertDocumentWithCalibreNodeRemoteInputParser = z.object(
  {
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => CalibreInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => CalibreOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  },
)

export type ConvertDocumentWithCalibreNodeRemoteInputRecord = z.infer<
  typeof ConvertDocumentWithCalibreNodeRemoteInputParser
>
