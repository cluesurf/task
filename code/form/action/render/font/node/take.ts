import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RenderFontNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontNodeClientInputRecord = z.infer<
  typeof RenderFontNodeClientInputParser
>

export const RenderFontNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontNodeExternalInputRecord = z.infer<
  typeof RenderFontNodeExternalInputParser
>

export const RenderFontNodeInputParser = z.union([
  z.lazy(() => RenderFontNodeRemoteInputParser),
  z.lazy(() => RenderFontNodeLocalExternalInputParser),
  z.lazy(() => RenderFontNodeLocalInternalInputParser),
])

export type RenderFontNodeInputRecord = z.infer<
  typeof RenderFontNodeInputParser
>

export const RenderFontNodeLocalExternalInputParser = z.object({
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
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontNodeLocalExternalInputRecord = z.infer<
  typeof RenderFontNodeLocalExternalInputParser
>

export const RenderFontNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontNodeLocalInputRecord = z.infer<
  typeof RenderFontNodeLocalInputParser
>

export const RenderFontNodeLocalInternalInputParser = z.object({
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
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontNodeLocalInternalInputRecord = z.infer<
  typeof RenderFontNodeLocalInternalInputParser
>

export const RenderFontNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RenderFontNodeOutputRecord = z.infer<
  typeof RenderFontNodeOutputParser
>

export const RenderFontNodeRemoteInputParser = z.object({
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
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontNodeRemoteInputRecord = z.infer<
  typeof RenderFontNodeRemoteInputParser
>
