import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveMetadataNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveMetadataNodeClientInputRecord = z.infer<
  typeof RemoveMetadataNodeClientInputParser
>

export const RemoveMetadataNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveMetadataNodeExternalInputRecord = z.infer<
  typeof RemoveMetadataNodeExternalInputParser
>

export const RemoveMetadataNodeInputParser = z.union([
  z.lazy(() => RemoveMetadataNodeRemoteInputParser),
  z.lazy(() => RemoveMetadataNodeLocalExternalInputParser),
  z.lazy(() => RemoveMetadataNodeLocalInternalInputParser),
])

export type RemoveMetadataNodeInputRecord = z.infer<
  typeof RemoveMetadataNodeInputParser
>

export const RemoveMetadataNodeLocalExternalInputParser = z.object({
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

export type RemoveMetadataNodeLocalExternalInputRecord = z.infer<
  typeof RemoveMetadataNodeLocalExternalInputParser
>

export const RemoveMetadataNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
})

export type RemoveMetadataNodeLocalInputRecord = z.infer<
  typeof RemoveMetadataNodeLocalInputParser
>

export const RemoveMetadataNodeLocalInternalInputParser = z.object({
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

export type RemoveMetadataNodeLocalInternalInputRecord = z.infer<
  typeof RemoveMetadataNodeLocalInternalInputParser
>

export const RemoveMetadataNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveMetadataNodeOutputRecord = z.infer<
  typeof RemoveMetadataNodeOutputParser
>

export const RemoveMetadataNodeRemoteInputParser = z.object({
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

export type RemoveMetadataNodeRemoteInputRecord = z.infer<
  typeof RemoveMetadataNodeRemoteInputParser
>
