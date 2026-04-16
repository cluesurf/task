import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithFfmpegNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegNodeClientInputRecord = z.infer<
  typeof ConvertImageWithFfmpegNodeClientInputParser
>

export const ConvertImageWithFfmpegNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithFfmpegNodeExternalInputParser
>

export const ConvertImageWithFfmpegNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithFfmpegNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithFfmpegNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithFfmpegNodeLocalInternalInputParser),
])

export type ConvertImageWithFfmpegNodeInputRecord = z.infer<
  typeof ConvertImageWithFfmpegNodeInputParser
>

export const ConvertImageWithFfmpegNodeLocalExternalInputParser =
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
    fps: z.optional(z.number().int().gte(0)),
    quality: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
    outputFormat: z.optional(z.string()),
  })

export type ConvertImageWithFfmpegNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithFfmpegNodeLocalExternalInputParser>

export const ConvertImageWithFfmpegNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithFfmpegNodeLocalInputParser
>

export const ConvertImageWithFfmpegNodeLocalInternalInputParser =
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
    fps: z.optional(z.number().int().gte(0)),
    quality: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
    outputFormat: z.optional(z.string()),
  })

export type ConvertImageWithFfmpegNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithFfmpegNodeLocalInternalInputParser>

export const ConvertImageWithFfmpegNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithFfmpegNodeOutputRecord = z.infer<
  typeof ConvertImageWithFfmpegNodeOutputParser
>

export const ConvertImageWithFfmpegNodeRemoteInputParser = z.object({
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
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithFfmpegNodeRemoteInputParser
>
