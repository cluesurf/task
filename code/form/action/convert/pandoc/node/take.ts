import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/form/object/pandoc/take'

export const ConvertDocumentWithPandocNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => PandocInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PandocOutputFormatParser),
  }),
})

export type ConvertDocumentWithPandocNodeClientInputRecord = z.infer<
  typeof ConvertDocumentWithPandocNodeClientInputParser
>

export const ConvertDocumentWithPandocNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PandocInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PandocOutputFormatParser),
    }),
  })

export type ConvertDocumentWithPandocNodeExternalInputRecord = z.infer<
  typeof ConvertDocumentWithPandocNodeExternalInputParser
>

export const ConvertDocumentWithPandocNodeInputParser = z.union([
  z.lazy(() => ConvertDocumentWithPandocNodeRemoteInputParser),
  z.lazy(() => ConvertDocumentWithPandocNodeLocalExternalInputParser),
  z.lazy(() => ConvertDocumentWithPandocNodeLocalInternalInputParser),
])

export type ConvertDocumentWithPandocNodeInputRecord = z.infer<
  typeof ConvertDocumentWithPandocNodeInputParser
>

export const ConvertDocumentWithPandocNodeLocalExternalInputParser =
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

export type ConvertDocumentWithPandocNodeLocalExternalInputRecord =
  z.infer<typeof ConvertDocumentWithPandocNodeLocalExternalInputParser>

export const ConvertDocumentWithPandocNodeLocalInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithPandocNodeLocalInputRecord = z.infer<
  typeof ConvertDocumentWithPandocNodeLocalInputParser
>

export const ConvertDocumentWithPandocNodeLocalInternalInputParser =
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
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithPandocNodeLocalInternalInputRecord =
  z.infer<typeof ConvertDocumentWithPandocNodeLocalInternalInputParser>

export const ConvertDocumentWithPandocNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertDocumentWithPandocNodeOutputRecord = z.infer<
  typeof ConvertDocumentWithPandocNodeOutputParser
>

export const ConvertDocumentWithPandocNodeRemoteInputParser = z.object({
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
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithPandocNodeRemoteInputRecord = z.infer<
  typeof ConvertDocumentWithPandocNodeRemoteInputParser
>
