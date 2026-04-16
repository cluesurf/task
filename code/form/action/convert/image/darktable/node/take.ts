import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithDarktableNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  xmp: z.optional(z.string()),
  highQuality: z.optional(z.boolean()),
  upscale: z.optional(z.boolean()),
})

export type ConvertImageWithDarktableNodeClientInputRecord = z.infer<
  typeof ConvertImageWithDarktableNodeClientInputParser
>

export const ConvertImageWithDarktableNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    xmp: z.optional(z.string()),
    highQuality: z.optional(z.boolean()),
    upscale: z.optional(z.boolean()),
  })

export type ConvertImageWithDarktableNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithDarktableNodeExternalInputParser
>

export const ConvertImageWithDarktableNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithDarktableNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithDarktableNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithDarktableNodeLocalInternalInputParser),
])

export type ConvertImageWithDarktableNodeInputRecord = z.infer<
  typeof ConvertImageWithDarktableNodeInputParser
>

export const ConvertImageWithDarktableNodeLocalExternalInputParser =
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
    xmp: z.optional(z.string()),
    highQuality: z.optional(z.boolean()),
    upscale: z.optional(z.boolean()),
  })

export type ConvertImageWithDarktableNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithDarktableNodeLocalExternalInputParser>

export const ConvertImageWithDarktableNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  xmp: z.optional(z.string()),
  highQuality: z.optional(z.boolean()),
  upscale: z.optional(z.boolean()),
})

export type ConvertImageWithDarktableNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithDarktableNodeLocalInputParser
>

export const ConvertImageWithDarktableNodeLocalInternalInputParser =
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
    xmp: z.optional(z.string()),
    highQuality: z.optional(z.boolean()),
    upscale: z.optional(z.boolean()),
  })

export type ConvertImageWithDarktableNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithDarktableNodeLocalInternalInputParser>

export const ConvertImageWithDarktableNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithDarktableNodeOutputRecord = z.infer<
  typeof ConvertImageWithDarktableNodeOutputParser
>

export const ConvertImageWithDarktableNodeRemoteInputParser = z.object({
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
  xmp: z.optional(z.string()),
  highQuality: z.optional(z.boolean()),
  upscale: z.optional(z.boolean()),
})

export type ConvertImageWithDarktableNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithDarktableNodeRemoteInputParser
>
