import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithRsvgNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgNodeClientInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeClientInputParser
>

export const ConvertImageWithRsvgNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeExternalInputParser
>

export const ConvertImageWithRsvgNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithRsvgNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithRsvgNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithRsvgNodeLocalInternalInputParser),
])

export type ConvertImageWithRsvgNodeInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeInputParser
>

export const ConvertImageWithRsvgNodeLocalExternalInputParser =
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
    outputFormat: z.optional(z.string()),
    width: z.optional(z.number().int().gte(0)),
    height: z.optional(z.number().int().gte(0)),
    dpi: z.optional(z.number().int().gte(0)),
    background: z.optional(z.string()),
  })

export type ConvertImageWithRsvgNodeLocalExternalInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeLocalExternalInputParser
>

export const ConvertImageWithRsvgNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  outputFormat: z.optional(z.string()),
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeLocalInputParser
>

export const ConvertImageWithRsvgNodeLocalInternalInputParser =
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
    outputFormat: z.optional(z.string()),
    width: z.optional(z.number().int().gte(0)),
    height: z.optional(z.number().int().gte(0)),
    dpi: z.optional(z.number().int().gte(0)),
    background: z.optional(z.string()),
  })

export type ConvertImageWithRsvgNodeLocalInternalInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeLocalInternalInputParser
>

export const ConvertImageWithRsvgNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithRsvgNodeOutputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeOutputParser
>

export const ConvertImageWithRsvgNodeRemoteInputParser = z.object({
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
  outputFormat: z.optional(z.string()),
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithRsvgNodeRemoteInputParser
>
