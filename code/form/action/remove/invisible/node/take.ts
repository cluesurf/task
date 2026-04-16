import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveInvisibleNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveInvisibleNodeClientInputRecord = z.infer<
  typeof RemoveInvisibleNodeClientInputParser
>

export const RemoveInvisibleNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveInvisibleNodeExternalInputRecord = z.infer<
  typeof RemoveInvisibleNodeExternalInputParser
>

export const RemoveInvisibleNodeInputParser = z.union([
  z.lazy(() => RemoveInvisibleNodeRemoteInputParser),
  z.lazy(() => RemoveInvisibleNodeLocalExternalInputParser),
  z.lazy(() => RemoveInvisibleNodeLocalInternalInputParser),
])

export type RemoveInvisibleNodeInputRecord = z.infer<
  typeof RemoveInvisibleNodeInputParser
>

export const RemoveInvisibleNodeLocalExternalInputParser = z.object({
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
})

export type RemoveInvisibleNodeLocalExternalInputRecord = z.infer<
  typeof RemoveInvisibleNodeLocalExternalInputParser
>

export const RemoveInvisibleNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
})

export type RemoveInvisibleNodeLocalInputRecord = z.infer<
  typeof RemoveInvisibleNodeLocalInputParser
>

export const RemoveInvisibleNodeLocalInternalInputParser = z.object({
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
})

export type RemoveInvisibleNodeLocalInternalInputRecord = z.infer<
  typeof RemoveInvisibleNodeLocalInternalInputParser
>

export const RemoveInvisibleNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveInvisibleNodeOutputRecord = z.infer<
  typeof RemoveInvisibleNodeOutputParser
>

export const RemoveInvisibleNodeRemoteInputParser = z.object({
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
})

export type RemoveInvisibleNodeRemoteInputRecord = z.infer<
  typeof RemoveInvisibleNodeRemoteInputParser
>
