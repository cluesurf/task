import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithRadianceNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  reverse: z.optional(z.boolean()),
})

export type ConvertImageWithRadianceNodeClientInputRecord = z.infer<
  typeof ConvertImageWithRadianceNodeClientInputParser
>

export const ConvertImageWithRadianceNodeExternalInputParser = z.object(
  {
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    reverse: z.optional(z.boolean()),
  },
)

export type ConvertImageWithRadianceNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithRadianceNodeExternalInputParser
>

export const ConvertImageWithRadianceNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithRadianceNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithRadianceNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithRadianceNodeLocalInternalInputParser),
])

export type ConvertImageWithRadianceNodeInputRecord = z.infer<
  typeof ConvertImageWithRadianceNodeInputParser
>

export const ConvertImageWithRadianceNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    reverse: z.optional(z.boolean()),
  })

export type ConvertImageWithRadianceNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithRadianceNodeLocalExternalInputParser>

export const ConvertImageWithRadianceNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  reverse: z.optional(z.boolean()),
})

export type ConvertImageWithRadianceNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithRadianceNodeLocalInputParser
>

export const ConvertImageWithRadianceNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      file: z.lazy(() => LocalOutputPathParser),
    }),
    reverse: z.optional(z.boolean()),
  })

export type ConvertImageWithRadianceNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithRadianceNodeLocalInternalInputParser>

export const ConvertImageWithRadianceNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithRadianceNodeOutputRecord = z.infer<
  typeof ConvertImageWithRadianceNodeOutputParser
>

export const ConvertImageWithRadianceNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  reverse: z.optional(z.boolean()),
})

export type ConvertImageWithRadianceNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithRadianceNodeRemoteInputParser
>
