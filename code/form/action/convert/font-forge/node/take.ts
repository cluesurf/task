import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import { FontFormatParser } from '~/code/form/object/font/take'

export const ConvertFontWithFontForgeNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => FontFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => FontFormatParser),
  }),
})

export type ConvertFontWithFontForgeNodeClientInputRecord = z.infer<
  typeof ConvertFontWithFontForgeNodeClientInputParser
>

export const ConvertFontWithFontForgeNodeExternalInputParser = z.object(
  {
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => FontFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => FontFormatParser),
    }),
  },
)

export type ConvertFontWithFontForgeNodeExternalInputRecord = z.infer<
  typeof ConvertFontWithFontForgeNodeExternalInputParser
>

export const ConvertFontWithFontForgeNodeInputParser = z.union([
  z.lazy(() => ConvertFontWithFontForgeNodeRemoteInputParser),
  z.lazy(() => ConvertFontWithFontForgeNodeLocalExternalInputParser),
  z.lazy(() => ConvertFontWithFontForgeNodeLocalInternalInputParser),
])

export type ConvertFontWithFontForgeNodeInputRecord = z.infer<
  typeof ConvertFontWithFontForgeNodeInputParser
>

export const ConvertFontWithFontForgeNodeLocalExternalInputParser =
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

export type ConvertFontWithFontForgeNodeLocalExternalInputRecord =
  z.infer<typeof ConvertFontWithFontForgeNodeLocalExternalInputParser>

export const ConvertFontWithFontForgeNodeLocalInputParser = z.object({
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

export type ConvertFontWithFontForgeNodeLocalInputRecord = z.infer<
  typeof ConvertFontWithFontForgeNodeLocalInputParser
>

export const ConvertFontWithFontForgeNodeLocalInternalInputParser =
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

export type ConvertFontWithFontForgeNodeLocalInternalInputRecord =
  z.infer<typeof ConvertFontWithFontForgeNodeLocalInternalInputParser>

export const ConvertFontWithFontForgeNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertFontWithFontForgeNodeOutputRecord = z.infer<
  typeof ConvertFontWithFontForgeNodeOutputParser
>

export const ConvertFontWithFontForgeNodeRemoteInputParser = z.object({
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

export type ConvertFontWithFontForgeNodeRemoteInputRecord = z.infer<
  typeof ConvertFontWithFontForgeNodeRemoteInputParser
>
