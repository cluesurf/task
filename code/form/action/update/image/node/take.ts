import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const UpdateImageNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageNodeClientInputRecord = z.infer<
  typeof UpdateImageNodeClientInputParser
>

export const UpdateImageNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageNodeExternalInputRecord = z.infer<
  typeof UpdateImageNodeExternalInputParser
>

export const UpdateImageNodeInputParser = z.union([
  z.lazy(() => UpdateImageNodeRemoteInputParser),
  z.lazy(() => UpdateImageNodeLocalExternalInputParser),
  z.lazy(() => UpdateImageNodeLocalInternalInputParser),
])

export type UpdateImageNodeInputRecord = z.infer<
  typeof UpdateImageNodeInputParser
>

export const UpdateImageNodeLocalExternalInputParser = z.object({
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
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageNodeLocalExternalInputRecord = z.infer<
  typeof UpdateImageNodeLocalExternalInputParser
>

export const UpdateImageNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageNodeLocalInputRecord = z.infer<
  typeof UpdateImageNodeLocalInputParser
>

export const UpdateImageNodeLocalInternalInputParser = z.object({
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
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageNodeLocalInternalInputRecord = z.infer<
  typeof UpdateImageNodeLocalInternalInputParser
>

export const UpdateImageNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type UpdateImageNodeOutputRecord = z.infer<
  typeof UpdateImageNodeOutputParser
>

export const UpdateImageNodeRemoteInputParser = z.object({
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
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageNodeRemoteInputRecord = z.infer<
  typeof UpdateImageNodeRemoteInputParser
>
