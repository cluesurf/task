import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DisassembleDotnetNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetNodeClientInputRecord = z.infer<
  typeof DisassembleDotnetNodeClientInputParser
>

export const DisassembleDotnetNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetNodeExternalInputRecord = z.infer<
  typeof DisassembleDotnetNodeExternalInputParser
>

export const DisassembleDotnetNodeInputParser = z.union([
  z.lazy(() => DisassembleDotnetNodeRemoteInputParser),
  z.lazy(() => DisassembleDotnetNodeLocalExternalInputParser),
  z.lazy(() => DisassembleDotnetNodeLocalInternalInputParser),
])

export type DisassembleDotnetNodeInputRecord = z.infer<
  typeof DisassembleDotnetNodeInputParser
>

export const DisassembleDotnetNodeLocalExternalInputParser = z.object({
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
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetNodeLocalExternalInputRecord = z.infer<
  typeof DisassembleDotnetNodeLocalExternalInputParser
>

export const DisassembleDotnetNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetNodeLocalInputRecord = z.infer<
  typeof DisassembleDotnetNodeLocalInputParser
>

export const DisassembleDotnetNodeLocalInternalInputParser = z.object({
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
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetNodeLocalInternalInputRecord = z.infer<
  typeof DisassembleDotnetNodeLocalInternalInputParser
>

export const DisassembleDotnetNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DisassembleDotnetNodeOutputRecord = z.infer<
  typeof DisassembleDotnetNodeOutputParser
>

export const DisassembleDotnetNodeRemoteInputParser = z.object({
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
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetNodeRemoteInputRecord = z.infer<
  typeof DisassembleDotnetNodeRemoteInputParser
>
