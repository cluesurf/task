import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemovePasswordNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  password: z.optional(z.string()),
})

export type RemovePasswordNodeClientInputRecord = z.infer<
  typeof RemovePasswordNodeClientInputParser
>

export const RemovePasswordNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  password: z.optional(z.string()),
})

export type RemovePasswordNodeExternalInputRecord = z.infer<
  typeof RemovePasswordNodeExternalInputParser
>

export const RemovePasswordNodeInputParser = z.union([
  z.lazy(() => RemovePasswordNodeRemoteInputParser),
  z.lazy(() => RemovePasswordNodeLocalExternalInputParser),
  z.lazy(() => RemovePasswordNodeLocalInternalInputParser),
])

export type RemovePasswordNodeInputRecord = z.infer<
  typeof RemovePasswordNodeInputParser
>

export const RemovePasswordNodeLocalExternalInputParser = z.object({
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
  password: z.optional(z.string()),
})

export type RemovePasswordNodeLocalExternalInputRecord = z.infer<
  typeof RemovePasswordNodeLocalExternalInputParser
>

export const RemovePasswordNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  password: z.optional(z.string()),
})

export type RemovePasswordNodeLocalInputRecord = z.infer<
  typeof RemovePasswordNodeLocalInputParser
>

export const RemovePasswordNodeLocalInternalInputParser = z.object({
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
  password: z.optional(z.string()),
})

export type RemovePasswordNodeLocalInternalInputRecord = z.infer<
  typeof RemovePasswordNodeLocalInternalInputParser
>

export const RemovePasswordNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemovePasswordNodeOutputRecord = z.infer<
  typeof RemovePasswordNodeOutputParser
>

export const RemovePasswordNodeRemoteInputParser = z.object({
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
  password: z.optional(z.string()),
})

export type RemovePasswordNodeRemoteInputRecord = z.infer<
  typeof RemovePasswordNodeRemoteInputParser
>
