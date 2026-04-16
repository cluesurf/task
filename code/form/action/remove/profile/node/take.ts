import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveProfileNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveProfileNodeClientInputRecord = z.infer<
  typeof RemoveProfileNodeClientInputParser
>

export const RemoveProfileNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveProfileNodeExternalInputRecord = z.infer<
  typeof RemoveProfileNodeExternalInputParser
>

export const RemoveProfileNodeInputParser = z.union([
  z.lazy(() => RemoveProfileNodeRemoteInputParser),
  z.lazy(() => RemoveProfileNodeLocalExternalInputParser),
  z.lazy(() => RemoveProfileNodeLocalInternalInputParser),
])

export type RemoveProfileNodeInputRecord = z.infer<
  typeof RemoveProfileNodeInputParser
>

export const RemoveProfileNodeLocalExternalInputParser = z.object({
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

export type RemoveProfileNodeLocalExternalInputRecord = z.infer<
  typeof RemoveProfileNodeLocalExternalInputParser
>

export const RemoveProfileNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
})

export type RemoveProfileNodeLocalInputRecord = z.infer<
  typeof RemoveProfileNodeLocalInputParser
>

export const RemoveProfileNodeLocalInternalInputParser = z.object({
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
})

export type RemoveProfileNodeLocalInternalInputRecord = z.infer<
  typeof RemoveProfileNodeLocalInternalInputParser
>

export const RemoveProfileNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveProfileNodeOutputRecord = z.infer<
  typeof RemoveProfileNodeOutputParser
>

export const RemoveProfileNodeRemoteInputParser = z.object({
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

export type RemoveProfileNodeRemoteInputRecord = z.infer<
  typeof RemoveProfileNodeRemoteInputParser
>
