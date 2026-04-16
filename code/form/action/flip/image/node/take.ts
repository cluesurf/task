import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const FlipImageNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageNodeClientInputRecord = z.infer<
  typeof FlipImageNodeClientInputParser
>

export const FlipImageNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageNodeExternalInputRecord = z.infer<
  typeof FlipImageNodeExternalInputParser
>

export const FlipImageNodeInputParser = z.union([
  z.lazy(() => FlipImageNodeRemoteInputParser),
  z.lazy(() => FlipImageNodeLocalExternalInputParser),
  z.lazy(() => FlipImageNodeLocalInternalInputParser),
])

export type FlipImageNodeInputRecord = z.infer<
  typeof FlipImageNodeInputParser
>

export const FlipImageNodeLocalExternalInputParser = z.object({
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
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageNodeLocalExternalInputRecord = z.infer<
  typeof FlipImageNodeLocalExternalInputParser
>

export const FlipImageNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageNodeLocalInputRecord = z.infer<
  typeof FlipImageNodeLocalInputParser
>

export const FlipImageNodeLocalInternalInputParser = z.object({
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
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageNodeLocalInternalInputRecord = z.infer<
  typeof FlipImageNodeLocalInternalInputParser
>

export const FlipImageNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type FlipImageNodeOutputRecord = z.infer<
  typeof FlipImageNodeOutputParser
>

export const FlipImageNodeRemoteInputParser = z.object({
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
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageNodeRemoteInputRecord = z.infer<
  typeof FlipImageNodeRemoteInputParser
>
