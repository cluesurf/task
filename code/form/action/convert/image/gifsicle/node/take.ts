import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithGifsicleNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  optimize: z.optional(z.number().int().gte(0)),
  lossy: z.optional(z.number().int().gte(0)),
  resize: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithGifsicleNodeClientInputRecord = z.infer<
  typeof ConvertImageWithGifsicleNodeClientInputParser
>

export const ConvertImageWithGifsicleNodeExternalInputParser = z.object(
  {
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    optimize: z.optional(z.number().int().gte(0)),
    lossy: z.optional(z.number().int().gte(0)),
    resize: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
  },
)

export type ConvertImageWithGifsicleNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithGifsicleNodeExternalInputParser
>

export const ConvertImageWithGifsicleNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithGifsicleNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithGifsicleNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithGifsicleNodeLocalInternalInputParser),
])

export type ConvertImageWithGifsicleNodeInputRecord = z.infer<
  typeof ConvertImageWithGifsicleNodeInputParser
>

export const ConvertImageWithGifsicleNodeLocalExternalInputParser =
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
    optimize: z.optional(z.number().int().gte(0)),
    lossy: z.optional(z.number().int().gte(0)),
    resize: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithGifsicleNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithGifsicleNodeLocalExternalInputParser>

export const ConvertImageWithGifsicleNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  optimize: z.optional(z.number().int().gte(0)),
  lossy: z.optional(z.number().int().gte(0)),
  resize: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithGifsicleNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithGifsicleNodeLocalInputParser
>

export const ConvertImageWithGifsicleNodeLocalInternalInputParser =
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
    optimize: z.optional(z.number().int().gte(0)),
    lossy: z.optional(z.number().int().gte(0)),
    resize: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithGifsicleNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithGifsicleNodeLocalInternalInputParser>

export const ConvertImageWithGifsicleNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithGifsicleNodeOutputRecord = z.infer<
  typeof ConvertImageWithGifsicleNodeOutputParser
>

export const ConvertImageWithGifsicleNodeRemoteInputParser = z.object({
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
  optimize: z.optional(z.number().int().gte(0)),
  lossy: z.optional(z.number().int().gte(0)),
  resize: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithGifsicleNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithGifsicleNodeRemoteInputParser
>
