import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithRawtherapeeNodeClientInputParser =
  z.object({
    handle: z.literal('client'),
    input: z.object({
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeNodeClientInputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeNodeClientInputParser
>

export const ConvertImageWithRawtherapeeNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeNodeExternalInputRecord =
  z.infer<typeof ConvertImageWithRawtherapeeNodeExternalInputParser>

export const ConvertImageWithRawtherapeeNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithRawtherapeeNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithRawtherapeeNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithRawtherapeeNodeLocalInternalInputParser),
])

export type ConvertImageWithRawtherapeeNodeInputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeNodeInputParser
>

export const ConvertImageWithRawtherapeeNodeLocalExternalInputParser =
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
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeNodeLocalExternalInputRecord =
  z.infer<
    typeof ConvertImageWithRawtherapeeNodeLocalExternalInputParser
  >

export const ConvertImageWithRawtherapeeNodeLocalInputParser = z.object(
  {
    input: z.object({
      file: z.lazy(() => LocalPathParser),
    }),
    output: z.object({
      file: z.lazy(() => LocalPathParser),
    }),
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  },
)

export type ConvertImageWithRawtherapeeNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeNodeLocalInputParser
>

export const ConvertImageWithRawtherapeeNodeLocalInternalInputParser =
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
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeNodeLocalInternalInputRecord =
  z.infer<
    typeof ConvertImageWithRawtherapeeNodeLocalInternalInputParser
  >

export const ConvertImageWithRawtherapeeNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithRawtherapeeNodeOutputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeNodeOutputParser
>

export const ConvertImageWithRawtherapeeNodeRemoteInputParser =
  z.object({
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
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeNodeRemoteInputParser
>
