import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithDcrawNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawNodeClientInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeClientInputParser
>

export const ConvertImageWithDcrawNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeExternalInputParser
>

export const ConvertImageWithDcrawNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithDcrawNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithDcrawNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithDcrawNodeLocalInternalInputParser),
])

export type ConvertImageWithDcrawNodeInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeInputParser
>

export const ConvertImageWithDcrawNodeLocalExternalInputParser =
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
    cameraWhiteBalance: z.optional(z.boolean()),
    srgb: z.optional(z.boolean()),
  })

export type ConvertImageWithDcrawNodeLocalExternalInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeLocalExternalInputParser
>

export const ConvertImageWithDcrawNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  outputFormat: z.optional(z.string()),
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeLocalInputParser
>

export const ConvertImageWithDcrawNodeLocalInternalInputParser =
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
    cameraWhiteBalance: z.optional(z.boolean()),
    srgb: z.optional(z.boolean()),
  })

export type ConvertImageWithDcrawNodeLocalInternalInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeLocalInternalInputParser
>

export const ConvertImageWithDcrawNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithDcrawNodeOutputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeOutputParser
>

export const ConvertImageWithDcrawNodeRemoteInputParser = z.object({
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
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithDcrawNodeRemoteInputParser
>
