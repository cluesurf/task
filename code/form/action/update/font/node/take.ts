import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const UpdateFontNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  fea: z.string(),
})

export type UpdateFontNodeClientInputRecord = z.infer<
  typeof UpdateFontNodeClientInputParser
>

export const UpdateFontNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  fea: z.string(),
})

export type UpdateFontNodeExternalInputRecord = z.infer<
  typeof UpdateFontNodeExternalInputParser
>

export const UpdateFontNodeInputParser = z.union([
  z.lazy(() => UpdateFontNodeRemoteInputParser),
  z.lazy(() => UpdateFontNodeLocalExternalInputParser),
  z.lazy(() => UpdateFontNodeLocalInternalInputParser),
])

export type UpdateFontNodeInputRecord = z.infer<
  typeof UpdateFontNodeInputParser
>

export const UpdateFontNodeLocalExternalInputParser = z.object({
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
  fea: z.string(),
})

export type UpdateFontNodeLocalExternalInputRecord = z.infer<
  typeof UpdateFontNodeLocalExternalInputParser
>

export const UpdateFontNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  fea: z.string(),
})

export type UpdateFontNodeLocalInputRecord = z.infer<
  typeof UpdateFontNodeLocalInputParser
>

export const UpdateFontNodeLocalInternalInputParser = z.object({
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
  fea: z.string(),
})

export type UpdateFontNodeLocalInternalInputRecord = z.infer<
  typeof UpdateFontNodeLocalInternalInputParser
>

export const UpdateFontNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type UpdateFontNodeOutputRecord = z.infer<
  typeof UpdateFontNodeOutputParser
>

export const UpdateFontNodeRemoteInputParser = z.object({
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
  fea: z.string(),
})

export type UpdateFontNodeRemoteInputRecord = z.infer<
  typeof UpdateFontNodeRemoteInputParser
>
