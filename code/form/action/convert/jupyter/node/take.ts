import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertDocumentWithJupyterNodeClientInputParser = z.object(
  {
    handle: z.literal('client'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.string(),
    }),
  },
)

export type ConvertDocumentWithJupyterNodeClientInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterNodeClientInputParser
>

export const ConvertDocumentWithJupyterNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.string(),
    }),
  })

export type ConvertDocumentWithJupyterNodeExternalInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterNodeExternalInputParser
>

export const ConvertDocumentWithJupyterNodeInputParser = z.union([
  z.lazy(() => ConvertDocumentWithJupyterNodeRemoteInputParser),
  z.lazy(() => ConvertDocumentWithJupyterNodeLocalExternalInputParser),
  z.lazy(() => ConvertDocumentWithJupyterNodeLocalInternalInputParser),
])

export type ConvertDocumentWithJupyterNodeInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterNodeInputParser
>

export const ConvertDocumentWithJupyterNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.string(),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithJupyterNodeLocalExternalInputRecord =
  z.infer<typeof ConvertDocumentWithJupyterNodeLocalExternalInputParser>

export const ConvertDocumentWithJupyterNodeLocalInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertDocumentWithJupyterNodeLocalInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterNodeLocalInputParser
>

export const ConvertDocumentWithJupyterNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.string(),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertDocumentWithJupyterNodeLocalInternalInputRecord =
  z.infer<typeof ConvertDocumentWithJupyterNodeLocalInternalInputParser>

export const ConvertDocumentWithJupyterNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertDocumentWithJupyterNodeOutputRecord = z.infer<
  typeof ConvertDocumentWithJupyterNodeOutputParser
>

export const ConvertDocumentWithJupyterNodeRemoteInputParser = z.object(
  {
    handle: z.literal('remote'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.string(),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
  },
)

export type ConvertDocumentWithJupyterNodeRemoteInputRecord = z.infer<
  typeof ConvertDocumentWithJupyterNodeRemoteInputParser
>
