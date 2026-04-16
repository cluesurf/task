import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DisassembleWasmNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmNodeClientInputRecord = z.infer<
  typeof DisassembleWasmNodeClientInputParser
>

export const DisassembleWasmNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmNodeExternalInputRecord = z.infer<
  typeof DisassembleWasmNodeExternalInputParser
>

export const DisassembleWasmNodeInputParser = z.union([
  z.lazy(() => DisassembleWasmNodeRemoteInputParser),
  z.lazy(() => DisassembleWasmNodeLocalExternalInputParser),
  z.lazy(() => DisassembleWasmNodeLocalInternalInputParser),
])

export type DisassembleWasmNodeInputRecord = z.infer<
  typeof DisassembleWasmNodeInputParser
>

export const DisassembleWasmNodeLocalExternalInputParser = z.object({
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
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmNodeLocalExternalInputRecord = z.infer<
  typeof DisassembleWasmNodeLocalExternalInputParser
>

export const DisassembleWasmNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmNodeLocalInputRecord = z.infer<
  typeof DisassembleWasmNodeLocalInputParser
>

export const DisassembleWasmNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmNodeLocalInternalInputRecord = z.infer<
  typeof DisassembleWasmNodeLocalInternalInputParser
>

export const DisassembleWasmNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DisassembleWasmNodeOutputRecord = z.infer<
  typeof DisassembleWasmNodeOutputParser
>

export const DisassembleWasmNodeRemoteInputParser = z.object({
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
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmNodeRemoteInputRecord = z.infer<
  typeof DisassembleWasmNodeRemoteInputParser
>
