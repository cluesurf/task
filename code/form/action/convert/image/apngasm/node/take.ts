import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithApngasmNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  delay: z.optional(z.number().int().gte(0)),
  skipDuplicates: z.optional(z.boolean()),
})

export type ConvertImageWithApngasmNodeClientInputRecord = z.infer<
  typeof ConvertImageWithApngasmNodeClientInputParser
>

export const ConvertImageWithApngasmNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  delay: z.optional(z.number().int().gte(0)),
  skipDuplicates: z.optional(z.boolean()),
})

export type ConvertImageWithApngasmNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithApngasmNodeExternalInputParser
>

export const ConvertImageWithApngasmNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithApngasmNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithApngasmNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithApngasmNodeLocalInternalInputParser),
])

export type ConvertImageWithApngasmNodeInputRecord = z.infer<
  typeof ConvertImageWithApngasmNodeInputParser
>

export const ConvertImageWithApngasmNodeLocalExternalInputParser =
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
    delay: z.optional(z.number().int().gte(0)),
    skipDuplicates: z.optional(z.boolean()),
  })

export type ConvertImageWithApngasmNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithApngasmNodeLocalExternalInputParser>

export const ConvertImageWithApngasmNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  delay: z.optional(z.number().int().gte(0)),
  skipDuplicates: z.optional(z.boolean()),
})

export type ConvertImageWithApngasmNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithApngasmNodeLocalInputParser
>

export const ConvertImageWithApngasmNodeLocalInternalInputParser =
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
    delay: z.optional(z.number().int().gte(0)),
    skipDuplicates: z.optional(z.boolean()),
  })

export type ConvertImageWithApngasmNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithApngasmNodeLocalInternalInputParser>

export const ConvertImageWithApngasmNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithApngasmNodeOutputRecord = z.infer<
  typeof ConvertImageWithApngasmNodeOutputParser
>

export const ConvertImageWithApngasmNodeRemoteInputParser = z.object({
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
  delay: z.optional(z.number().int().gte(0)),
  skipDuplicates: z.optional(z.boolean()),
})

export type ConvertImageWithApngasmNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithApngasmNodeRemoteInputParser
>
