import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveExifNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifNodeClientInputRecord = z.infer<
  typeof RemoveExifNodeClientInputParser
>

export const RemoveExifNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifNodeExternalInputRecord = z.infer<
  typeof RemoveExifNodeExternalInputParser
>

export const RemoveExifNodeInputParser = z.union([
  z.lazy(() => RemoveExifNodeRemoteInputParser),
  z.lazy(() => RemoveExifNodeLocalExternalInputParser),
  z.lazy(() => RemoveExifNodeLocalInternalInputParser),
])

export type RemoveExifNodeInputRecord = z.infer<
  typeof RemoveExifNodeInputParser
>

export const RemoveExifNodeLocalExternalInputParser = z.object({
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
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifNodeLocalExternalInputRecord = z.infer<
  typeof RemoveExifNodeLocalExternalInputParser
>

export const RemoveExifNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifNodeLocalInputRecord = z.infer<
  typeof RemoveExifNodeLocalInputParser
>

export const RemoveExifNodeLocalInternalInputParser = z.object({
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
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifNodeLocalInternalInputRecord = z.infer<
  typeof RemoveExifNodeLocalInternalInputParser
>

export const RemoveExifNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveExifNodeOutputRecord = z.infer<
  typeof RemoveExifNodeOutputParser
>

export const RemoveExifNodeRemoteInputParser = z.object({
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
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifNodeRemoteInputRecord = z.infer<
  typeof RemoveExifNodeRemoteInputParser
>
