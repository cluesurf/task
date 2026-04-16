import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ModifyPdfNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfNodeClientInputRecord = z.infer<
  typeof ModifyPdfNodeClientInputParser
>

export const ModifyPdfNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfNodeExternalInputRecord = z.infer<
  typeof ModifyPdfNodeExternalInputParser
>

export const ModifyPdfNodeInputParser = z.union([
  z.lazy(() => ModifyPdfNodeRemoteInputParser),
  z.lazy(() => ModifyPdfNodeLocalExternalInputParser),
  z.lazy(() => ModifyPdfNodeLocalInternalInputParser),
])

export type ModifyPdfNodeInputRecord = z.infer<
  typeof ModifyPdfNodeInputParser
>

export const ModifyPdfNodeLocalExternalInputParser = z.object({
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
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfNodeLocalExternalInputRecord = z.infer<
  typeof ModifyPdfNodeLocalExternalInputParser
>

export const ModifyPdfNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfNodeLocalInputRecord = z.infer<
  typeof ModifyPdfNodeLocalInputParser
>

export const ModifyPdfNodeLocalInternalInputParser = z.object({
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
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfNodeLocalInternalInputRecord = z.infer<
  typeof ModifyPdfNodeLocalInternalInputParser
>

export const ModifyPdfNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ModifyPdfNodeOutputRecord = z.infer<
  typeof ModifyPdfNodeOutputParser
>

export const ModifyPdfNodeRemoteInputParser = z.object({
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
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfNodeRemoteInputRecord = z.infer<
  typeof ModifyPdfNodeRemoteInputParser
>
