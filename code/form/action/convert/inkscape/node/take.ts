import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithInkscapeNodeClientInputParser = z.object({
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
})

export type ConvertImageWithInkscapeNodeClientInputRecord = z.infer<
  typeof ConvertImageWithInkscapeNodeClientInputParser
>

export const ConvertImageWithInkscapeNodeExternalInputParser = z.object(
  {
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
  },
)

export type ConvertImageWithInkscapeNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithInkscapeNodeExternalInputParser
>

export const ConvertImageWithInkscapeNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithInkscapeNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithInkscapeNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithInkscapeNodeLocalInternalInputParser),
])

export type ConvertImageWithInkscapeNodeInputRecord = z.infer<
  typeof ConvertImageWithInkscapeNodeInputParser
>

export const ConvertImageWithInkscapeNodeLocalExternalInputParser =
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

export type ConvertImageWithInkscapeNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithInkscapeNodeLocalExternalInputParser>

export const ConvertImageWithInkscapeNodeLocalInputParser = z.object({
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

export type ConvertImageWithInkscapeNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithInkscapeNodeLocalInputParser
>

export const ConvertImageWithInkscapeNodeLocalInternalInputParser =
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

export type ConvertImageWithInkscapeNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithInkscapeNodeLocalInternalInputParser>

export const ConvertImageWithInkscapeNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithInkscapeNodeOutputRecord = z.infer<
  typeof ConvertImageWithInkscapeNodeOutputParser
>

export const ConvertImageWithInkscapeNodeRemoteInputParser = z.object({
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
})

export type ConvertImageWithInkscapeNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithInkscapeNodeRemoteInputParser
>
