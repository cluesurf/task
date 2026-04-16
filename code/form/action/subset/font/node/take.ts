import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const SubsetFontNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontNodeClientInputRecord = z.infer<
  typeof SubsetFontNodeClientInputParser
>

export const SubsetFontNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontNodeExternalInputRecord = z.infer<
  typeof SubsetFontNodeExternalInputParser
>

export const SubsetFontNodeInputParser = z.union([
  z.lazy(() => SubsetFontNodeRemoteInputParser),
  z.lazy(() => SubsetFontNodeLocalExternalInputParser),
  z.lazy(() => SubsetFontNodeLocalInternalInputParser),
])

export type SubsetFontNodeInputRecord = z.infer<
  typeof SubsetFontNodeInputParser
>

export const SubsetFontNodeLocalExternalInputParser = z.object({
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
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontNodeLocalExternalInputRecord = z.infer<
  typeof SubsetFontNodeLocalExternalInputParser
>

export const SubsetFontNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontNodeLocalInputRecord = z.infer<
  typeof SubsetFontNodeLocalInputParser
>

export const SubsetFontNodeLocalInternalInputParser = z.object({
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
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontNodeLocalInternalInputRecord = z.infer<
  typeof SubsetFontNodeLocalInternalInputParser
>

export const SubsetFontNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type SubsetFontNodeOutputRecord = z.infer<
  typeof SubsetFontNodeOutputParser
>

export const SubsetFontNodeRemoteInputParser = z.object({
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
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontNodeRemoteInputRecord = z.infer<
  typeof SubsetFontNodeRemoteInputParser
>
