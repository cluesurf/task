import { z } from 'zod'

import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/form/object/enscript/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertDocumentWithEnscriptNodeClientInputParser =
  z.object({
    handle: z.literal('client'),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
    }),
  })

export type ConvertDocumentWithEnscriptNodeClientInputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptNodeClientInputParser
>

export const ConvertDocumentWithEnscriptNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
    }),
  })

export type ConvertDocumentWithEnscriptNodeExternalInputRecord =
  z.infer<typeof ConvertDocumentWithEnscriptNodeExternalInputParser>

export const ConvertDocumentWithEnscriptNodeInputParser = z.union([
  z.lazy(() => ConvertDocumentWithEnscriptNodeRemoteInputParser),
  z.lazy(() => ConvertDocumentWithEnscriptNodeLocalExternalInputParser),
  z.lazy(() => ConvertDocumentWithEnscriptNodeLocalInternalInputParser),
])

export type ConvertDocumentWithEnscriptNodeInputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptNodeInputParser
>

export const ConvertDocumentWithEnscriptNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithEnscriptNodeLocalExternalInputRecord =
  z.infer<
    typeof ConvertDocumentWithEnscriptNodeLocalExternalInputParser
  >

export const ConvertDocumentWithEnscriptNodeLocalInputParser = z.object(
  {
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.lazy(() => LocalPathParser),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
      file: z.lazy(() => LocalPathParser),
    }),
    pathScope: z.optional(z.string()),
  },
)

export type ConvertDocumentWithEnscriptNodeLocalInputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptNodeLocalInputParser
>

export const ConvertDocumentWithEnscriptNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithEnscriptNodeLocalInternalInputRecord =
  z.infer<
    typeof ConvertDocumentWithEnscriptNodeLocalInternalInputParser
  >

export const ConvertDocumentWithEnscriptNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertDocumentWithEnscriptNodeOutputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptNodeOutputParser
>

export const ConvertDocumentWithEnscriptNodeRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => EnscriptInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => EnscriptOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithEnscriptNodeRemoteInputRecord = z.infer<
  typeof ConvertDocumentWithEnscriptNodeRemoteInputParser
>
