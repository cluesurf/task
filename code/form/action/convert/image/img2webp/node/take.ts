import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithImg2WebpNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  quality: z.optional(z.number().int().gte(0)),
  lossless: z.optional(z.boolean()),
  delay: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithImg2WebpNodeClientInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpNodeClientInputParser
>

export const ConvertImageWithImg2WebpNodeExternalInputParser = z.object(
  {
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    quality: z.optional(z.number().int().gte(0)),
    lossless: z.optional(z.boolean()),
    delay: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
  },
)

export type ConvertImageWithImg2WebpNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpNodeExternalInputParser
>

export const ConvertImageWithImg2WebpNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithImg2WebpNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithImg2WebpNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithImg2WebpNodeLocalInternalInputParser),
])

export type ConvertImageWithImg2WebpNodeInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpNodeInputParser
>

export const ConvertImageWithImg2WebpNodeLocalExternalInputParser =
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
    quality: z.optional(z.number().int().gte(0)),
    lossless: z.optional(z.boolean()),
    delay: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithImg2WebpNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithImg2WebpNodeLocalExternalInputParser>

export const ConvertImageWithImg2WebpNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  quality: z.optional(z.number().int().gte(0)),
  lossless: z.optional(z.boolean()),
  delay: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithImg2WebpNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpNodeLocalInputParser
>

export const ConvertImageWithImg2WebpNodeLocalInternalInputParser =
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
    quality: z.optional(z.number().int().gte(0)),
    lossless: z.optional(z.boolean()),
    delay: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithImg2WebpNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithImg2WebpNodeLocalInternalInputParser>

export const ConvertImageWithImg2WebpNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithImg2WebpNodeOutputRecord = z.infer<
  typeof ConvertImageWithImg2WebpNodeOutputParser
>

export const ConvertImageWithImg2WebpNodeRemoteInputParser = z.object({
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
  quality: z.optional(z.number().int().gte(0)),
  lossless: z.optional(z.boolean()),
  delay: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithImg2WebpNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpNodeRemoteInputParser
>
