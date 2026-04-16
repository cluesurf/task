import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ShapeFontNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontNodeClientInputRecord = z.infer<
  typeof ShapeFontNodeClientInputParser
>

export const ShapeFontNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontNodeExternalInputRecord = z.infer<
  typeof ShapeFontNodeExternalInputParser
>

export const ShapeFontNodeInputParser = z.union([
  z.lazy(() => ShapeFontNodeRemoteInputParser),
  z.lazy(() => ShapeFontNodeLocalExternalInputParser),
  z.lazy(() => ShapeFontNodeLocalInternalInputParser),
])

export type ShapeFontNodeInputRecord = z.infer<
  typeof ShapeFontNodeInputParser
>

export const ShapeFontNodeLocalExternalInputParser = z.object({
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
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontNodeLocalExternalInputRecord = z.infer<
  typeof ShapeFontNodeLocalExternalInputParser
>

export const ShapeFontNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontNodeLocalInputRecord = z.infer<
  typeof ShapeFontNodeLocalInputParser
>

export const ShapeFontNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
  ),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontNodeLocalInternalInputRecord = z.infer<
  typeof ShapeFontNodeLocalInternalInputParser
>

export const ShapeFontNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ShapeFontNodeOutputRecord = z.infer<
  typeof ShapeFontNodeOutputParser
>

export const ShapeFontNodeRemoteInputParser = z.object({
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
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontNodeRemoteInputRecord = z.infer<
  typeof ShapeFontNodeRemoteInputParser
>
