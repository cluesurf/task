import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DumpFontNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tables: z.optional(z.string()),
})

export type DumpFontNodeClientInputRecord = z.infer<
  typeof DumpFontNodeClientInputParser
>

export const DumpFontNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tables: z.optional(z.string()),
})

export type DumpFontNodeExternalInputRecord = z.infer<
  typeof DumpFontNodeExternalInputParser
>

export const DumpFontNodeInputParser = z.union([
  z.lazy(() => DumpFontNodeRemoteInputParser),
  z.lazy(() => DumpFontNodeLocalExternalInputParser),
  z.lazy(() => DumpFontNodeLocalInternalInputParser),
])

export type DumpFontNodeInputRecord = z.infer<
  typeof DumpFontNodeInputParser
>

export const DumpFontNodeLocalExternalInputParser = z.object({
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
  tables: z.optional(z.string()),
})

export type DumpFontNodeLocalExternalInputRecord = z.infer<
  typeof DumpFontNodeLocalExternalInputParser
>

export const DumpFontNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  tables: z.optional(z.string()),
})

export type DumpFontNodeLocalInputRecord = z.infer<
  typeof DumpFontNodeLocalInputParser
>

export const DumpFontNodeLocalInternalInputParser = z.object({
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
  tables: z.optional(z.string()),
})

export type DumpFontNodeLocalInternalInputRecord = z.infer<
  typeof DumpFontNodeLocalInternalInputParser
>

export const DumpFontNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DumpFontNodeOutputRecord = z.infer<
  typeof DumpFontNodeOutputParser
>

export const DumpFontNodeRemoteInputParser = z.object({
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
  tables: z.optional(z.string()),
})

export type DumpFontNodeRemoteInputRecord = z.infer<
  typeof DumpFontNodeRemoteInputParser
>
