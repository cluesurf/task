import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveTransparencyNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyNodeClientInputRecord = z.infer<
  typeof RemoveTransparencyNodeClientInputParser
>

export const RemoveTransparencyNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyNodeExternalInputRecord = z.infer<
  typeof RemoveTransparencyNodeExternalInputParser
>

export const RemoveTransparencyNodeInputParser = z.union([
  z.lazy(() => RemoveTransparencyNodeRemoteInputParser),
  z.lazy(() => RemoveTransparencyNodeLocalExternalInputParser),
  z.lazy(() => RemoveTransparencyNodeLocalInternalInputParser),
])

export type RemoveTransparencyNodeInputRecord = z.infer<
  typeof RemoveTransparencyNodeInputParser
>

export const RemoveTransparencyNodeLocalExternalInputParser = z.object({
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
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyNodeLocalExternalInputRecord = z.infer<
  typeof RemoveTransparencyNodeLocalExternalInputParser
>

export const RemoveTransparencyNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyNodeLocalInputRecord = z.infer<
  typeof RemoveTransparencyNodeLocalInputParser
>

export const RemoveTransparencyNodeLocalInternalInputParser = z.object({
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
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyNodeLocalInternalInputRecord = z.infer<
  typeof RemoveTransparencyNodeLocalInternalInputParser
>

export const RemoveTransparencyNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveTransparencyNodeOutputRecord = z.infer<
  typeof RemoveTransparencyNodeOutputParser
>

export const RemoveTransparencyNodeRemoteInputParser = z.object({
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
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyNodeRemoteInputRecord = z.infer<
  typeof RemoveTransparencyNodeRemoteInputParser
>
